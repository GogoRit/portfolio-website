import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const skillCategories = {
  "💻 Languages": [
    "Python",
    "SQL", 
    "TypeScript",
    "HTML",
  ],
  "🔧 Frameworks & Libraries": [
    "FastAPI",
    "React.js",
    "Tailwind CSS",
    "Hugging Face Transformers",
    "LangChain",
    "Autogen",
  ],
  "🛠️ Tools & Platforms": [
    "Airtable",
    "Docker",
    "AWS (RDS, S3, SES)",
    "Redis",
    "Firebase",
    "Deepgram Nova",
    "OpenAI API",
    "Celery",
    "Zapier",
    "API Integration Tools",
  ],
  "🧠 Core Competencies": [
    "Workflow Automation",
    "Database Design & Management",
    "Data Analytics & Migration",
    "Process Optimization",
    "Generative & Agentic AI",
    "Prompt Engineering",
    "LLM fine‑tuning",
    "RAG pipelines",
    "MLOps",
    "Scalable API design",
    "User Acceptance Testing (UAT)",
  ],
};

const SkillsSection: React.FC = () => {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(
    "💻 Languages"
  );
  return (
    <section id="skills" className="pt-20 lg:pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Skills & <span className="gradient-text">Tools</span>
          </h2>
          <div className="space-y-6">
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