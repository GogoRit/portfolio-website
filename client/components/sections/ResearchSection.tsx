import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLink, ChevronRight } from "lucide-react";

const researchProjects = [
  {
    title: "NewsLens AI: NER-Guided Summarization for Transparent News",
    subtitle: "Capstone Project - RIT",
    period: "Jan 2024 - May 2025",
    description:
      "Designed and implemented a NER-guided summarization pipeline for LLMs, applied to 1,500 real-world news articles to improve factual alignment and reduce hallucinations.",
    highlights: [
      "Improved factual alignment by 9.8% BERTScore, reducing hallucinated entities by ~30% using entity-aware prompting",
      "Evaluated model outputs for bias, sentiment, and toxicity, achieving a 35% reduction in bias drift and ~60% drop in toxicity",
      "Maintained source tone and entity fidelity while enhancing transparency in AI-generated news summaries",
    ],
    tech: ["GPT-3.5", "Hugging Face Transformers", "TensorFlow", "Python 3", "LlaMA-2"],
    status: "Research",
    hasDemo: false,
    hasResearchPaper: true,
    researchPaperUrl: "/Capstone_Research.pdf",
  },
];

const ResearchSection: React.FC = () => (
  <section id="research" className="pt-20 lg:pt-24 pb-12">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Featured <span className="gradient-text">Research</span>
        </h2>
        <div className="grid lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {researchProjects.map((project, index) => (
            <Card key={index} className="glass-card-hover group cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      <a 
                        href="https://github.com/GogoRit/NewsLensAI" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {project.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {project.subtitle} • {project.period}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      project.status === "Completed"
                        ? "default"
                        : project.status === "Research"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <ul className="space-y-1 mb-4">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ChevronRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.hasDemo && (
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  )}
                  {project.hasResearchPaper && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.researchPaperUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Research Paper
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ResearchSection; 