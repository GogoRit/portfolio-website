import { Router } from "express";
import OpenAI from "openai";
import path from "path";
import fs from "fs";

// Load the profile JSON once at startup
const profilePath = path.resolve(__dirname, "../../data/gaurank.json");
const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatRouter = Router();

chatRouter.post("/", async (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message) {
    return res.status(400).json({ error: "'message' field is required" });
  }

  // Build system prompt with embedded profile data
  const systemPrompt = `You are Gaurank Maheshwari’s AI career assistant.
Respond in third-person with a friendly, intelligent tone suitable for recruiters or senior developers.
Use real data from Gaurank's profile.

Style:
- Concise (aim for 2–3 sentences unless detail is needed), confident, and thoughtful
- Highlight achievements with impact (metrics, outcomes)
- Use humor or clever movie references if the question is informal (e.g., The Godfather, The Social Network, 3 Idiots)
- For quirky questions like “What would he build with no internet?” or “What’s his working style at 2AM?”, feel free to improvise from fun_facts
- If unsure, say: “I’m not certain, but based on what I know…”
- Keep the overall vibe professional yet witty and smart

Profile JSON:\n${JSON.stringify(profile, null, 2)}\n`;

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