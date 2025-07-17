import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Sparkles, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function EmbeddedChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm Gaurank's AI assistant. Ask me anything about his background, projects, or experience!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What is Gaurank currently working on?",
    "Tell me about his AI projects",
    "What's his tech stack?",
  ];

  const responses: { [key: string]: string } = {
    // Current work
    current:
      "🚀 Gaurank is currently working as an AI Developer at Magic Spell Studios, developing AI-driven podcast summarization and transcript retrieval systems. He's also pursuing his MS in Data Science at RIT with a perfect 4.0 GPA!",

    // Hobbies and interests
    hobbies:
      "🎯 Gaurank enjoys exploring the latest AI research papers, building side projects with LangChain and generative AI, contributing to open-source projects, and staying up-to-date with emerging technologies in the AI/ML space.",

    // AI Projects
    projects:
      "🤖 Gaurank has worked on several impressive AI projects: 1) A transparency study on AI-generated news summaries that reduced hallucinations by 90%, 2) A LangChain-based conversational agent with 30% accuracy improvement, and 3) NFT scarcity optimization models at EVOLV startup.",

    // Education
    education:
      "🎓 Gaurank is pursuing a Master of Science in Data Science at Rochester Institute of Technology (RIT) with a perfect 4.0 GPA, expected to graduate in December 2025. He also has a Bachelor's in Computer Science from LNMIIT, India.",

    // Tech stack
    tech: "💻 Gaurank's tech stack includes: React, TypeScript, FastAPI, PostgreSQL, Docker, OpenAI GPT-4, Deepgram, LangChain, Hugging Face Transformers, AWS, Firebase Auth, and GitLab CI/CD. He specializes in full-stack AI application development.",

    // Contact
    contact:
      "📧 You can reach Gaurank at gm8189@g.rit.edu or call him at +1 (585) 957-6312. He's based in Rochester, NY and is open to opportunities in AI infrastructure, ML products, and full-stack development roles.",

    // Experience
    experience:
      "💼 Gaurank has experience at Magic Spell Studios (AI Developer), AWARE-AI NSF Research Program (Research Trainee), RIT (Teaching Assistant for Neural Networks), and EVOLV startup (Junior Data Scientist).",

    // Skills
    skills:
      "⚡ Gaurank excels in Generative AI, Agentic AI systems, LangChain development, prompt engineering, fine-tuning, multimodal AI, FastAPI backend development, React/TypeScript frontends, and MLOps.",

    // Research
    research:
      "🔬 Gaurank is working on transparency in AI-generated content, focusing on reducing hallucinations and improving bias detection. He's part of the AWARE-AI NSF Research Traineeship Program.",

    // Default responses
    default:
      "That's a great question! Based on Gaurank's background, I'd recommend checking out his resume or reaching out to him directly at gm8189@g.rit.edu. He's always happy to discuss AI, technology, and potential collaborations! 😊",

    greeting:
      "Hello! I'm here to help you learn more about Gaurank. Feel free to ask about his projects, experience, tech skills, or anything else you'd like to know! ✨",
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
      800 + Math.random() * 800,
    ); // 0.8-1.6 second delay
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
    <div className="w-full mt-16 mb-8 pt-5">
      {/* Chat Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">
            Chat with <span className="gradient-text">Gaurank AI</span>
          </h2>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-center mb-8">
        Ask me anything about my background, projects, or experience!
      </p>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-background/40 backdrop-blur-sm border border-border/20 shadow-lg">
          <CardContent className="p-6">
            <ScrollArea className="h-80 mb-6" ref={scrollAreaRef}>
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/60 text-foreground border border-border/30"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-background/60 text-foreground border border-border/30 rounded-2xl px-4 py-3">
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
              <div className="mb-6 p-4 rounded-xl bg-background/20 border border-border/20">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Lightbulb className="w-4 h-4" />
                  <span className="font-medium">Popular questions:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs h-auto py-2 px-3 text-left glass-card-hover border-border/30"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Gaurank..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 h-12 px-4 text-base"
              />
              <Button
                onClick={handleSend}
                size="lg"
                className="px-6 glow-hover"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
