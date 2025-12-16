/**
 * Projects data - Single source of truth for all project information
 */

export interface Project {
  name: string;
  repoName: string;
  description: string;
  language: string;
  visibility: "Public" | "Private";
}

export const GITHUB_USERNAME = "GogoRit";

export const projects: Project[] = [
  {
    name: "llm-inference-lab",
    repoName: "llm-inference-lab",
    description: "A toolkit for optimizing and benchmarking LLM inference performance using speculative decoding, custom CUDA kernels, and intelligent batching.",
    language: "Python",
    visibility: "Public",
  },
  {
    name: "GigaRoute",
    repoName: "GigaRoute",
    description: "A CUDA-Accelerated Graph Routing Engine.",
    language: "C++",
    visibility: "Public",
  },
  {
    name: "transformer-from-scratch",
    repoName: "transformer-from-scratch",
    description: "Implementation of the Transformer architecture from 'Attention is All You Need' (Vaswani et al., 2017).",
    language: "Python",
    visibility: "Public",
  },
  {
    name: "NewsLensAI",
    repoName: "NewsLensAI",
    description: "Implementation of our AAAI-26 Spotlight–accepted paper: transparency-focused news summarization with entity anchoring to reduce hallucination and bias drift.",
    language: "Python",
    visibility: "Public",
  },
  {
    name: "Financial-Agentic-AI-chatbot",
    repoName: "Financial-Agentic-AI-chatbot",
    description: "Agentic AI system to analyze financial data, retrieve relevant context from the web, and return structured insights (Groq Cloud deployment).",
    language: "Python",
    visibility: "Public",
  },
  {
    name: "QnA-RAG-App-with-Gemma-and-Groq-API-",
    repoName: "QnA-RAG-App-with-Gemma-and-Groq-API-",
    description: "RAG Q&A app built using Gemma and the Groq API.",
    language: "Python",
    visibility: "Public",
  },
];

export function getGitHubUrl(repoName: string): string {
  return `https://github.com/${GITHUB_USERNAME}/${repoName}`;
}


