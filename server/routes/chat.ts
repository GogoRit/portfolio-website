import { Router } from "express";
import OpenAI from "openai";
import path from "path";
import fs from "fs";
import multer from "multer";
import { parseJobDescription, validatePDFBuffer } from "../services/pdfParser.js";

// Load the profile JSON once at startup
const profilePath = path.resolve(__dirname, "../../data/gaurank.json");
const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

export const chatRouter = Router();

chatRouter.post("/", upload.single('jdFile'), async (req, res) => {
  const { message, jdText } = req.body as { message?: string; jdText?: string };
  const pdfFile = req.file;

  if (!message) {
    return res.status(400).json({ error: "'message' field is required" });
  }

  // Build base system prompt with embedded profile data
  let systemPrompt = `You are Gaurank Maheshwari's AI career assistant.
Respond in third-person with a friendly, intelligent tone suitable for recruiters or senior developers.
Use real data from Gaurank's profile.

Style:
- Concise (aim for 2–3 sentences unless detail is needed), confident, and thoughtful
- Highlight achievements with impact (metrics, outcomes)
- Use humor or clever movie references if the question is informal (e.g., The Godfather, The Social Network, 3 Idiots)
- For quirky questions like "What would he build with no internet?" or "What's his working style at 2AM?", feel free to improvise from fun_facts
- If unsure, say: "I'm not certain, but based on what I know…"
- Keep the overall vibe professional yet witty and smart

Profile JSON:\n${JSON.stringify(profile, null, 2)}\n`;

  // Process JD input - prefer PDF over text if both are provided
  let jdContent = '';
  
  if (pdfFile) {
    try {
      console.log(`Processing uploaded PDF: ${pdfFile.originalname}, size: ${pdfFile.size} bytes`);
      
      // Validate the PDF buffer
      if (!validatePDFBuffer(pdfFile.buffer)) {
        return res.status(400).json({ error: "Invalid PDF file format" });
      }
      
      // Parse the PDF to extract text
      jdContent = await parseJobDescription(pdfFile.buffer);
      
      console.log(`JD text extracted from PDF (${jdContent.length} characters)`);
    } catch (error) {
      console.error('PDF processing error:', error);
      return res.status(400).json({ 
        error: `Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
  } else if (jdText && jdText.trim()) {
    // Use provided text input
    jdContent = jdText.trim();
    console.log(`Using provided JD text (${jdContent.length} characters)`);
  }

  // Add JD content to system prompt if available
  if (jdContent) {
    systemPrompt += `\n### Job Description Text:\n${jdContent}\n\nPlease analyze this job description in relation to Gaurank's profile and provide insights about fit, gaps, and opportunities.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // adjust if needed
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const answer = completion.choices[0].message?.content?.trim() ?? "I'm sorry, something went wrong.";
    res.json({ answer });
  } catch (error: any) {
    console.error("/api/chat error", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}); 