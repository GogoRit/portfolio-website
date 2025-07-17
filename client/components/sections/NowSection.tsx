import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Building, GraduationCap, Calendar } from "lucide-react";

const NowSection: React.FC = () => (
  <section id="now" className="section-sm bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">
          🚀 Now — Building <span className="gradient-text">1% Better, Every Day</span>
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
);

export default NowSection; 