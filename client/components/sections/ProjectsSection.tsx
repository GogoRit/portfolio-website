import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Study on Transparency in AI-Generated News Summaries",
    subtitle: "Capstone Project - RIT",
    period: "Jan 2024 - Present",
    description:
      "Advanced research on reducing hallucinations and enhancing transparency in bias detection for AI-generated content.",
    highlights: [
      "Reduced hallucinations by over 90%",
      "Enhanced transparency in bias detection",
      "Established key area for ongoing research",
    ],
    tech: ["GPT-3.5", "Hugging Face", "TensorFlow", "Python", "LlaMA-2"],
    status: "Research",
    hasDemo: false,
  },
  {
    title: "LangChain-Based Conversational Agent",
    subtitle: "Knowledge Extraction & Q&A System",
    period: "Nov 2024 - Dec 2024",
    description:
      "Developed advanced conversational agent using FAISS for document retrieval and GPT for contextually relevant answers.",
    highlights: [
      "30% accuracy improvement across 100+ queries",
      "Real-time interaction interface",
      "Handles 50+ concurrent queries",
    ],
    tech: ["LangChain", "Hugging Face", "OpenAI API", "FAISS", "Streamlit"],
    status: "Completed",
    hasDemo: true,
  },
  {
    title: "NFT Scarcity Optimization System",
    subtitle: "EVOLV - DeMons Project",
    period: "Jan 2023 - July 2023",
    description:
      "Data-driven models for NFT scarcity optimization using statistical modeling and user engagement metrics.",
    highlights: [
      "15% increase in scarcity value",
      "200+ community participants engaged",
      "20% improvement in scarcity factor",
    ],
    tech: ["Python", "Statistical Modeling", "Data Analytics"],
    status: "Production",
    hasDemo: false,
  },
];

const ProjectsSection: React.FC = () => (
  <section id="projects" className="section min-h-screen">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="glass-card-hover group cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
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
                {project.hasDemo && (
                  <Button variant="ghost" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection; 