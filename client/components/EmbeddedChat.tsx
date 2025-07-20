import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Sparkles, Lightbulb, Paperclip } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { motion, useInView } from "framer-motion";
import { JDUpload } from "./JDUpload";
import { useTooltipPosition } from "./ui/tooltip";

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
      text: "Hi! I'm Gaurank's AI assistant. Ask me anything about his background, projects, or experience!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [jdContent, setJdContent] = useState<string | null>(null);
  const [jdFileName, setJdFileName] = useState<string | null>(null);
  const [showJDUpload, setShowJDUpload] = useState(true);
  const [jdCollapsed, setJdCollapsed] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const quickQuestions = [
    "What is Gaurank currently working on?",
    "Tell me about his AI projects",
    "What's his tech stack?",
    "Why should we hire him?",
    "What's something quirky about him?",
    "Tell me about aiPaperboyz in one sentence.",
  ];

  // ✨ Responses now come from backend `/api/chat`.

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

    // Collapse JD area immediately after sending, but keep it visible
    if (jdContent) {
      setJdCollapsed(true);
      // Don't hide the JD upload section completely - keep it as collapsed bar
      // setShowJDUpload(false); // Remove this line
    }

    try {
      let response;
      
      if (jdContent) {
        // Send with JD content (either file or text)
        const formData = new FormData();
        formData.append('message', input);
        
        if (jdFileName) {
          // If we have a file name, treat as file upload
          // For now, we'll send as text since we don't have the actual file
          formData.append('jdText', jdContent);
        } else {
          // Send as text input
          formData.append('jdText', jdContent);
        }
        
        response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });
      } else {
        // Regular chat without JD
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });
      }

      const data = await response.json();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer ?? "Sorry, I couldn't fetch a response.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong while contacting the AI service.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleJDChange = (content: string | null, fileName?: string) => {
    setJdContent(content);
    setJdFileName(fileName || null);
  };

  const handleJDAutofill = (query: string) => {
    setInput(query);
    // Focus the input after a short delay to ensure the component has updated
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Auto-resize textarea - no internal scrollbar until max height
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px"; // Max height of 160px (h-40)
  };

  // Auto-scroll to bottom when new bot messages are added (only response area)
  useEffect(() => {
    if (chatEndRef.current && (messages.length > 0 || isTyping)) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const infoIconRef = useRef(null);
  const infoTooltipRef = useRef(null);
  const bestInfoSide = useTooltipPosition(infoIconRef, infoTooltipRef, 'top', 8);

  return (
    <motion.section
      id="ai"
      className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden w-full"
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } : {}}
    >
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
            Online • Powered by Gaurank's real-world experience
            {/* Info tooltip */}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span ref={infoIconRef} className="cursor-help text-muted-foreground">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                </TooltipTrigger>
                <TooltipContent ref={infoTooltipRef} side={bestInfoSide} className="max-w-xs text-center">
                  This assistant is grounded in Gaurank's resume, research, and project work and responds like a recruiter-facing AI with personality.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-center mb-8">
        Ask me anything about my background, projects, or experience!
      </p>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="bg-background/60 backdrop-blur-md border border-border/30 shadow-2xl rounded-3xl">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Messages Area - Auto-scroll only this section */}
            <ScrollArea className="h-[20rem] sm:h-[24rem] md:h-[28rem] mb-4 sm:mb-6 md:mb-8 pr-2 overflow-y-auto" ref={scrollAreaRef}>
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
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                        <Paperclip className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-background/60 text-foreground border border-border/30 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Auto-scroll anchor */}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-5 rounded-2xl bg-background/30 border border-border/30">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">Popular questions:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs h-auto py-1 sm:py-2 px-2 sm:px-3 text-left glass-card-hover border-border/30"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* JD Upload Section */}
            {(showJDUpload || jdContent) && (
              <div className="mb-6">
                <JDUpload 
                  onJDChange={handleJDChange} 
                  onJDAutofill={handleJDAutofill}
                  isCollapsed={jdCollapsed}
                />
              </div>
            )}

            {/* Input Area */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder={jdContent ? "Ask about this job description..." : "Ask me anything about Gaurank..."}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 resize-none rounded-xl border border-border/30 bg-background/60 px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-sm sm:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] sm:min-h-[56px] max-h-[160px] overflow-y-auto shadow-sm"
                rows={1}
                style={{ 
                  whiteSpace: "pre-wrap", 
                  wordBreak: "break-word",
                  lineHeight: "1.5"
                }}
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="px-3 sm:px-4 md:px-6 glow-hover shadow-md self-end"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
