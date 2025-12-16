import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { ExternalLink, Globe } from "lucide-react";
import { projects, getGitHubUrl, GITHUB_USERNAME } from "@/data/projects";

// Language color mapping (GitHub style)
const languageColors: Record<string, string> = {
  Python: "bg-blue-500",
  "C++": "bg-pink-500",
  TypeScript: "bg-blue-600",
  JavaScript: "bg-yellow-400",
  Rust: "bg-orange-500",
  Go: "bg-cyan-500",
  Java: "bg-red-500",
};

// GitHub icon component
const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ProjectsSection: React.FC = () => (
  <section id="projects" className="pt-20 lg:pt-24 pb-12">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Open Source <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground">
            Each project is well-documented in its repository.{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              View all on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => {
            const repoUrl = getGitHubUrl(project.repoName);
            const langColor = languageColors[project.language] || "bg-gray-500";

            return (
              <a
                key={project.repoName}
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <GitHubIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{project.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed line-clamp-2 mb-3 min-h-[2.5rem]">
                      {project.description}
                    </CardDescription>
                    
                    {/* Metadata row */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        {/* Language */}
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${langColor}`} />
                          {project.language}
                        </span>
                        
                        {/* Visibility */}
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {project.visibility}
                        </span>
                      </div>

                      {/* View Repo action */}
                      <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Repo
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
