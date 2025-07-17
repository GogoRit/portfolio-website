import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Sparkles,
  Lightbulb,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Gaurank's AI assistant. Ask me anything about his background, projects, or experience! 🚀",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What is Gaurank currently working on?",
    "What are Gaurank's hobbies?",
    "Tell me about his AI projects",
    "What's his educational background?",
    "What technologies does he use?",
    "How can I contact Gaurank?",
  ];

  const responses: { [key: string]: string } = {
    // Current work
    current:
      "Gaurank is currently working as an AI Developer at Magic Spell Studios, developing AI-driven podcast summarization and transcript retrieval systems. He's also pursuing his MS in Data Science at RIT with a perfect 4.0 GPA and working as a Research Trainee in the AWARE-AI NSF program.",

    // Hobbies and interests
    hobbies:
      "Gaurank enjoys exploring the latest AI research papers, building side projects with LangChain and generative AI, contributing to open-source projects, and staying up-to-date with emerging technologies in the AI/ML space. He's passionate about making AI more transparent and accessible.",

    // AI Projects
    projects:
      "Gaurank has worked on several impressive AI projects: 1) A transparency study on AI-generated news summaries that reduced hallucinations by 90%, 2) A LangChain-based conversational agent with 30% accuracy improvement, and 3) NFT scarcity optimization models at EVOLV startup that increased value by 15%.",

    // Education
    education:
      "Gaurank is pursuing a Master of Science in Data Science at Rochester Institute of Technology (RIT) with a perfect 4.0 GPA, expected to graduate in December 2025. He also has a Bachelor's in Computer Science from LNMIIT, India. His coursework includes Neural Networks, Human Factors in AI, and Software Engineering for Data Science.",

    // Tech stack
    tech: "Gaurank's tech stack includes: AI/ML (LangChain, Hugging Face, OpenAI GPT-4, Deepgram), Backend (FastAPI, PostgreSQL, Docker), Frontend (React, TypeScript, Tailwind CSS), Cloud (AWS, Firebase), and DevOps (GitLab CI/CD, Docker Compose). He specializes in full-stack AI application development.",

    // Contact
    contact:
      "You can reach Gaurank at gm8189@g.rit.edu or call him at +1 (585) 957-6312. He's based in Rochester, NY and is open to opportunities in AI infrastructure, ML products, and full-stack development roles.",

    // Experience
    experience:
      "Gaurank has experience at Magic Spell Studios (AI Developer), AWARE-AI NSF Research Program (Research Trainee), RIT (Teaching Assistant for Neural Networks), and EVOLV startup (Junior Data Scientist). He's worked on scaling AI systems for millions of users and contributed to research improving human-AI interaction.",

    // Skills
    skills:
      "Gaurank excels in Generative AI, Agentic AI systems, LangChain development, prompt engineering, fine-tuning, multimodal AI, FastAPI backend development, React/TypeScript frontends, and MLOps. He's particularly strong in building production-grade AI applications.",

    // Research
    research:
      "Gaurank is working on transparency in AI-generated content, focusing on reducing hallucinations and improving bias detection. He's part of the AWARE-AI NSF Research Traineeship Program and has contributed to robot-human collaboration projects using genetic algorithms.",

    // Default responses
    default:
      "That's a great question! Based on Gaurank's background, I'd recommend checking out his resume or reaching out to him directly at gm8189@g.rit.edu. He's always happy to discuss AI, technology, and potential collaborations! 😊",

    greeting:
      "Hello! I'm here to help you learn more about Gaurank. Feel free to ask about his projects, experience, tech skills, or anything else you'd like to know!",
  };

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("working") ||
      message.includes("current") ||
      message.includes("job")
    ) {
      return responses.current;
    }
    if (
      message.includes("hobby") ||
      message.includes("hobbies") ||
      message.includes("interest")
    ) {
      return responses.hobbies;
    }
    if (
      message.includes("project") ||
      message.includes("ai project") ||
      message.includes("built")
    ) {
      return responses.projects;
    }
    if (
      message.includes("education") ||
      message.includes("school") ||
      message.includes("university") ||
      message.includes("gpa")
    ) {
      return responses.education;
    }
    if (
      message.includes("tech") ||
      message.includes("technology") ||
      message.includes("stack") ||
      message.includes("tools")
    ) {
      return responses.tech;
    }
    if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("phone") ||
      message.includes("reach")
    ) {
      return responses.contact;
    }
    if (
      message.includes("experience") ||
      message.includes("work") ||
      message.includes("job")
    ) {
      return responses.experience;
    }
    if (
      message.includes("skill") ||
      message.includes("expert") ||
      message.includes("good at")
    ) {
      return responses.skills;
    }
    if (
      message.includes("research") ||
      message.includes("paper") ||
      message.includes("study")
    ) {
      return responses.research;
    }
    if (
      message.includes("hi") ||
      message.includes("hello") ||
      message.includes("hey")
    ) {
      return responses.greeting;
    }

    return responses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getResponse(input),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    ); // 1-2 second delay
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[80vh] p-0 gap-0">
        <DialogHeader className="p-4 pb-2 border-b border-border/50">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold">Ask Gaurank AI</div>
              <div className="text-xs text-muted-foreground font-normal">
                Powered by AI • Always learning
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-border/50">
              <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Lightbulb className="w-3 h-3" />
                Try asking:
              </div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-auto py-1 px-2 text-left"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Gaurank..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
