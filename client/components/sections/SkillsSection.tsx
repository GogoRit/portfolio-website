import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const skillCategories = {
  "🧠 AI & Machine Learning": [
    "Generative AI (GPT-4, Gemini, Claude, Phi)",
    "Large Language Models (LLaMA-2, Hugging Face)",
    "Agentic AI (LangChain, CrewAI, Autogen, Swarm)",
    "Named Entity Recognition (NER)",
    "Hallucination Detection",
    "Prompt Engineering (RAG, few-shot)",
    "Fine-tuning & Evaluation",
    "Multimodal AI (text/audio)",
  ],
  "🔧 Backend & API Development": [
    "FastAPI (production-grade APIs)",
    "PostgreSQL (complex relational schema)",
    "Docker (local development & deployment)",
    "Firebase Auth (JWT integration)",
    "AWS SES (transactional email workflows)",
    "Cron Jobs & Task Scheduling",
    "REST API design",
    "Rate limiting, pagination",
  ],
  "💻 Frontend Engineering": [
    "React + TypeScript",
    "Vite (lightweight dev server)",
    "Tailwind CSS (utility-first, responsive)",
    "Protected Routes, Layout Switching",
    "Streamlit (AI demos and dashboards)",
    "Postman (API testing collections)",
    "Component-driven UI",
    "Responsive design",
  ],
  "📦 AI Tools & Data Libraries": [
    "Hugging Face Transformers",
    "OpenAI API (chat + completions)",
    "Deepgram (Nova-3 ASR, diarization)",
    "FAISS (semantic retrieval)",
    "pandas, NumPy, scikit-learn",
    "Jupyter, VSCode",
    "LangGraph",
    "Vector databases",
  ],
  "☁️ Deployment, Infra & DevOps": [
    "Docker Compose (multi-container)",
    "AWS EC2 & RDS (cloud deployment)",
    "GitHub Actions (CI/CD testing)",
    "Firebase (auth and hosting)",
    "Environment-based configuration",
    "Secret management",
    "Infrastructure as Code",
    "Monitoring & logging",
  ],
  "📊 Data Science & Analytics": [
    "Data Analysis (EDA, visualization)",
    "TensorFlow / PyTorch",
    "Tableau (dashboard building)",
    "SQL (queries + migrations)",
    "Statistical modeling",
    "Model evaluation",
    "Data preprocessing",
    "Predictive analytics",
  ],
};

const SkillsSection: React.FC = () => {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(
    "🧠 AI & Machine Learning"
  );
  return (
    <section id="skills" className="section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            Skills & <span className="gradient-text">Tools</span>
          </h2>
          <div className="space-y-8">
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(skillCategories).map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedSkillCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedSkillCategory(category)}
                  className="glass-card-hover text-sm px-4 py-2"
                >
                  {category}
                </Button>
              ))}
            </div>
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="grid gap-4">
                  {skillCategories[
                    selectedSkillCategory as keyof typeof skillCategories
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="tech-badge text-left py-3 px-4 hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 