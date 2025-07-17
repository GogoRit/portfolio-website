import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

const timelineItems = [
  {
    title: "AI Developer @ Magic Spell Studios",
    period: "Jan 2025 - Present",
    location: "Rochester, NY",
    description:
      "Developing AI-driven summarization and transcript retrieval to reduce podcast discovery time by up to 7x, enhancing user engagement with curated content.",
    highlights: [
      "Designing scalable pipeline to process millions of podcast episodes",
      "Leveraging LangChain and Hugging Face models",
      "Supporting projected 652M global listeners by 2027",
    ],
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "OpenAI GPT-4",
      "Deepgram",
      "AWS SES",
      "Firebase Auth",
      "LangChain",
      "Hugging Face Transformers",
      "Postman",
      "GitLab CI/CD",
    ],
    type: "work",
  },
  {
    title: "Research Trainee @ AWARE-AI NSF Program",
    period: "Aug 2024 - Present",
    location: "Rochester, NY",
    description:
      "Engineered AI systems for multimodal information processing, enhancing human-AI interaction across 4 use cases.",
    highlights: [
      "Improved user engagement by 30% based on feedback metrics",
      "Participated in lab rotations across 3+ AI labs",
      "Contributed to robot-human collaboration project using genetic algorithms, improving efficiency by 20%",
    ],
    tech: ["AI Systems", "Multimodal Processing", "Genetic Algorithms"],
    type: "research",
  },
  {
    title: "Graduate Teaching Assistant @ RIT",
    period: "Aug 2024 - Present",
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
    title: "Junior Data Scientist @ EVOLV (DeMons)",
    period: "Jan 2023 - July 2023",
    location: "Bengaluru, INDIA",
    description:
      "Engineered data-driven models to improve NFT scarcity at 18-employee venture-backed startup.",
    highlights: [
      "15% increase in scarcity value by adjusting 5+ parameters",
      "200+ active participants for future token launches",
      "20% improvement in scarcity factor, 10% increase in perceived value",
    ],
    tech: ["Python", "Statistical Modeling", "Data Analytics", "NFT"],
    type: "work",
  },
];

const TimelineSection: React.FC = () => (
  <section id="timeline" className="py-12 lg:py-16 bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          Career Timeline & <span className="gradient-text">Tech Evolution</span>
        </h2>
        <div className="space-y-8">
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