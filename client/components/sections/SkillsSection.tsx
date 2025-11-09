import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const skillCategories = {
  "💻 Languages": [
    "Python",
    "C++",
    "SQL",
  ],
  "🤖 ML & LLM Systems": [
    "PyTorch",
    "Hugging Face Transformers",
    "LangChain",
    "vLLM",
    "Prompt Engineering",
    "DeepSpeed",
  ],
  "⚡ GPU & Acceleration": [
    "CUDA",
    "TensorRT",
    "Mixed-Precision",
    "GPU Profiling",
    "Parallelization",
    "Quantization",
    "Pruning",
  ],
  "🚀 MLOps & Deployment": [
    "Docker",
    "FastAPI",
    "MLflow",
    "AWS (EC2, S3, SageMaker, Bedrock)",
    "GitLab CI/CD",
    "Kubernetes (K8s)",
  ],
  "📊 Data & Feature Systems": [
    "pandas",
    "NumPy",
    "FAISS",
    "Redis",
    "Pinecone",
  ],
  "🏗️ Foundations": [
    "Algorithms & Data Structures",
    "OOP",
    "Software Engineering Best Practices",
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