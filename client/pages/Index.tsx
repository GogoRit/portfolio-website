import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AIChatbot } from "../components/AIChatbot";
import { EmbeddedChat } from "../components/EmbeddedChat";
import {
  Github,
  Linkedin,
  Download,
  ExternalLink,
  MessageCircle,
  Calendar,
  MapPin,
  Code,
  Brain,
  Database,
  Cloud,
  Rocket,
  Star,
  ChevronRight,
  Award,
  GraduationCap,
  Building,
} from "lucide-react";

export default function Index() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(
    "🧠 AI & Machine Learning",
  );
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

  const certifications = [
    "The Data Scientist's Toolbox (Coursera)",
    "Python Data Structures (Coursera)",
    "Python for Data Science and Machine Learning Bootcamp (Udemy)",
    "2022 Complete Python Bootcamp from Zero to Hero (Udemy)",
    "Data Structures and Algorithms (GeeksForGeeks)",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-28 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Hi, I'm <span className="gradient-text">Gaurank</span> —
                building <span className="gradient-text">AI systems</span> with
                impact, adaptability, and curiosity.
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
                AI Developer at Magic Spell Studios & MS Data Science student at
                RIT (4.0 GPA). Specializing in LangChain, Generative AI, and
                scalable ML systems for real-world applications.
              </p>

              <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Rochester, NY
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  RIT - Expected Dec 2025
                </span>
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  Magic Spell Studios
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <Button size="lg" className="glow-hover">
                  <Download className="w-5 h-5 mr-2" />
                  Resume
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-card-hover"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-card-hover"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </div>

              {/* Embedded Chat Interface */}
              <EmbeddedChat />
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline & Tech Evolution */}
      <section className="py-12 lg:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Career Timeline &{" "}
              <span className="gradient-text">Tech Evolution</span>
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
                          <CardTitle className="text-xl">
                            {item.title}
                          </CardTitle>
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
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
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

      {/* Projects Showcase */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Featured <span className="gradient-text">Projects</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="glass-card-hover group cursor-pointer"
                >
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
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
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

      {/* Now Section */}
      <section className="section-sm bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              🚀 Now — Building{" "}
              <span className="gradient-text">1% Better, Every Day</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card text-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    AI Developer @ Magic Spell Studios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Building AI-driven podcast discovery platform with LangChain
                    and Hugging Face, processing millions of episodes for 652M
                    projected global listeners.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Jan 2025 - Present
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card text-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-accent" />
                    MS Data Science @ RIT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Perfect 4.0 GPA pursuing advanced studies in Neural
                    Networks, Human Factors in AI, and Software Engineering for
                    Data Science.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Expected Dec 2025
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Panel */}
      <section className="section">
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

      {/* Education & Certifications */}
      <section className="section-sm bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Education & <span className="gradient-text">Certifications</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">
                      Master of Science in Data Science
                    </h3>
                    <p className="text-muted-foreground">
                      Rochester Institute of Technology (RIT)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cumulative GPA: 4.0/4.0 • Expected Dec 2025
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Bachelor of Technology in Computer Science
                    </h3>
                    <p className="text-muted-foreground">
                      The LNM Institute of Information Technology (LNMIIT)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      July 2019 - May 2023
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    Certifications & Training
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-muted-foreground mb-2">
              Open to opportunities in AI infrastructure, ML products, and
              full-stack development
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              📧 gm8189@g.rit.edu • 📱 +1 (585) 957-6312 • 📍 Rochester, NY
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="glow-hover">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 glow animate-float"
          onClick={() => setIsChatbotOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* AI Chatbot */}
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
}
