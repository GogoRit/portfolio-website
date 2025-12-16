import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import mermaid from "mermaid";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Speaker Attribution Accuracy Chart
const speakerAccuracyData = [
  { stage: "Baseline", accuracy: 0.72 },
  { stage: "Post-Optimization", accuracy: 0.86 },
];

const SpeakerAccuracyChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Speaker Attribution Accuracy</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={speakerAccuracyData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="stage" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(0)}%`} />
            <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#3b82f6" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('SpeakerAccuracyChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// Cost Reduction Chart
const costReductionData = [
  { stage: "Before Optimization", cost: 1.0 },
  { stage: "After Optimization", cost: 0.65 },
];

const CostReductionChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Relative Inference Cost</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={costReductionData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1.2]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="stage" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(0)}% of baseline`} />
            <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('CostReductionChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// AWARE-AI Latency Chart
const latencyData = [
  { version: "Baseline", latency: 1.0 },
  { version: "Optimized", latency: 0.7 },
];

const LatencyChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">End-to-End Inference Latency</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={latencyData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1.2]} tickFormatter={(v) => `${v.toFixed(1)}×`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="version" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}× baseline`} />
            <Bar dataKey="latency" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('LatencyChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// AWARE-AI Throughput Chart
const throughputData = [
  { version: "Baseline", throughput: 1.0 },
  { version: "Optimized", throughput: 1.5 },
];

const ThroughputChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Inference Throughput Improvement</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={throughputData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1.8]} tickFormatter={(v) => `${v.toFixed(1)}×`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="version" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}× baseline`} />
            <Bar dataKey="throughput" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#3b82f6" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('ThroughputChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// DeMons Engagement Chart
const engagementData = [
  { strategy: "Baseline", engagement: 1.0 },
  { strategy: "Optimized", engagement: 1.18 },
];

const EngagementChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Launch Engagement Improvement</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={engagementData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1.4]} tickFormatter={(v) => `${v.toFixed(2)}×`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="strategy" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}× baseline`} />
            <Bar dataKey="engagement" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#3b82f6" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('EngagementChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// DeMons Asset Value Chart
const assetValueData = [
  { approach: "Baseline", value: 1.0 },
  { approach: "Post-Optimization", value: 1.10 },
];

const AssetValueChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Asset Value Impact</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={assetValueData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1.3]} tickFormatter={(v) => `${v.toFixed(2)}×`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="approach" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}× baseline`} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('AssetValueChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// Venture Creations Operational Efficiency Chart
const operationalEfficiencyData = [
  { state: "Before", effort: 1.0 },
  { state: "After", effort: 0.6 },
];

const OperationalEfficiencyChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Operational Efficiency Improvement</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={operationalEfficiencyData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1.2]} tickFormatter={(v) => `${v.toFixed(1)}×`} stroke="#666" fontSize={11} />
            <YAxis type="category" dataKey="state" stroke="#666" fontSize={11} width={45} />
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}× effort`} />
            <Bar dataKey="effort" radius={[0, 4, 4, 0]}>
              <Cell fill="#a1a1aa" />
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('OperationalEfficiencyChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// Venture Creations Platform Adoption Chart
const platformAdoptionData = [
  { area: "Ventures", adoption: 0.95 },
  { area: "Mentors", adoption: 0.85 },
  { area: "Events", adoption: 0.90 },
  { area: "Outreach", adoption: 0.80 },
];

const PlatformAdoptionChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Platform Adoption Across Operations</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={platformAdoptionData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} stroke="#666" fontSize={11} />
            <YAxis type="category" dataKey="area" stroke="#666" fontSize={11} width={55} />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(0)}% adoption`} />
            <Bar dataKey="adoption" radius={[0, 4, 4, 0]}>
              <Cell fill="#3b82f6" />
              <Cell fill="#22c55e" />
              <Cell fill="#f59e0b" />
              <Cell fill="#8b5cf6" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('PlatformAdoptionChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// Venture Creations Event Category Distribution Chart
const eventCategoryData = [
  { category: "Workshops", percentage: 35 },
  { category: "Mentor Sessions", percentage: 25 },
  { category: "Info Sessions", percentage: 20 },
  { category: "Networking Events", percentage: 20 },
];

const EventCategoryChart: React.FC = () => {
  try {
    return (
      <div className="w-full max-w-md mx-auto">
        <h4 className="text-sm font-medium text-graphite/70 text-center mb-4">Event Distribution by Category</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={eventCategoryData} layout="vertical" margin={{ top: 5, right: 30, left: 110, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis type="number" domain={[0, 40]} tickFormatter={(v) => `${v}%`} stroke="#666" fontSize={12} />
            <YAxis type="category" dataKey="category" stroke="#666" fontSize={12} />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
              <Cell fill="#3b82f6" />
              <Cell fill="#22c55e" />
              <Cell fill="#f59e0b" />
              <Cell fill="#8b5cf6" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.warn('EventCategoryChart render error:', error);
    return (
      <div className="w-full max-w-md mx-auto p-4 text-center text-graphite/60">
        Chart unavailable
      </div>
    );
  }
};

// Case study content components
const MagicSpellStudiosContent: React.FC = () => (
  <>
    <header className="mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-3">
        AI Engineer @ MAGIC Spell Studios
      </h1>
      <p className="text-lg text-graphite/60 mb-4">
        January 2024 – August 2024 · Rochester, NY
      </p>
      <p className="text-xl text-graphite/80 leading-relaxed">
        Primary technical owner for aiPaperboy, a transcript-first AI platform designed to transform long-form podcast audio into structured, readable content for asynchronous consumption.
      </p>
    </header>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Context</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          aiPaperboy was an early-stage AI product developed at MAGIC Spell Studios with a clear goal: make podcasts readable. The core insight was that long-form audio creates friction for users who want to engage deeply with content but cannot commit to hours of passive listening. The platform focused on ingesting raw podcast audio, generating high-fidelity transcripts with accurate speaker attribution, and rendering them as structured, play-style documents optimized for focused reading rather than background consumption.
        </p>
        <p>
          From the outset, the project operated under real MVP constraints. The system needed to be demo-ready for investor presentations within a compressed timeline, requiring careful tradeoffs between technical ambition and delivery risk. Cost sensitivity was a defining factor, particularly given the expense of processing multi-hour audio at scale. At the same time, the product needed to communicate value immediately to non-technical stakeholders, which meant transcripts had to feel polished, intentional, and trustworthy rather than like raw ASR output.
        </p>
        <p>
          These constraints directly shaped the system's design. The goal was not to build a research prototype, but to deliver a production-grade AI platform that could withstand investor scrutiny while remaining extensible for future iteration and scale.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Role and Technical Ownership</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          I served as the primary technical owner for aiPaperboy, responsible for the end-to-end design, implementation, and delivery of the platform's core AI and backend systems. While collaborating with a designer and an intern, I owned the architecture, backend services, ML pipelines, and deployment workflows.
        </p>
        <p>
          My scope included system design, model and vendor selection, cost optimization, infrastructure setup, and production hardening. I was accountable for translating the product vision into a secure, demo-ready AI system under MVP constraints, while ensuring the architecture remained extensible for future iteration and scale.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Objectives and Success Criteria</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The primary objective was to build a transcript-first AI platform that could reliably transform long-form podcast audio into structured, readable documents designed for asynchronous consumption.
        </p>
        <p>
          Success criteria were defined across multiple dimensions. Speaker attribution needed to be accurate enough to maintain narrative clarity across multi-speaker conversations. Transcription and post-processing pipelines had to remain cost-efficient when operating on multi-hour audio files. Transcripts needed to read as intentional documents rather than raw ASR output, particularly for non-technical audiences. Finally, the system needed to be stable and polished enough to support private investor demos under MVP timelines.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TD
    subgraph Input
        A[Podcast Audio]
    end

    subgraph Transcription
        B[ASR Engine]
        C[Diarization]
    end

    subgraph Attribution
        D[Speaker Segmentation]
        E[Identity Resolution]
    end

    subgraph Processing
        F[Transcript Normalization]
        G[LLM Agent Orchestration]
    end

    subgraph Output
        H[API Layer]
        I[Storage]
        J[User Interface]
    end

    A --> B & C
    B & C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J`}
            </div>
          </div>
          <p className="text-xs text-graphite/50 mt-2 italic">Modular pipeline stages enabling independent optimization of cost, latency, and accuracy.</p>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          The platform was designed as a modular, pipeline-based system that separated ingestion, transcription, speaker attribution, content transformation, and delivery into distinct stages. Each stage produced structured outputs consumed by the next, enabling independent optimization of cost, latency, and accuracy while preserving observability and debuggability across the full pipeline.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Backend APIs and Service Boundaries</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The backend was exposed through a set of internal APIs designed to decouple ingestion, processing, and delivery workflows. These APIs handled episode ingestion, transcription state management, speaker metadata resolution, and transcript delivery.
        </p>
        <p>
          Services were designed with clear contracts between pipeline stages to support retries, partial reprocessing, and failure isolation without cascading errors across the system. This separation allowed individual components to evolve independently while maintaining overall system stability and observability.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Data Model and Flow</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TB
    subgraph Users
        U[User]
        SUB[Subscription]
    end

    subgraph Content
        P[Podcast]
        E[Episode]
        T[Transcript]
    end

    subgraph Attribution
        S[Speaker]
        SF[Speaker Feedback]
        MS[Metadata Store]
    end

    subgraph Delivery
        DQ[Delivery Queue]
    end

    U -->|subscribes to| SUB
    SUB -->|follows| P
    P -->|contains| E
    E -->|generates| T
    T -->|references| S
    MS -->|enriches| S
    MS -->|enriches| E
    U -->|submits| SF
    SF -->|targets| T
    SF -->|improves| S
    DQ -->|schedules| T
    DQ -->|delivers to| U`}
            </div>
          </div>
          <p className="text-xs text-graphite/50 mt-2 italic">Entity relationships supporting content lifecycle and user feedback loops.</p>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          The data model was designed around clear entity relationships that supported the full content lifecycle. Users maintained subscriptions to podcasts, which contained episodes that generated transcripts. Transcripts referenced speakers whose identities were enriched through a centralized metadata store. A structured feedback loop allowed users to flag speaker attribution issues, feeding improvements back into the system. The delivery queue managed scheduled transcript delivery based on user preferences and subscription state.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">ML and AI Systems</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Audio transcription was performed using Deepgram ASR with diarization signals to identify speaker change boundaries. These diarization outputs were treated as structural cues rather than final speaker identities, allowing downstream systems to reason about speaker roles more flexibly.
        </p>
        <p>
          Raw ASR output was passed through a transcript normalization stage that removed filler words, disfluencies, repeated fragments, and non-semantic artifacts common in conversational speech. The objective was not verbatim fidelity, but semantic clarity and readability for long-form consumption.
        </p>
        <p>
          Speaker attribution combined audio-level diarization with ML-assisted identity resolution. Speaker labels were mapped and normalized using episode metadata, contextual cues from descriptions, and public web information, with selective LLM-based validation applied to resolve ambiguous transitions and ensure consistent naming throughout each transcript.
        </p>
        <p>
          Certain stages of the pipeline required flexible reasoning rather than deterministic processing. To support this, lightweight AI agents built using LangChain were introduced to orchestrate transcript proofreading, speaker label validation, and structural transformation of transcripts into readable, play-style documents. Agent execution was deliberately bounded, with clear input and output contracts to maintain predictable latency and cost.
        </p>
        <p>
          Finally, the platform incorporated a structured feedback loop that allowed users to flag speaker inaccuracies and transcript issues directly within the product. Feedback was stored alongside transcript metadata and used to guide targeted improvements to attribution logic and validation steps as part of the system's MLOps strategy, enabling continuous, auditable improvement without uncontrolled online learning.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Deployment and CI/CD</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The platform was deployed on AWS using a containerized backend architecture designed for reliability, controlled access, and future scalability. Core services were built as stateless APIs and packaged using Docker to ensure consistent environments across development and deployment.
        </p>
        <p>
          Industry-standard CI/CD pipelines were implemented to automate build, test, and deployment workflows, enabling rapid iteration while maintaining system stability. These pipelines supported versioned deployments and rollback capability, allowing changes to be validated without disrupting stakeholder-facing demos.
        </p>
        <p>
          For the MVP phase, the system was intentionally deployed in a secure, password-protected AWS environment to support private investor and stakeholder presentations. This deployment model reflected product and security requirements rather than technical limitations, while preserving the underlying automation needed for a public production rollout.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Delivery System and User Experience Design</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The delivery system was designed around the idea of time as a scarce user resource rather than assuming passive, linear consumption. Instead of encouraging continuous listening or scrolling, the platform treated attention and reading time as first-class constraints.
        </p>
        <p>
          Transcripts were delivered as structured, segmented documents optimized for asynchronous reading. Episodes were broken into logical sections with clear speaker attribution and narrative flow, allowing users to consume content selectively rather than sequentially.
        </p>
        <p>
          Delivery timing and access controls were integrated into the backend to support gated access, controlled release schedules, and personalized delivery in future iterations. This approach enabled secure investor demos while laying the groundwork for subscription-based and scheduled delivery models beyond the MVP.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
      <div className="bg-graphite/5 border border-graphite/10 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 rounded-lg p-4">
            <SpeakerAccuracyChart />
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <CostReductionChart />
          </div>
        </div>
        <div className="space-y-4 text-graphite/80 leading-relaxed pt-2 border-t border-graphite/10">
          <p>
            By the MVP milestone, the system achieved approximately 86 percent speaker attribution accuracy while reducing transcription and inference costs by roughly 35 percent through pipeline optimization and selective use of LLM-based reasoning. The platform successfully supported investor demos and internal evaluations, validating both the transcript-first product direction and the underlying system architecture.
          </p>
          <p>
            The AWS-based deployment and automated CI/CD workflows enabled rapid iteration under MVP constraints while maintaining production-grade reliability and reproducibility.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Tradeoffs and Learnings</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Several tradeoffs shaped the final system. Maximizing speaker attribution accuracy often conflicted with cost constraints, requiring deliberate decisions around when and how to apply LLM-based reasoning. Similarly, designing for secure investor demos prioritized stability, clarity, and predictability over feature completeness during the MVP phase.
        </p>
        <p>
          These constraints reinforced the importance of building ML systems that are not only accurate, but operationally reliable and economically viable. The experience influenced my approach to production AI engineering, emphasizing intentional design, bounded reasoning, and iterative improvement grounded in real user feedback.
        </p>
      </div>
    </section>

    <section className="pt-6 border-t border-graphite/10">
      <h3 className="text-sm font-medium text-graphite/50 uppercase tracking-wide mb-3">Confidentiality and Access Note</h3>
      <p className="text-sm text-graphite/60 leading-relaxed">
        Certain implementation details, internal metrics, and source code are proprietary and not publicly available. The descriptions above reflect the system architecture, engineering decisions, and outcomes at a level appropriate for external review without disclosing sensitive or client-specific information.
      </p>
    </section>
  </>
);

// AWARE-AI NSF Program Content
const AwareAIContent: React.FC = () => (
  <>
    <header className="mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-3">
        Applied Research Engineer @ AWARE-AI NSF Program
      </h1>
      <p className="text-lg text-graphite/60 mb-4">
        Aug 2024 – Aug 2025 · Rochester, NY
      </p>
      <p className="text-xl text-graphite/80 leading-relaxed">
        Applied research engineering focused on optimizing multimodal ML pipelines for near real-time deployment in human–robot collaboration.
      </p>
    </header>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Context</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          This role was part of an applied research environment where models were expected to move beyond offline analysis and operate under real experimental constraints. The focus was on multimodal machine learning pipelines that fused physiological signals such as EEG, EMG, and ECG with motion capture data to support human–robot collaboration research.
        </p>
        <p>
          A central engineering challenge was performance. Multimodal pipelines introduce significant compute and memory overhead, especially when preprocessing, feature extraction, and inference must run continuously. My work centered on reducing end-to-end latency and improving throughput so that model outputs could be used in near real time rather than post hoc analysis.
        </p>
        <p>
          For external reporting, results are presented in relative terms to remain hardware-agnostic while still reflecting measurable impact. The work emphasized production-minded research engineering practices, including reproducibility, benchmarking discipline, and deployment validation on real robotic platforms, rather than building a research prototype optimized only for offline metrics.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Role and Technical Ownership</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          I was primarily responsible for the engineering, optimization, and benchmarking work across the multimodal inference pipeline, collaborating with other researchers on experimental goals and evaluation criteria. My ownership covered profiling bottlenecks, implementing performance improvements, validating correctness, and ensuring results were reproducible across runs.
        </p>
        <p>
          I focused on translating research requirements into deployable, measurable systems. This included optimizing preprocessing and inference paths, instrumenting performance and stability metrics, and hardening pipelines so they could operate in near real-time human–robot collaboration experiments rather than remaining limited to offline analysis.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Objectives and Success Criteria</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The primary objective was to make multimodal machine learning pipelines fast and reliable enough for use in live experimental settings. This required reducing end-to-end inference latency while maintaining model correctness across heterogeneous signal inputs.
        </p>
        <p>
          Success criteria were defined around measurable performance improvements rather than absolute accuracy alone. Pipelines needed to demonstrate consistent latency reduction, improved throughput under sustained load, and stable behavior when integrated into human–robot collaboration experiments. Equally important was maintaining reproducibility so that performance gains could be validated and compared across experimental runs.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TD
    A[Multimodal Sensors\nEEG · EMG · ECG · Motion Capture] --> B[Signal Preprocessing\nFiltering · Normalization]
    B --> C[Feature Extraction]
    C --> D[Multimodal Fusion Layer]
    D --> E[Optimized Inference Engine\nPyTorch / TensorRT]
    E --> F[Robot Integration Layer]
    F --> G[Human–Robot Collaboration Loop]`}
            </div>
          </div>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          The system was structured as a modular multimodal pipeline that separated signal ingestion, preprocessing, fusion, and inference into clearly defined stages. This separation allowed targeted optimization of performance-critical components without altering experimental logic, while preserving reproducibility and observability across the full pipeline.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Performance Optimization and Benchmarking</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Performance optimization focused on identifying bottlenecks across preprocessing, data movement, and inference stages within the multimodal pipeline. Profiling was used to isolate latency contributors and guide targeted optimization efforts rather than applying broad, non-specific tuning.
        </p>
        <p>
          Inference paths were optimized using GPU-accelerated execution where appropriate, including benchmarking TensorRT-optimized inference against PyTorch baselines to evaluate throughput and latency tradeoffs. Results were measured in relative terms to remain hardware-agnostic while still demonstrating meaningful performance gains.
        </p>
        <p>
          These benchmarking workflows were designed and executed end to end to ensure reproducibility and fair comparison across configurations. The outcome was a measurable reduction in end-to-end inference latency and improved throughput suitable for near real-time experimental use.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Experimental Validation and Deployment</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Optimized pipelines were validated through integration with real robotic platforms to ensure that performance gains translated beyond offline benchmarks. Validation focused on system stability, latency consistency, and correctness when models operated as part of a closed-loop human–robot collaboration setup.
        </p>
        <p>
          Rather than optimizing for a single experimental task, the system was evaluated for robustness across varying input conditions and sustained execution. This approach ensured that performance improvements were meaningful in practice and suitable for continued use in applied research environments, not just controlled laboratory benchmarks.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
      <div className="bg-graphite/5 border border-graphite/10 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 rounded-lg p-4">
            <LatencyChart />
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <ThroughputChart />
          </div>
        </div>
        <div className="space-y-4 text-graphite/80 leading-relaxed pt-2 border-t border-graphite/10">
          <p>
            The optimized multimodal pipelines achieved approximately a 30 percent reduction in end-to-end inference latency and up to 1.5× throughput improvement compared to unoptimized baselines. These gains enabled models to operate closer to real-time constraints, expanding the range of experiments that could be conducted beyond offline analysis.
          </p>
          <p>
            Validation on real robotic platforms confirmed that performance improvements were stable under sustained execution, supporting reliable use in human–robot collaboration research rather than isolated benchmarking scenarios.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Tradeoffs and Research Learnings</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Optimizing multimodal pipelines required balancing performance improvements against experimental flexibility. Aggressive optimization could reduce latency but risked limiting adaptability during active research iterations, requiring careful decisions about where to harden systems and where to preserve configurability.
        </p>
        <p>
          This work reinforced the importance of engineering rigor in applied research settings. Performance gains were most valuable when they were reproducible, interpretable, and transferable across experiments, rather than narrowly optimized for a single setup. The experience shaped my approach to building research systems that are both experimentally useful and deployment-aware.
        </p>
      </div>
    </section>

    <section className="pt-6 border-t border-graphite/10">
      <h3 className="text-sm font-medium text-graphite/50 uppercase tracking-wide mb-3">Confidentiality and Scope Note</h3>
      <p className="text-sm text-graphite/60 leading-relaxed">
        Certain implementation details, experimental configurations, and internal datasets are not publicly accessible. The descriptions above reflect the system architecture, engineering approach, and measured outcomes at a level appropriate for external review without disclosing sensitive or proprietary research information.
      </p>
    </section>
  </>
);

// DeMons Content
const DeMonsContent: React.FC = () => (
  <>
    <header className="mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-3">
        Machine Learning Engineer @ DeMons
      </h1>
      <p className="text-lg text-graphite/60 mb-4">
        Aug 2022 – Jul 2023 · Bengaluru, India
      </p>
      <p className="text-xl text-graphite/80 leading-relaxed">
        Applied machine learning for pricing and release strategy, building data driven models and decision tools for NFT scarcity, drop timing, and valuation.
      </p>
    </header>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Context</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          DeMons was an early stage, venture backed startup where marketplace outcomes depended on getting pricing and release dynamics right under uncertainty. The product environment was closer to a trading system than a typical analytics workflow. Decisions had to be made quickly, with imperfect data, and evaluated through real user behavior.
        </p>
        <p>
          My work focused on translating transaction and engagement signals into practical ML driven decision support. The goal was to improve launch engagement and market perception by optimizing scarcity parameters, recommending drop timing, and turning ad hoc analysis into repeatable models and dashboards that the team could use operationally.
        </p>
        <p>
          Results are described in measurable, outcome oriented terms while keeping implementation details high level. The emphasis was on building systems that were testable, explainable to non technical stakeholders, and reliable enough to influence real release decisions.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Role and Technical Ownership</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          I was responsible for designing and implementing machine learning models and analytical pipelines used to guide pricing, scarcity, and release timing decisions for NFT drops. I worked closely with product and business stakeholders, translating qualitative goals around engagement and perceived value into quantitative signals and decision frameworks.
        </p>
        <p>
          My ownership included data preparation, feature engineering, model development, evaluation, and operationalization of outputs through dashboards and internal tools. The focus was not only on predictive performance, but on building models that stakeholders could trust and use in real release planning workflows.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Objectives and Success Criteria</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The primary objective was to improve launch outcomes for NFT releases by making pricing, scarcity, and drop timing decisions more data driven. This required extracting actionable signals from noisy transaction and engagement data and turning them into recommendations that could be applied consistently across releases.
        </p>
        <p>
          Success was defined by measurable changes in user engagement, market response, and perceived asset value following launches. Models and tools needed to be simple enough to explain to non technical stakeholders, yet robust enough to influence real release decisions under uncertainty.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TD
    A[Marketplace Activity\nTransactions · Bids · Engagement] --> B[Data Ingestion Layer]
    B --> C[Feature Engineering\nDemand · Scarcity · Timing Signals]
    C --> D[ML and Statistical Models]
    D --> E[Decision Recommendations\nPricing · Scarcity · Drop Timing]
    E --> F[Operational Dashboards]`}
            </div>
          </div>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          The system was designed as a lightweight decision-support pipeline rather than a fully automated trading engine. Data ingestion, feature engineering, modeling, and reporting were separated into clear stages so that assumptions and outputs could be inspected and adjusted as market conditions evolved.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Modeling and Feature Engineering</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Modeling focused on capturing scarcity dynamics and user engagement patterns rather than predicting prices directly. Features were engineered from transaction history, bidding behavior, time-to-sell metrics, and engagement signals to reflect both supply constraints and demand intensity.
        </p>
        <p>
          A combination of statistical models and rule-based parameter tuning was used to explore how scarcity levels, release size, and timing influenced launch outcomes. Emphasis was placed on interpretability so that model behavior could be explained clearly to stakeholders and adjusted as market conditions changed.
        </p>
        <p>
          These models were evaluated through historical backtesting and live release outcomes, allowing recommendations to be refined iteratively based on observed market response rather than static assumptions.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Evaluation and Deployment</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Model outputs were evaluated using a combination of historical backtesting and observed performance during live NFT releases. Rather than optimizing for a single offline metric, evaluation focused on how recommendations influenced real launch outcomes such as engagement intensity, sell-through behavior, and secondary market response.
        </p>
        <p>
          Validated recommendations were operationalized through internal dashboards and reports used during release planning. This ensured that insights from the models were accessible to non technical stakeholders and could be incorporated directly into pricing and release decisions without requiring ad hoc analysis or manual interpretation.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
      <div className="bg-graphite/5 border border-graphite/10 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 rounded-lg p-4">
            <EngagementChart />
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <AssetValueChart />
          </div>
        </div>
        <div className="space-y-4 text-graphite/80 leading-relaxed pt-2 border-t border-graphite/10">
          <p>
            The models and decision frameworks contributed to measurable improvements in launch performance. Optimized scarcity parameters and release timing were associated with approximately an 18 percent increase in launch engagement and a roughly 10 percent improvement in perceived asset value across the collection.
          </p>
          <p>
            By replacing ad hoc judgment with repeatable, data-driven recommendations, the system improved consistency across releases and strengthened early-stage trading liquidity, supporting more predictable outcomes in a volatile market environment.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Tradeoffs and Learnings</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Building models for NFT markets required balancing statistical rigor with practical usability. Highly complex models risked overfitting to short-term market behavior, while overly simplistic heuristics could miss meaningful demand signals. The final approach favored models that were interpretable, adaptable, and robust to rapid shifts in user behavior.
        </p>
        <p>
          This work reinforced the importance of aligning machine learning systems with real decision-making workflows. Models were most effective when they supported human judgment with clear signals and constraints, rather than attempting full automation in an environment defined by uncertainty and changing incentives.
        </p>
      </div>
    </section>

    <section className="pt-6 border-t border-graphite/10">
      <h3 className="text-sm font-medium text-graphite/50 uppercase tracking-wide mb-3">Confidentiality and Scope Note</h3>
      <p className="text-sm text-graphite/60 leading-relaxed">
        Certain implementation details, datasets, and internal decision logic are not publicly available. The descriptions above reflect the system architecture, modeling approach, and observed outcomes at a level appropriate for external review without disclosing proprietary or sensitive information.
      </p>
    </section>
  </>
);

// Venture Creations Incubator Content
const VentureCreationsContent: React.FC = () => (
  <>
    <header className="mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-3">
        Automation Engineer @ Venture Creations Incubator (RIT)
      </h1>
      <p className="text-lg text-graphite/60 mb-4">
        Aug 2025 – Present · Rochester, NY
      </p>
      <p className="text-xl text-graphite/80 leading-relaxed">
        Internal systems and workflow automation for venture operations, reporting, and data-driven decision support.
      </p>
    </header>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Context</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Venture Creations Incubator supports early-stage startups through advising, programming, and operational oversight. As the organization scaled, core operational workflows spanning venture tracking, reporting, and internal coordination became increasingly fragmented across spreadsheets, forms, and manual processes.
        </p>
        <p>
          My role focused on designing and implementing a centralized internal system to replace ad hoc workflows with structured, automated interfaces. The goal was not to build a customer-facing product, but to improve reliability, visibility, and efficiency across venture operations by treating internal processes as engineering problems rather than administrative tasks.
        </p>
        <p>
          This work required balancing flexibility with structure. The system needed to support evolving operational needs while remaining simple enough for non-technical staff to use confidently. Emphasis was placed on automation, data integrity, and real-time visibility rather than one-off scripting or manual intervention.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Role and Technical Ownership</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          I was the primary technical owner of the internal operations platform, responsible for designing the data model, building automated workflows, and delivering end-to-end interfaces used by venture operations staff. I worked closely with program leadership and non-technical stakeholders to translate operational needs into reliable system behavior.
        </p>
        <p>
          My ownership spanned system architecture, automation logic, data validation, and ongoing iteration. I was accountable for ensuring the platform remained stable under day-to-day use, adaptable to changing program requirements, and understandable to users without engineering backgrounds.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Objectives and Success Criteria</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          The primary objective was to replace fragmented, manual operational workflows with a centralized system that provided reliable data, real-time visibility, and automated execution. This included consolidating venture tracking, reporting, and internal coordination into a single source of truth.
        </p>
        <p>
          Success was defined by operational clarity and adoption rather than technical complexity. The system needed to reduce manual effort, minimize data inconsistencies, and enable staff to access up-to-date information without relying on ad hoc spreadsheets or repeated follow-ups. Equally important was ensuring the platform could evolve as program needs changed, without requiring extensive rework or technical intervention.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Operational Workflow Automation</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TD
    A[Startup Intake Forms] --> B[Centralized Venture Database]
    B --> C[Automated Validation\nRequired Fields · Status Checks]
    C --> D[Workflow Triggers\nStatus Changes · Milestones]
    D --> E[Task Assignment\nInternal Staff]
    D --> F[Automated Notifications\nEmail · Slack]
    B --> G[Real-Time Dashboards]`}
            </div>
          </div>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          Core operational workflows were redesigned as event-driven processes rather than manual handoffs. Data entered through intake forms flowed into a centralized database, where automated validation and workflow triggers ensured consistent execution, timely notifications, and real-time visibility across venture operations.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Mentor and Venture Interaction Tracking</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TD
    A[Mentor Session Scheduled] --> B[Session Record Created]
    B --> C[Attendance and Notes Logged]
    C --> D[Action Items and Follow-ups]
    D --> E[Automated Reminders]
    C --> F[Aggregated Mentor Activity Metrics]`}
            </div>
          </div>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          Mentor interactions were treated as first-class operational data rather than unstructured notes. Sessions, attendance, and follow-ups were captured in structured records, enabling automated reminders and longitudinal analysis of mentor engagement across ventures and programs.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Program Metrics and KPI Reporting</h2>
      <div className="bg-graphite/5 border border-graphite/10 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-1 gap-6">
          <div className="bg-white/50 rounded-lg p-4">
            <OperationalEfficiencyChart />
          </div>
        </div>
        <div className="space-y-4 text-graphite/80 leading-relaxed pt-2 border-t border-graphite/10">
          <p>
            The system surfaced program-level metrics through real-time dashboards designed for operational decision-making. KPIs included venture participation status, mentor engagement frequency, event attendance, outreach funnel progression, and program throughput over time.
          </p>
          <p>
            By consolidating these metrics into a single reporting layer, leadership could assess program health without manual data compilation, enabling faster decisions and more consistent oversight across initiatives.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Event Lifecycle and Attendance Tracking</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-graphite/5 rounded-lg p-4 inline-block">
            <div className="mermaid">
{`flowchart TD
    A[Event Created] --> B[Registration Form Generated]
    B --> C[Outreach Distribution\nEmail · Mailing Lists]
    C --> D[Registrations Collected]
    D --> E[QR-Based Check-in]
    E --> F[Attendance Records]
    F --> G[Event Performance Metrics]`}
            </div>
          </div>
        </div>
        <p className="text-graphite/80 leading-relaxed">
          Events were treated as structured operational workflows rather than isolated activities. From creation through outreach, registration, and attendance, each stage emitted standardized data that fed into centralized reporting. This allowed event performance to be measured consistently across categories while minimizing manual coordination and post-event reconciliation.
        </p>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Student Outreach and Engagement Funnels</h2>
      <div className="bg-graphite/5 border border-graphite/10 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-1 gap-6">
          <div className="bg-white/50 rounded-lg p-4">
            <EventCategoryChart />
          </div>
        </div>
        <div className="space-y-4 text-graphite/80 leading-relaxed pt-2 border-t border-graphite/10">
          <p>
            Student outreach was streamlined by centralizing mailing lists and segmenting audiences based on event category, program participation, and engagement history. Outreach pipelines were designed to support targeted communication rather than one-size-fits-all announcements.
          </p>
          <p>
            By tracking outreach distribution, registration response, and attendance outcomes together, the system enabled continuous refinement of outreach strategies across different event types, improving relevance while reducing redundant communication.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Results and Impact</h2>
      <div className="bg-graphite/5 border border-graphite/10 rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 rounded-lg p-4">
            <OperationalEfficiencyChart />
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <PlatformAdoptionChart />
          </div>
        </div>
        <div className="space-y-4 text-graphite/80 leading-relaxed pt-2 border-t border-graphite/10">
          <p>
            The automated internal platform replaced fragmented manual workflows with a centralized, event-driven system used across venture operations. This reduced reliance on ad hoc spreadsheets, improved data consistency, and enabled real-time visibility into venture status, mentor engagement, event performance, and outreach effectiveness.
          </p>
          <p>
            By standardizing workflows and surfacing program metrics through shared dashboards, the system improved coordination across teams and reduced operational overhead, allowing staff to focus more on program delivery and venture support rather than administrative reconciliation.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Tradeoffs and Learnings</h2>
      <div className="space-y-4 text-graphite/80 leading-relaxed">
        <p>
          Designing internal automation systems required balancing structure with flexibility. Overly rigid workflows risked breaking as program needs evolved, while excessive flexibility could reintroduce inconsistency and manual intervention. The final design favored modular workflows with clear validation and automation points that could be adjusted incrementally.
        </p>
        <p>
          This work reinforced the value of treating internal operations as software systems. Applying engineering principles such as single sources of truth, event-driven execution, and observability proved essential for building tools that non-technical teams could rely on day to day.
        </p>
      </div>
    </section>

    <section className="pt-6 border-t border-graphite/10">
      <h3 className="text-sm font-medium text-graphite/50 uppercase tracking-wide mb-3">Confidentiality and Scope Note</h3>
      <p className="text-sm text-graphite/60 leading-relaxed">
        Certain internal workflows, data structures, and operational metrics are not publicly accessible. The descriptions above reflect the system architecture, automation strategy, and operational outcomes at a level appropriate for external review without disclosing sensitive institutional or venture-specific information.
      </p>
    </section>
  </>
);

const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
  <>
    <h1 className="text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
    <p className="text-lg text-graphite/70">Detailed role breakdown coming soon.</p>
  </>
);

const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Scroll to top when case study page loads (backup, also handled in App.tsx)
  useEffect(() => {
    // Wait for render to complete before scrolling
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }, [slug]);

  // Early return if slug is not available (shouldn't happen but safety check)
  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-silver via-white to-silver pt-8 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-8" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="bg-white/60 backdrop-blur-apple border border-white/30 rounded-apple-lg shadow-apple-sm p-8">
            <p>Case study not found.</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Safely initialize mermaid with error handling - do this after component has rendered
    // Use a longer delay to ensure the component is fully rendered first
    let timer: NodeJS.Timeout;
    let runTimer: NodeJS.Timeout;
    
    const initMermaid = () => {
      try {
        // Check if we're in browser environment and mermaid is available
        if (typeof window === 'undefined') return;
        if (typeof mermaid === 'undefined' || !mermaid.initialize) {
          console.warn('Mermaid is not available');
          return;
        }

        mermaid.initialize({
          startOnLoad: false, // Don't auto-run on load
          theme: "neutral",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: "basis",
            nodeSpacing: 50,
            rankSpacing: 40,
            padding: 15,
          },
          themeVariables: {
            fontSize: "13px",
          },
        });
        
        // Run mermaid asynchronously to avoid blocking render
        runTimer = setTimeout(() => {
          try {
            if (typeof window !== 'undefined' && typeof mermaid !== 'undefined' && mermaid.run) {
              mermaid.run();
            }
          } catch (error) {
            console.warn('Mermaid run error:', error);
          }
        }, 300);
      } catch (error) {
        console.warn('Mermaid initialization error:', error);
      }
    };
    
    // Wait for component to be fully mounted and DOM to be ready
    timer = setTimeout(initMermaid, 100);
    
    return () => {
      if (timer) clearTimeout(timer);
      if (runTimer) clearTimeout(runTimer);
    };
  }, [slug]);

  // Handle back navigation with scroll restoration
  const handleBackClick = () => {
    // Don't remove scroll position here - let ScrollRestoration component handle it
    // Just navigate and let the restoration logic in App.tsx handle the scroll
    navigate("/");
  };

  // Map slugs to titles
  const titleMap: Record<string, string> = {
    "automation-engineer-venture-creations": "Automation Engineer @ Venture Creations Incubator",
    "ai-engineer-magic-spell-studios": "AI Engineer @ MAGIC Spell Studios",
    "applied-research-engineer-aware-ai": "Applied Research Engineer @ AWARE-AI NSF Program",
    "ml-engineer-evolv-demons": "Machine Learning Engineer @ EVOLV (DeMons)",
  };

  const title = titleMap[slug || ""] || "Case Study";

  const renderContent = () => {
    switch (slug) {
      case "ai-engineer-magic-spell-studios":
        return <MagicSpellStudiosContent />;
      case "applied-research-engineer-aware-ai":
        return <AwareAIContent />;
      case "ml-engineer-evolv-demons":
        return <DeMonsContent />;
      case "automation-engineer-venture-creations":
        return <VentureCreationsContent />;
      default:
        return <PlaceholderContent title={title} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-silver via-white to-silver pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" className="mb-8" onClick={handleBackClick}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <div className="bg-white/60 backdrop-blur-apple border border-white/30 rounded-apple-lg shadow-apple-sm p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;

