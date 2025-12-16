import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface TimelineItem {
  slug: string;
  title: string;
  company: string;
  dateRange: string;
  location: string;
  summary: string;
}

const timelineItems: TimelineItem[] = [
  {
    slug: "automation-engineer-venture-creations",
    title: "Automation Engineer",
    company: "Venture Creations Incubator",
    dateRange: "August 2025 - Present",
    location: "Rochester, NY",
    summary: "Built internal automation and data systems that unified fragmented workflows and improved operational visibility through reliable reporting.",
  },
  {
    slug: "ai-engineer-magic-spell-studios",
    title: "AI Engineer",
    company: "MAGIC Spell Studios",
    dateRange: "Jan 2025 - August 2025",
    location: "Rochester, NY",
    summary: "Shipped a transcript first AI platform with automated delivery workflows and improved speaker attribution while reducing inference cost.",
  },
  {
    slug: "applied-research-engineer-aware-ai",
    title: "Applied Research Engineer",
    company: "AWARE-AI NSF Program",
    dateRange: "Aug 2024 - Aug 2025",
    location: "Rochester, NY",
    summary: "Optimized multimodal ML pipelines and accelerated inference for human robot collaboration experiments under real time constraints.",
  },
  {
    slug: "ml-engineer-evolv-demons",
    title: "Machine Learning Engineer",
    company: "EVOLV (DeMons)",
    dateRange: "Jan 2023 - July 2023",
    location: "Bengaluru, INDIA",
    summary: "Built data driven modeling and analytics to improve NFT scarcity strategy and increase launch engagement through better timing and parameter tuning.",
  },
];

const TimelineSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Note: Scroll restoration is now handled globally in App.tsx ScrollRestoration component
  // This useEffect is kept as a backup but primary logic is in App.tsx

  const handleCardClick = (slug: string) => {
    // Save current scroll position before navigating
    const scrollPosition = window.scrollY || window.pageYOffset;
    sessionStorage.setItem("timelineScrollPosition", scrollPosition.toString());
    navigate(`/case-study/${slug}`);
  };

  return (
    <section id="timeline" className="pt-20 lg:pt-24 pb-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Career Timeline & <span className="gradient-text">Tech Evolution</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timelineItems.map((item) => (
              <Card
                key={item.slug}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                onClick={() => handleCardClick(item.slug)}
              >
                <CardHeader>
                  <CardTitle className="text-xl mb-1">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium mb-2">
                    {item.company}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-4 text-sm flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.dateRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {item.summary}
                  </p>
                  <div
                    className="flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(item.slug);
                    }}
                  >
                    Role breakdown
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection; 