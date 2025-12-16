import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { GraduationCap, Calendar, Presentation, Sparkles, Code2, Loader2, Flame, Trophy, Target } from "lucide-react";
import { Progress } from "../ui/progress";
import { useLeetCode } from "@/hooks/useLeetCode";
import { profileConfig } from "@/config/profile";

// Format relative time
function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

// LeetCode Card Component - Featured/Larger design
const LeetCodeCard: React.FC = () => {
  const { username, targetSolved } = profileConfig.leetcode;
  const { data, isLoading, isError, error } = useLeetCode(username);

  const progress = data ? Math.min((data.solved.total / targetSolved) * 100, 100) : 0;

  return (
    <Card className="glass-card text-left bg-gradient-to-br from-orange-500/5 via-transparent to-yellow-500/5 border-orange-500/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Code2 className="w-6 h-6 text-orange-500" />
            Technical Practice
          </CardTitle>
          <a 
            href={`https://leetcode.com/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-orange-500 transition-colors"
          >
            @{username} ↗
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          Daily algorithm practice on LeetCode
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading stats...</span>
          </div>
        ) : isError ? (
          <p className="text-muted-foreground py-4">
            Unable to load LeetCode stats. {error?.message}
          </p>
        ) : data ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Problems Solved */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Target className="w-4 h-4" />
                Problems Solved
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{data.solved.total}</span>
                <span className="text-muted-foreground">/ {targetSolved}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-500/10 rounded-lg p-2">
                  <div className="text-green-600 font-bold text-lg">{data.solved.easy}</div>
                  <div className="text-xs text-muted-foreground">Easy</div>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-2">
                  <div className="text-yellow-600 font-bold text-lg">{data.solved.medium}</div>
                  <div className="text-xs text-muted-foreground">Medium</div>
                </div>
                <div className="bg-red-500/10 rounded-lg p-2">
                  <div className="text-red-600 font-bold text-lg">{data.solved.hard}</div>
                  <div className="text-xs text-muted-foreground">Hard</div>
                </div>
              </div>
            </div>

            {/* Middle Column - Streak & Activity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Flame className="w-4 h-4" />
                Activity
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl">🔥</span>
                  <span className="text-4xl font-bold text-orange-500">{data.streak.current}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Day Streak</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="font-bold text-lg">{data.totalActiveDays}</div>
                  <div className="text-xs text-muted-foreground">Active Days</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="font-bold text-lg">#{data.ranking?.toLocaleString() || "—"}</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
              </div>
            </div>

            {/* Right Column - Badges */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Trophy className="w-4 h-4" />
                Badges ({data.badges?.length || 0})
              </div>
              {data.badges && data.badges.length > 0 ? (
                <div className="space-y-2">
                  {data.badges.slice(0, 5).map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-2 bg-primary/5 rounded-lg px-3 py-2 hover:bg-primary/10 transition-colors"
                      title={badge.name}
                    >
                      {badge.icon && (
                        <img
                          src={badge.icon}
                          alt={badge.name}
                          className="w-5 h-5"
                        />
                      )}
                      <span className="text-sm truncate">{badge.name}</span>
                    </div>
                  ))}
                  {data.badges.length > 5 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{data.badges.length - 5} more badges
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground py-4 text-center">
                  No badges yet
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Footer */}
        {data && (
          <div className="flex items-center justify-end text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
            <span>Updated {formatRelativeTime(data.updatedAt)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const NowSection: React.FC = () => (
  <section id="now" className="pt-20 lg:pt-24 pb-12 bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Now — What I'm <span className="gradient-text">Working On</span>
        </h2>
        
        {/* Top Row - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* Seed-Funded Research */}
          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <span>Seed-Funded Research — Efficient LLM Inference</span>
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1 ml-11">
                AWARE-AI NSF Seed Funding Awardee
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Won seed funding through the AWARE-AI NSF program for my research on efficient LLM inference. Exploring speculative decoding, KV-cache reuse, and system-level optimizations to reduce latency and compute cost.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  2025 – Present
                </span>
              </div>
            </CardContent>
          </Card>

          {/* AAAI 2026 */}
          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Presentation className="w-4 h-4 text-purple-500" />
                </div>
                <span>Preparing for AAAI 2026</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Preparing a spotlight presentation for NewsLensAI, focusing on results, limitations, and implications of entity-anchored LLM summarization.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Singapore · Jan 2026
                </span>
              </div>
            </CardContent>
          </Card>

          {/* MS Data Science */}
          <Card className="glass-card text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                </div>
                <span>MS Data Science @ RIT</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                M.S. Data Science (4.0 GPA). Focus areas: Neural Networks, Human-Centered AI, and Software Engineering for Data Science.
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

        {/* Bottom Row - LeetCode Featured Card (Full Width) */}
        <LeetCodeCard />
      </div>
    </div>
  </section>
);

export default NowSection;
