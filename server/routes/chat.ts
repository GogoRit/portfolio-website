import { Router } from "express";
import OpenAI from "openai";
import path from "path";
import fs from "fs";
import multer from "multer";
import { parseJobDescription, validatePDFBuffer } from "../services/pdfParser.js";
import { fileURLToPath } from "url";
import logger from "../logger";

// Load the profile JSON once at startup with error handling
let profile: any;
try {
  // Try to load from file first
  let profilePath: string;
  if (typeof import.meta !== 'undefined' && import.meta.url) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    profilePath = path.resolve(__dirname, "../../data/gaurank.json");
  } else {
    // Fallback for serverless environment
    profilePath = path.resolve(process.cwd(), "data/gaurank.json");
  }
  
  // Check if file exists before trying to read it
  if (fs.existsSync(profilePath)) {
    profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
  } else {
    throw new Error("Profile file not found");
  }
} catch (error) {
  logger.error("Failed to load profile data:", error);
  // Fallback profile data in case file loading fails (embedded for serverless)
  profile = {
    "name": "Gaurank Maheshwari",
    "title": "AI Developer | Researcher | Data Scientist",
    "origin": {
      "hometown": "Kishangarh, Rajasthan, India",
      "current_location": "Rochester, NY, USA"
    },
    "contact": {
      "email": "gm8189@g.rit.edu",
      "phone": "+1 (585) 957-6312",
      "github": "https://github.com/GogoRit",
      "linkedin": "https://www.linkedin.com/in/gaurank",
      "location": "Rochester, NY, USA"
    },
    "education": [
      {
        "institution": "Rochester Institute of Technology (RIT)",
        "degree": "M.S. in Data Science",
        "gpa": "4.0 / 4.0",
        "graduation_date": "Dec 2025 (expected)",
        "courses": [
          "Neural Networks",
          "Human Factors in AI",
          "Applied Statistics",
          "Software Engineering for Data Science"
        ]
      },
      {
        "institution": "LNMIIT, Jaipur",
        "degree": "B.Tech. in Computer Science",
        "graduation_date": "May 2023"
      }
    ],
    "current_role": {
      "title": "AI Developer",
      "company": "MAGIC Spell Studios",
      "start": "Jan 2025",
      "summary": "Leading development of aiPaperboyz – an AI-powered podcast-summarization and transcript-delivery platform."
    },
    "projects": [
      {
        "name": "aiPaperboyz",
        "description": "An AI-powered podcast-summarization platform with speaker diarization and transcript enrichment using LLM agents.",
        "tech": ["OpenAI", "Deepgram", "FastAPI", "Docker", "PostgreSQL", "Firebase", "Tailwind CSS", "React", "TypeScript"]
      },
      {
        "name": "NewsLens AI",
        "description": "Capstone project that reduced hallucinations in AI-generated news summaries by more than 90% using Gemini, GPT-3.5, and Hugging Face NER.",
        "tech": ["Gemini", "GPT-3.5", "NER", "Hugging Face", "TensorFlow", "Python"]
      }
    ],
    "skills": {
      "languages": ["Python", "TypeScript", "Java", "SQL", "HTML", "LaTeX"],
      "frameworks": ["LangChain", "LangFlow", "Crew AI", "Swarm", "Autogen", "PyTorch", "FastAPI", "React", "Tailwind CSS"]
    }
  };
}

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
      logger.info(`Processing uploaded PDF: ${pdfFile.originalname}, size: ${pdfFile.size} bytes`);
      
      // Validate the PDF buffer
      if (!validatePDFBuffer(pdfFile.buffer)) {
        logger.warn(`Invalid PDF file format: ${pdfFile.originalname}`);
        return res.status(400).json({ error: "Invalid PDF file format" });
      }
      
      // Parse the PDF to extract text
      jdContent = await parseJobDescription(pdfFile.buffer);
      
      logger.info(`JD text extracted from PDF (${jdContent.length} characters)`);
    } catch (error) {
      logger.error('PDF processing error:', error);
      return res.status(400).json({ 
        error: `Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
      } else if (jdText && jdText.trim()) {
    // Use provided text input
    jdContent = jdText.trim();
    logger.info(`Using provided JD text (${jdContent.length} characters)`);
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
    logger.info(`Chat response generated successfully`);
    res.json({ answer });
  } catch (error: any) {
    logger.error("/api/chat error", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}); 