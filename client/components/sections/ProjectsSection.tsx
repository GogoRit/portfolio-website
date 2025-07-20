import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "RiskScope",
    subtitle: "Georgia Tech Hackathon",
    period: "2024",
    description:
      "AI-driven disaster risk analysis and insurance pricing platform leveraging FEMA data to inform pricing strategies.",
    highlights: [
      "Risk Zone Identification: Categorized all 50 states into low, moderate, and high-risk zones by analyzing disaster frequency and severity",
      "Insurance Price Prediction: Trained regression models to recommend insurance premiums for each risk zone, supporting data-backed pricing decisions",
      "Interactive Visualization: Built a Streamlit dashboard with Plotly maps to explore risk zones and pricing recommendations in real time",
      "Data Preprocessing & Scalability: Engineered robust data cleaning and imputation pipelines to handle inconsistent FEMA datasets, enabling scalable analysis",
    ],
    tech: ["Python", "Streamlit", "Plotly", "FEMA API", "Machine Learning", "Geospatial Analysis"],
    status: "Completed",
    hasDemo: false,
    githubUrl: "https://github.com/GogoRit/Hacklytics-Challenge",
  },
  {
    title: "QnA-RAG-App with Gemma & Groq API",
    subtitle: "RAG Application",
    period: "2024",
    description:
      "Scalable retrieval-augmented Q&A application combining Gemma language models with the Groq API for fast, context-aware answers.",
    highlights: [
      "Gemma Integration: Utilizes Gemma for advanced generative Q&A capabilities",
      "Groq API: Provides high-performance retrieval of relevant documents at scale",
      "Retrieval-Augmented Generation: Merges generative and retrieval systems for accurate, context-rich responses",
      "Interactive UI: Built with Python and Streamlit for a user-friendly interface",
      "Scalable Architecture: Designed to handle large datasets and concurrent users",
    ],
    tech: ["Python", "Streamlit", "Gemma", "Groq API", "RAG", "LangChain"],
    status: "Completed",
    hasDemo: false,
    githubUrl: "https://github.com/GogoRit/QnA-RAG-App-with-Gemma-and-Groq-API",
  },
  {
    title: "Financial-Agentic-AI-chatbot",
    subtitle: "Financial AI Agent",
    period: "2024",
    description:
      "Cloud-deployed, API-driven Financial Agentic AI that analyzes market data and delivers insights at scale.",
    highlights: [
      "Integrated Data Sources: Aggregates data from PHI Data, Yahoo Finance (yfinance), and DuckDuckGo for comprehensive financial context",
      "Scalable Architecture: Leverages Groq Cloud Playground to handle large volumes of queries with minimal latency",
      "API-Driven Design: Built on FastAPI and Uvicorn for seamless integration and rapid deployment",
      "User-Friendly Deployment: Packaged for easy setup via `pip install -r requirements.txt` and one-click launch in Groq Cloud Playground",
    ],
    tech: ["Python", "FastAPI", "Uvicorn", "Groq Cloud", "yfinance", "DuckDuckGo API"],
    status: "Completed",
    hasDemo: false,
    githubUrl: "https://github.com/GogoRit/Financial-Agentic-AI-chatbot",
  },
];

const ProjectsSection: React.FC = () => (
  <section id="projects" className="pt-16 lg:pt-20 pb-12">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="glass-card-hover group cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      <a 
                        href={project.githubUrl} 
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection; 