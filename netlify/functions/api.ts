import serverless from "serverless-http";
import express from "express";
import OpenAI from "openai";
import multer from "multer";

// LeetCode API types and logic (embedded to avoid import issues in Netlify)
interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
}

interface LeetCodeStats {
  username: string;
  ranking: number | null;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  streak: {
    current: number;
    max: number;
  };
  badges: LeetCodeBadge[];
  totalActiveDays: number;
  updatedAt: string;
}

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser: {
      username: string;
      profile: {
        ranking: number;
      };
      submitStatsGlobal: {
        acSubmissionNum: Array<{
          difficulty: string;
          count: number;
        }>;
      };
      badges: Array<{
        id: string;
        name: string;
        icon: string;
      }>;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

interface StreakResponse {
  data?: {
    matchedUser?: {
      userCalendar?: {
        streak: number;
        totalActiveDays: number;
      } | null;
    } | null;
  };
}

// In-memory cache with TTL
interface CacheEntry {
  data: LeetCodeStats;
  timestamp: number;
}

const leetcodeCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      badges {
        id
        name
        icon
      }
    }
  }
`;

const STREAK_QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        streak
        totalActiveDays
      }
    }
  }
`;

async function fetchStreakData(username: string): Promise<{ current: number; max: number; totalActiveDays: number }> {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
      body: JSON.stringify({
        query: STREAK_QUERY,
        variables: { username, year: currentYear },
      }),
    });

    if (!response.ok) {
      return { current: 0, max: 0, totalActiveDays: 0 };
    }

    const result: StreakResponse = await response.json();
    
    const userCalendar = result.data?.matchedUser?.userCalendar;
    const streak = userCalendar?.streak || 0;
    const totalActiveDays = userCalendar?.totalActiveDays || 0;

    return {
      current: streak,
      max: streak,
      totalActiveDays,
    };
  } catch {
    return { current: 0, max: 0, totalActiveDays: 0 };
  }
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  // Check cache first
  const cached = leetcodeCache.get(username.toLowerCase());
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const [profileResponse, streakData] = await Promise.all([
    fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username },
      }),
    }),
    fetchStreakData(username),
  ]);

  if (!profileResponse.ok) {
    throw { statusCode: 502, message: `LeetCode API returned status ${profileResponse.status}` };
  }

  const result: LeetCodeGraphQLResponse = await profileResponse.json();

  if (result.errors && result.errors.length > 0) {
    throw { statusCode: 502, message: `LeetCode GraphQL error: ${result.errors[0].message}` };
  }

  if (!result.data?.matchedUser) {
    throw { statusCode: 404, message: `User '${username}' not found on LeetCode` };
  }

  const user = result.data.matchedUser;
  const submissions = user.submitStatsGlobal.acSubmissionNum;

  const solved = { total: 0, easy: 0, medium: 0, hard: 0 };

  for (const stat of submissions) {
    const count = stat.count || 0;
    switch (stat.difficulty.toLowerCase()) {
      case "all":
        solved.total = count;
        break;
      case "easy":
        solved.easy = count;
        break;
      case "medium":
        solved.medium = count;
        break;
      case "hard":
        solved.hard = count;
        break;
    }
  }

  // Parse badges - ensure icon URLs are absolute
  const badges: LeetCodeBadge[] = (user.badges || []).map((badge) => {
    let iconUrl = badge.icon || "";
    // If icon is a relative URL, prepend LeetCode base URL
    if (iconUrl && !iconUrl.startsWith("http")) {
      iconUrl = `https://leetcode.com${iconUrl.startsWith("/") ? "" : "/"}${iconUrl}`;
    }
    return {
      id: badge.id,
      name: badge.name,
      icon: iconUrl,
    };
  });

  const stats: LeetCodeStats = {
    username: user.username,
    ranking: user.profile?.ranking || null,
    solved,
    streak: {
      current: streakData.current,
      max: streakData.max,
    },
    badges,
    totalActiveDays: streakData.totalActiveDays,
    updatedAt: new Date().toISOString(),
  };

  // Update cache
  leetcodeCache.set(username.toLowerCase(), {
    data: stats,
    timestamp: Date.now(),
  });

  return stats;
}

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
    "title": "Data & Workflow Automation Intern",
    "company": "RIT Venture Creations Incubator",
    "start": "August 2025",
    "summary": "Focus on migrating existing processes into Airtable, creating database systems, building automation, and streamlining workflows to improve operations. This role complements my background in AI by expanding into data systems, analytics, and process optimization."
  },
  "previous_role": {
    "title": "AI Developer",
    "company": "MAGIC Spell Studios",
    "start": "Jan 2025",
    "end": "August 2025",
    "summary": "Led development of aiPaperboyz – an AI-powered podcast-summarization and transcript-delivery platform."
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
    "frameworks": ["LangChain", "LangFlow", "Crew AI", "Swarm", "Autogen", "PyTorch", "FastAPI", "React", "Tailwind CSS"],
    "tools": ["Airtable", "Docker", "PostgreSQL", "Firebase", "AWS SES", "OpenAI API", "Deepgram", "GitHub", "Zapier", "API Integration Tools"],
    "concepts": ["Workflow Automation", "Database Design & Management", "Data Analytics & Migration", "Process Optimization", "Generative AI", "Agentic AI", "Prompt Engineering", "RAG", "MLOps"]
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

// LeetCode stats endpoint
app.get("/api/leetcode/:username", async (req, res) => {
  const { username } = req.params;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const stats = await fetchLeetCodeStats(username);
    res.json(stats);
  } catch (error: any) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`Unexpected error fetching LeetCode stats: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
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
