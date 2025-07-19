import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
  Paperclip,
} from "lucide-react";
import { JDUpload } from "./JDUpload";

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
  const [jdContent, setJdContent] = useState<string | null>(null);
  const [jdFileName, setJdFileName] = useState<string | null>(null);
  const [showJDUpload, setShowJDUpload] = useState(true);
  const [jdCollapsed, setJdCollapsed] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What is Gaurank currently working on?",
    "What are Gaurank's hobbies?",
    "Tell me about his AI projects",
    "What's his educational background?",
    "What technologies does he use?",
    "How can I contact Gaurank?",
  ];

  // ✨ All responses now come from the backend `/api/chat` endpoint.

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-sm sm:w-80 md:w-96 h-auto max-h-[80vh] sm:h-[400px] md:h-[600px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b border-border/50">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold">Ask Gaurank AI</div>
              <div className="text-xs text-muted-foreground font-normal">
                Powered by AI • Based on Gaurank's real-world experience
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area - Auto-scroll only this section */}
          <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <Paperclip className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2">
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

          {/* JD Upload Section */}
          {(showJDUpload || jdContent) && (
            <div className="p-4 border-t border-border/50">
              <JDUpload 
                onJDChange={handleJDChange} 
                onJDAutofill={handleJDAutofill}
                isCollapsed={jdCollapsed}
                className="mb-4" 
              />
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
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
                className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px] max-h-[160px] overflow-y-auto"
                rows={1}
                style={{ 
                  whiteSpace: "pre-wrap", 
                  wordBreak: "break-word",
                  lineHeight: "1.5"
                }}
              />
              <Button onClick={handleSend} size="sm" className="px-3 self-end">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
