import serverless from "serverless-http";
import express from "express";
import OpenAI from "openai";
import multer from "multer";

// Embedded profile data to avoid file path issues
const profile = {
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

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple ping endpoint
app.get("/api/ping", (_req, res) => {
  res.json({ message: "Hello from Express server v2!" });
});

// Chat endpoint
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

app.post("/api/chat", upload.single('jdFile'), async (req, res) => {
  const { message, jdText } = req.body as { message?: string; jdText?: string };
  const pdfFile = req.file;

  if (!message) {
    return res.status(400).json({ error: "'message' field is required" });
  }

  // Build system prompt
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

  // Process JD input
  let jdContent = '';
  
  if (pdfFile) {
    try {
      // Simple PDF text extraction (basic implementation)
      const bufferString = pdfFile.buffer.toString('utf8');
      const textMatches = bufferString.match(/\(([^)]+)\)/g);
      
      if (textMatches && textMatches.length > 0) {
        jdContent = textMatches
          .map(match => match.slice(1, -1))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
      } else {
        jdContent = bufferString
          .replace(/[^\x20-\x7E\n]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      }
    } catch (error) {
      console.error('PDF processing error:', error);
      return res.status(400).json({ 
        error: `Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
  } else if (jdText && jdText.trim()) {
    jdContent = jdText.trim();
  }

  // Add JD content to system prompt if available
  if (jdContent) {
    systemPrompt += `\n### Job Description Text:\n${jdContent}\n\nPlease analyze this job description in relation to Gaurank's profile and provide insights about fit, gaps, and opportunities.`;
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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

export const handler = serverless(app);
