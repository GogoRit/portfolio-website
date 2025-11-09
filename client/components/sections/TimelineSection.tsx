import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

const timelineItems = [
  {
    title: "Automation Engineer @ Venture Creations Incubator (RIT)",
    period: "August 2025 - Present",
    location: "Rochester, NY",
    description:
      "Focus on creating database systems, building automation, and streamlining workflows to improve operations. This role complements my background in AI by expanding into data systems, analytics, and process optimization.",
    highlights: [
      "Migrated 6+ internal workflows to unified database systems using Python + SQL ETL pipelines, improving data reliability and enabling real-time reporting across incubator operations.",
      "Built scalable database systems using PostgreSQL and Airtable, enabling real-time reporting and data analysis across incubator operations.",
      "Implemented data analytics solutions to optimize business processes.",
    ],
    tech: [
      "ETL Pipelines",
      "Database Systems",
      "Workflow Automation",
      "Data Analytics",
      "Process Optimization",
      "Python",
      "SQL",
      "PostgreSQL",
    ],
    type: "work",
  },
  {
    title: "AI Engineer @ MAGIC Spell Studios",
    period: "Jan 2025 - August 2025",
    location: "Rochester, NY",
    description:
      "Led technical development of a transcript-first platform with personalized delivery and AI-driven workflows, reaching ~86% attribution accuracy by MVP stage, with ongoing improvements, tiered access and automated email workflows.",
    highlights: [
      "Designed LangChain multi-agent pipelines for podcast transcription (Deepgram ASR, Hugging Face, GPT); improved token usage to cut inference cost by ~35% and achieve ~86% speaker attribution accuracy on 20k+ episodes (~50k hrs).",
      "Engineered FastAPI APIs powering the MVP, deployed via AWS + GitLab CI/CD; added latency and cost monitoring that reduced iteration cycles by ~20%.",
      "Implemented email delivery workflows with AWS SES, enabling personalized content delivery to subscribers.",
    ],
    tech: [
      "LLM Pipelines",
      "LangChain",
      "FastAPI",
      "AWS",
      "GitLab CI/CD",
      "Docker",
      "LLM Ops",
      "Inference Optimization",
      "MLOps",
    ],
    type: "work",
  },
  {
    title: "Applied Research Engineer @ AWARE-AI NSF Program",
    period: "Aug 2024 - Aug 2025",
    location: "Rochester, NY",
    description:
      "Engineered AI systems for multimodal information processing, enhancing human-AI interaction across 4 use cases.",
    highlights: [
      "Optimized multimodal signal pipelines (EEG, EMG, ECG, motion capture) in PyTorch with CUDA (Python); reduced inference latency by ~30%, enabling near real-time deployment in human–robot collaboration (HRC) tasks.",
      "Benchmarked and accelerated ML inference with TensorRT vs. PyTorch baselines; improved throughput by ~1.5× and validated deployment on UR-10 and Sawyer robots for synchronized HRC experiments.",
      "Contributed to a robot–human collaboration project using genetic algorithms, improving task-completion efficiency by 20%.",
    ],
    tech: ["AI Systems", "Multimodal Processing", "Genetic Algorithms", "Human-AI Interaction", "PyTorch", "CUDA", "TensorRT", "Inference Optimization", "MLOps", "HRC"],
    type: "research",
  },
  {
    title: "Graduate Teaching Assistant @ RIT",
    period: "Aug 2024 - May 2025",
    location: "Rochester, NY",
    description:
      "Teaching Neural Networks (DSCI-640) and Applied Data Science (DSCI-601) in the Department of Software Engineering.",
    highlights: [
      "Supporting students in advanced neural network concepts",
      "Facilitating hands-on data science projects",
      "Contributing to curriculum development",
    ],
    tech: ["Neural Networks", "Data Science", "Teaching"],
    type: "academic",
  },
  {
    title: "Machine Learning Engineer @ EVOLV (DeMons)",
    period: "Jan 2023 - July 2023",
    location: "Bengaluru, INDIA",
    description:
      "Engineered data-driven models to optimize NFT scarcity using user engagement metrics and rule-based parameter tuning.",
    highlights: [
      "Built ML-driven scarcity and drop-timing models using Python/SQL, pandas, NumPy, scikit-learn; applied feature engineering to optimize transaction data, boosting launch engagement by ~18%.Tuned 5+ scarcity parameters, yielding a 15% increase in overall scarcity value across the collection",
      "Revamped statistical valuation models for 600+ digital assets; automated release-timing recommendations and dashboards, improving market value perception of NFT assets by ~10% and strengthening early-stage trading liquidity.",
      "Increased the perceived value of 666 limited DeMons NFTs by 10%",
    ],
    tech: ["Python", "SQL", "pandas", "NumPy", "scikit-learn", "ML-driven Scarcity", "NFT", "Rule-based Systems", "Market Value Perception", "Early-stage Trading Liquidity"],
    type: "work",
  },
];

const TimelineSection: React.FC = () => (
  <section id="timeline" className="pt-20 lg:pt-24 pb-12 bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Career Timeline & <span className="gradient-text">Tech Evolution</span>
        </h2>
        <div className="space-y-6">
          {timelineItems.map((item, index) => (
            <div key={index} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                    item.type === "work"
                      ? "bg-primary"
                      : item.type === "research"
                      ? "bg-accent"
                      : "bg-accent-secondary"
                  } group-hover:scale-125`}
                ></div>
                {index !== timelineItems.length - 1 && (
                  <div className="w-px h-20 bg-border mt-4"></div>
                )}
              </div>
              <Card className="flex-1 glass-card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        item.type === "work"
                          ? "default"
                          : item.type === "research"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {item.type === "work"
                        ? "Work"
                        : item.type === "research"
                        ? "Research"
                        : "Academic"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TimelineSection; 