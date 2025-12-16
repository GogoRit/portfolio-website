import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Code, Brain, Zap, Rocket, Database, Blocks } from "lucide-react";

// Skill categories with icons
const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    icon: Code,
    skills: ["Python", "C++", "SQL"],
  },
  {
    id: "ml-systems",
    label: "ML & LLM Systems",
    icon: Brain,
    skills: [
      "PyTorch",
      "Hugging Face Transformers",
      "LangChain",
      "vLLM",
      "Prompt Engineering",
      "DeepSpeed",
    ],
  },
  {
    id: "gpu",
    label: "GPU & Acceleration",
    icon: Zap,
    skills: [
      "CUDA",
      "TensorRT",
      "Mixed-Precision",
      "GPU Profiling",
      "Parallelization",
      "Quantization",
      "Pruning",
    ],
  },
  {
    id: "mlops",
    label: "MLOps & Deployment",
    icon: Rocket,
    skills: [
      "Docker",
      "FastAPI",
      "MLflow",
      "AWS (EC2, S3, SageMaker, Bedrock)",
      "GitLab CI/CD",
      "Kubernetes (K8s)",
    ],
  },
  {
    id: "data",
    label: "Data & Feature Systems",
    icon: Database,
    skills: ["pandas", "NumPy", "FAISS", "Redis", "Pinecone"],
  },
  {
    id: "foundations",
    label: "Foundations",
    icon: Blocks,
    skills: [
      "Algorithms & Data Structures",
      "OOP",
      "Software Engineering Best Practices",
    ],
  },
];

const SkillsSection: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("languages");
  
  const selectedCategory = skillCategories.find(c => c.id === selectedCategoryId) || skillCategories[0];

  return (
    <section id="skills" className="pt-20 lg:pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Skills & <span className="gradient-text">Tools</span>
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              {skillCategories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategoryId === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`glass-card-hover text-sm px-4 py-2 gap-2 ${
                      isActive ? "" : "hover:bg-silver/30"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "" : "text-muted-foreground"}`} />
                    {category.label}
                  </Button>
                );
              })}
            </div>
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="grid gap-4">
                  {selectedCategory.skills.map((skill) => (
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