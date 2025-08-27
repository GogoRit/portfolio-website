import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Building, GraduationCap, Calendar, Rocket, Badge } from "lucide-react";
import { Progress } from "../ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const NowSection: React.FC = () => (
  <section id="now" className="pt-20 lg:pt-24 pb-12 bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Now — Building <span className="gradient-text">1% Better, Every Day</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                Data & Workflow Automation Intern @ RIT Venture Creations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Currently migrating existing processes into Airtable, creating database 
                systems, and building automation workflows to streamline operations. 
                Expanding my expertise from AI development into comprehensive data 
                systems, analytics, and process optimization.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  August 2025 - Present
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="w-5 h-5 text-blue-500" />
                AI Developer @ MAGIC Spell Studios
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                Recently Completed • Jan-Aug 2025
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Successfully engineered and launched the MVP of aiPaperboyz—a full-stack 
                AI-driven podcast transcript platform indexing millions of episodes. 
                Delivered production-ready demo with 86% attribution accuracy.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Jan 2025 - August 2025
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