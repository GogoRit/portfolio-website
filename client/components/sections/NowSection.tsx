import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Building, GraduationCap, Calendar, Badge, Presentation } from "lucide-react";

const NowSection: React.FC = () => (
  <section id="now" className="pt-20 lg:pt-24 pb-12 bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Now — What I'm <span className="gradient-text">Working On</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-purple-500" />
                Preparing for AAAI 2026 Presentation
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                Singapore • January 2026
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Accepted to AAAI 2026 (Student Abstract) with NewsLensAI research. Selected for spotlight 3-minute oral presentation and nominated for Best Abstract Competition. Currently preparing presentation materials and refining research findings for the conference in Singapore.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  January 2026
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Automation Engineer @ Venture Creations Incubator (RIT)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Focus on creating database systems, building automation, and streamlining workflows to improve operations. This role complements my background in AI by expanding into data systems, analytics, and process optimization.
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
                AI Engineer @ MAGIC Spell Studios
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                Recently Completed • Jan-Aug 2025
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Led technical development of a transcript-first platform with personalized delivery and AI-driven workflows, reaching ~86% attribution accuracy by MVP stage, with ongoing improvements, tiered access and automated email workflows.
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