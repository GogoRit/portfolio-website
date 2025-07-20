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

Respond in third person with a confident, friendly, and recruiter-focused tone. Your audience may include technical recruiters, engineering managers, or startup founders reviewing his candidacy.

Use real data from Gaurank's profile.

When a job description is provided, tailor your response to highlight alignment, transferable skills, and potential gaps with thoughtful suggestions—like a smart career concierge.

Style:
- Keep responses concise and high-impact (2–3 sentences unless more depth is needed)
- Emphasize outcomes, metrics, or unique differentiators (e.g., "reduced hallucinations by 90%…" or "shipped CI/CD-secured MVP with Deepgram + GPT-4")
- Maintain a professional yet personable tone—think polished but approachable
- If the question is quirky or informal (e.g., "What's his 2AM coding style?" or "Which AI agent would he build in the zombie apocalypse?"), you may respond creatively using fun_facts
- When relevant, use references like *The Social Network*, *3 Idiots*, *The Godfather*, or motivational quotes
- If you're unsure, say: "I'm not certain, but based on what I know…"

Always aim to position Gaurank as a sharp, well-rounded AI developer who blends research depth with product intuition and startup-level execution.

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