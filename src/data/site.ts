// Everything you are likely to edit lives in this file.
// Leave a URL as '' to hide it. Never use '#'.

export const site = {
  name: 'Tatsat Pandey',
  url: 'https://tatsatpandey.com',
  email: 'tatsat3mutee@gmail.com',
  role: 'GenAI engineer',
  // Put your resume at public/resume.pdf. The Resume buttons appear
  // automatically when that file exists, and hide when it doesn't.
  resume: '/resume.pdf',
};

export const social = {
  github: 'https://github.com/tatsat3mutee',
  linkedin: 'https://www.linkedin.com/in/tatsat-pandey/',
  instagram: 'https://www.instagram.com/khwaab_e_surkhaab/',
  youtube: 'https://www.youtube.com/channel/UCDgjJb9UjkElHwt8Lv7sk-w',
};

export const podcast = {
  name: 'Khwaab-e-Surkhaab',
  hindi: 'ख़्वाब-ए-सुर्ख़ाब',
  tagline: 'Kuch khwaab abhi baaki hain…',
  taglineHindi: 'कुछ ख़्वाब अभी बाक़ी हैं…',
  // YouTube video for the newest episode (shown on /khwaab).
  latestVideoId: 'Xb4UdCB2xVU',
  platforms: [
    { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/show/1OWpKmBSf7qpdkCjpzbmFj' },
    { id: 'youtube', label: 'YouTube', url: 'https://youtube.com/playlist?list=PLZZtHBm9HcLdBKqPOo_umAqZZsjBM7GHe' },
    { id: 'apple', label: 'Apple Podcasts', url: 'https://podcasts.apple.com/in/podcast/surkhaab/id1548229682' },
    { id: 'jiosaavn', label: 'JioSaavn', url: 'https://www.jiosaavn.com/shows/surkhaab/1/uDRhwF1FnQk_' },
    { id: 'amazon', label: 'Amazon Music', url: 'https://music.amazon.in/podcasts/dc80b6dc-e001-4e5b-9c6c-f50ab83ea90b/surkhaab' },
    { id: 'hubhopper', label: 'Hubhopper', url: 'https://hubhopper.com/podcast/surkhaab/318827' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/khwaab_e_surkhaab/' },
  ],
};

export type Visual = 'digest' | 'pipeline' | 'ledger' | 'radar' | 'query' | 'docs' | 'chat' | 'finance';

export type Project = {
  repo: string; // GitHub repo name: live stars/language/last-updated come from it
  name: string;
  tagline: string;
  points: string[];
  stack: string[];
  visual: Visual;
  live?: string;
  liveLabel?: string;
  size: 'xl' | 'wide' | 'tall' | 'half' | 'sm';
};

// Selected work, in display order. Facts come from each repo's README.
export const projects: Project[] = [
  {
    repo: 'devpulse',
    name: 'Diffbrief',
    tagline: 'The engineering stories worth your time, every day.',
    points: [
      'Collects a few hundred fresh stories each morning from Hacker News, Lobsters and rising GitHub repos',
      'An LLM scores and selects the best few for engineers building AI and large-scale systems',
      'Ships itself: a scheduled GitHub Actions digest, an hourly security watch, and auto-deploys to EC2',
    ],
    stack: ['TypeScript', 'Bun', 'OpenRouter', 'GitHub Actions', 'Caddy'],
    visual: 'digest',
    live: 'https://diffbrief.tatsatpandey.com',
    liveLabel: 'diffbrief.tatsatpandey.com',
    size: 'xl',
  },
  {
    repo: 'ledgerlm',
    name: 'LedgerLM',
    tagline: 'AI usage and cost tracking for Claude Code, Copilot, Codex and OpenCode.',
    points: [
      'A VS Code extension that reads the logs your AI tools already write',
      'Token-first dashboard: cache efficiency, sessions, subagents, tools and hooks',
      '100% local: no cloud, no telemetry',
    ],
    stack: ['TypeScript', 'VS Code API', 'SQLite'],
    visual: 'ledger',
    live: 'https://marketplace.visualstudio.com/items?itemName=TatsatP.ledgerlm',
    liveLabel: 'VS Code Marketplace',
    size: 'tall',
  },
  {
    repo: 'mtech-teleco-multiagent-project',
    name: 'Multi-Agent RAG for Billing RCA',
    tagline: 'M.Tech dissertation: agents that find why billing anomalies happen.',
    points: [
      'Detects anomalies, then a LangGraph team (Investigator → Reasoner → Critic → Reporter) explains the root cause',
      'Hybrid retrieval: BM25 + dense vectors + GraphRAG, fused with RRF',
      'LLM router with automatic failover, MLflow + Langfuse tracing, FastAPI and Streamlit',
    ],
    stack: ['Python', 'LangGraph', 'ChromaDB', 'GraphRAG', 'LiteLLM'],
    visual: 'pipeline',
    live: 'https://rca.tatsatpandey.com',
    liveLabel: 'Live demo',
    size: 'wide',
  },
  {
    repo: 'techradar',
    name: 'TechRadar',
    tagline: "An AI engineer's intelligence hub.",
    points: ['Daily aggregated news, a frontier-model tracker and hands-on sessions', 'Auto-updated via GitHub Actions'],
    stack: ['Astro', 'GitHub Actions'],
    visual: 'radar',
    size: 'half',
  },
  {
    repo: 'IntelliQuery',
    name: 'IntelliQuery AI',
    tagline: 'RAG, natural language → SQL, ML and agents over any dataset.',
    points: ['Document Q&A, auto SQL, dataset-agnostic predictions and auto charts'],
    stack: ['Python', 'RAG', 'NL→SQL', 'Databricks'],
    visual: 'query',
    size: 'half',
  },
  {
    repo: 'DocRag',
    name: 'DocRag',
    tagline: 'Agentic RAG document search with LangGraph.',
    points: ['Web, PDF and text ingestion, FAISS search, source tracking'],
    stack: ['LangGraph', 'FAISS', 'Groq', 'Streamlit'],
    visual: 'docs',
    size: 'sm',
  },
  {
    repo: 'AskRag',
    name: 'AskRag',
    tagline: 'A production-ready RAG platform with a UI and a REST API.',
    points: ['Free HuggingFace embeddings, FAISS, Groq, Docker and CI'],
    stack: ['FastAPI', 'LangChain', 'FAISS', 'Docker'],
    visual: 'chat',
    size: 'sm',
  },
  {
    repo: 'fincura',
    name: 'Fincura',
    tagline: 'Personal finance: expenses, income, budgets and savings goals.',
    points: ['FastAPI + SQLite backend, React + Vite frontend'],
    stack: ['FastAPI', 'React', 'SQLite'],
    visual: 'finance',
    size: 'sm',
  },
];

// Repos never shown in the "more on GitHub" list.
export const hiddenRepos = [/^skills-/, /^testrepo$/, /^tatsat3mutee$/, /^portfolio$/, /^birthday$/, /^Resume$/, /^BITS-M\.Tech$/, /^ProjectMasters$/, /^multiagent-rag-telecom-billing-rca$/];

export const recognitions = [
  { title: 'IBM Hall of Fame', when: 'Apr 2025' },
  { title: 'IBM Delivery Exemplar · Award of Excellence', when: '2026' },
  { title: 'Certificate of Appreciation · GenAI adoption mentoring', when: '' },
];

export const stack = [
  'LangGraph', 'RAG', 'GraphRAG', 'Multi-agent systems', 'Python', 'TypeScript', 'FastAPI', 'React',
  'LiteLLM', 'OpenRouter', 'ChromaDB', 'FAISS', 'GitHub Copilot', 'Claude Code', 'VS Code extensions',
  'GitHub Actions', 'Docker', 'Azure', 'AWS', 'Streamlit',
];
