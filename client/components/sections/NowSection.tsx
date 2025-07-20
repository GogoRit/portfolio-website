import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Building, GraduationCap, Calendar, Rocket, Badge } from "lucide-react";
import { Progress } from "../ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const NowSection: React.FC = () => (
  <section id="now" className="pt-16 lg:pt-20 pb-12 bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Now — Building <span className="gradient-text">1% Better, Every Day</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-green-500" />
                1% Better
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                Side Hustle • Early Stage
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Creating AI-driven agents to automate manual office workflows in 
                traditionally non-technical small-business environments—research shows 
                98% of these offices face the same bottlenecks—delivering up to 35% 
                time savings on routine tasks. The solution is now in domain-expert 
                review to finalize integration and rollout plans.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">10%</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <Progress value={10} className="h-2" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current Status: Domain Expert Review</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                AI Developer @ Magic Spell Studios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Engineered and launched the MVP of a full-stack AI-driven podcast 
                transcript discovery platform—indexing millions of episodes and 
                delivering a standalone, read-only consumption experience. The MVP 
                is in private testing—happy to demo it during interviews.
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
);

export default NowSection; 