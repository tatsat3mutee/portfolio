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

export type Visual = 'digest' | 'pipeline' | 'ledger' | 'query';

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
  flip?: boolean; // wide cards: put the visual on the left
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
    repo: 'IntelliQuery',
    name: 'IntelliQuery AI',
    tagline: 'Ask questions of any dataset: RAG, natural language → SQL, ML and agents in one platform.',
    points: [
      'Document Q&A over uploaded PDFs and text',
      'Turns plain-English questions into SQL, then charts the answer',
      'Dataset-agnostic ML predictions (churn, attrition) and goal-driven agents',
    ],
    stack: ['Python', 'RAG', 'NL→SQL', 'Databricks', 'Agents'],
    visual: 'query',
    size: 'wide',
    flip: true,
  },
];


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

/* ---------- Engineering depth (facts from each repo's README) ---------- */

export type ArchId = 'diffbrief' | 'rca' | 'ledgerlm';

export const expertise: {
  icon: 'agents' | 'retrieval' | 'llmops' | 'devtools';
  title: string;
  blurb: string;
  points: string[];
  proof: { label: string; arch: ArchId }[];
}[] = [
  {
    icon: 'agents',
    title: 'Multi-agent systems',
    blurb: 'Teams of specialised agents that investigate, reason, critique and report, instead of one prompt doing everything.',
    points: ['LangGraph orchestration and shared state', 'Investigator → Reasoner → Critic → Reporter roles', 'Critic loop that sends weak answers back'],
    proof: [{ label: 'Billing RCA', arch: 'rca' }],
  },
  {
    icon: 'retrieval',
    title: 'Retrieval & GraphRAG',
    blurb: 'Retrieval that holds up: lexical and dense search together, a knowledge graph on top, and fusion to rank it.',
    points: ['BM25 + dense embeddings, fused with RRF', 'GraphRAG over a NetworkX entity graph', 'ChromaDB and FAISS vector stores'],
    proof: [{ label: 'Billing RCA', arch: 'rca' }],
  },
  {
    icon: 'llmops',
    title: 'LLM infrastructure & evals',
    blurb: 'The parts around the model: routing with failover, caching, tracing, and measuring whether it actually works.',
    points: ['LiteLLM routing with rate-limit failover', 'MLflow + Langfuse tracing, Redis cache', 'ROUGE-L, BERTScore, LLM-as-judge, ablations'],
    proof: [{ label: 'Billing RCA', arch: 'rca' }, { label: 'Diffbrief', arch: 'diffbrief' }],
  },
  {
    icon: 'devtools',
    title: 'Developer tools & automation',
    blurb: 'Tools I want to use myself, and pipelines that run and ship without anyone pressing a button.',
    points: ['VS Code extensions in TypeScript', 'Scheduled GitHub Actions pipelines', 'EC2 deploys with systemd timers and Caddy'],
    proof: [{ label: 'LedgerLM', arch: 'ledgerlm' }, { label: 'Diffbrief', arch: 'diffbrief' }],
  },
];

export const architectures: {
  id: ArchId;
  name: string;
  summary: string;
  steps: { title: string; detail: string; tech: string[] }[];
  facts: { value: string; label: string }[];
  repo: string;
  live?: string;
}[] = [
  {
    id: 'diffbrief',
    name: 'Diffbrief',
    summary: 'A daily engineering digest that collects, judges, writes and publishes itself.',
    steps: [
      { title: 'Collect', detail: 'A few hundred fresh candidates each morning: Hacker News front page, best list and keyword searches, Lobsters, fast-rising GitHub repos, framework release notes, Hugging Face papers and trending models, and about 70 engineering blogs.', tech: ['Bun', 'TypeScript'] },
      { title: 'Score', detail: 'A model rates every candidate for quality (1–10) and fit with the beat (0–3), and writes a plain headline and a reason to read it from the source\'s own text.', tech: ['OpenRouter', 'LLM judging'] },
      { title: 'Select', detail: 'Up to 50 stories per edition, most of it reserved for AI and systems, with caps on general security and launches, and nothing already published in the last week.', tech: ['Ranking rules'] },
      { title: 'Brief', detail: 'Picked stories get a short What / How / Why-it-matters brief and, when the article describes one, an architecture diagram.', tech: ['LLM summaries'] },
      { title: 'Ship', detail: 'GitHub Actions builds the edition at 05:53 IST with a backup run, plus an hourly Security Watch from CISA\'s exploited-vulnerabilities list. A systemd timer on EC2 pulls new releases every 15 minutes behind Caddy.', tech: ['GitHub Actions', 'EC2', 'systemd', 'Caddy'] },
    ],
    facts: [
      { value: '100s', label: 'candidates every morning' },
      { value: '≤50', label: 'stories published' },
      { value: '~70', label: 'blogs watched' },
      { value: '1h', label: 'security watch cycle' },
    ],
    repo: 'devpulse',
    live: 'https://diffbrief.tatsatpandey.com',
  },
  {
    id: 'rca',
    name: 'Billing RCA (M.Tech)',
    summary: 'Detect a billing anomaly, then let a team of agents find and explain its root cause, and prove it with ablations.',
    steps: [
      { title: 'Detect', detail: 'IsolationForest, statistical z-scores and rule-based validators flag anomalies. Five anomaly types (zero billing, duplicate charge, usage spike, SLA breach, CDR mismatch) are injected for training and evaluation.', tech: ['scikit-learn', 'IsolationForest'] },
      { title: 'Retrieve', detail: 'Hybrid retrieval over 8 RCA playbooks: ChromaDB with all-MiniLM-L6-v2 (384-dim), BM25 and a NetworkX GraphRAG, merged with reciprocal rank fusion.', tech: ['ChromaDB', 'BM25', 'GraphRAG', 'RRF'] },
      { title: 'Reason', detail: 'A LangGraph orchestrator runs Investigator → Reasoner → Critic → Reporter. The critic sends weak explanations back for another pass.', tech: ['LangGraph'] },
      { title: 'Route', detail: 'LiteLLM routes to Groq first with OpenRouter fallbacks and automatic rate-limit failover. Redis caches responses; MLflow and Langfuse trace every run.', tech: ['LiteLLM', 'Redis', 'MLflow', 'Langfuse'] },
      { title: 'Evaluate', detail: 'Scored against 60 expert-written root causes with ROUGE-L, BERTScore and a 4-axis LLM judge, across a 5-configuration ablation (no-RAG → full GraphRAG), with Wilcoxon tests and bootstrap 95% CIs.', tech: ['ROUGE-L', 'BERTScore', 'LLM-as-judge'] },
    ],
    facts: [
      { value: '60', label: 'expert-written RCAs' },
      { value: '5', label: 'ablation configs' },
      { value: '54k', label: 'synthetic billing rows' },
      { value: '4', label: 'Docker services' },
    ],
    repo: 'mtech-teleco-multiagent-project',
    live: 'https://rca.tatsatpandey.com',
  },
  {
    id: 'ledgerlm',
    name: 'LedgerLM',
    summary: 'A VS Code extension that shows exactly where your AI tokens go, without anything leaving your machine.',
    steps: [
      { title: 'Read', detail: 'Opens the logs Claude Code, GitHub Copilot, Codex CLI and OpenCode already write to disk, strictly read-only.', tech: ['Node fs', 'JSONL'] },
      { title: 'Parse', detail: 'Extracts per-call usage: fresh input, cache reads, cache writes and output tokens, plus sessions, subagents, tools and hooks.', tech: ['TypeScript'] },
      { title: 'Price', detail: 'Cost only when trustworthy: Copilot\'s billed credits, labelled estimates for Claude Code and Codex from bundled price tables, and "≥" when a total is a lower bound.', tech: ['Cost model'] },
      { title: 'Store', detail: 'A local sql.js SQLite file in VS Code\'s storage, written atomically, with a lock file so only one window writes while others read.', tech: ['sql.js', 'SQLite'] },
      { title: 'Show', detail: 'A tabbed dashboard with live refresh (fs.watch, about 2 seconds), budget alerts, and CSV/JSON export.', tech: ['VS Code API', 'Webview'] },
    ],
    facts: [
      { value: '4', label: 'AI tools tracked' },
      { value: '0', label: 'network requests' },
      { value: '~2s', label: 'live refresh' },
      { value: '100%', label: 'local and offline' },
    ],
    repo: 'ledgerlm',
    live: 'https://marketplace.visualstudio.com/items?itemName=TatsatP.ledgerlm',
  },
];
