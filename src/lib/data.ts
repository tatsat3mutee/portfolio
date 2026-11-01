import episodesData from '../data/episodes.json';
import githubData from '../data/github.json';

export type Episode = {
  slug: string;
  title: string;
  subtitle: string | null;
  number: number | null;
  date: string;
  duration: number;
  audio: string;
  appleUrl: string | null;
  description: string;
};

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  fork: boolean;
  pushedAt: string;
  homepage: string | null;
  url: string;
  topics: string[];
};

export const episodes = episodesData.episodes as Episode[];
export const latest = episodes[0];
export const repos = githubData as Repo[];
export const repoByName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

// Apple artwork template -> sized URL
export const artwork = (size = 600) =>
  episodesData.artwork.replace('{w}', String(size)).replace('{h}', String(size)).replace('{f}', 'jpg');

export const episodeCount = Math.max(episodes.length, ...episodes.map((e) => (e.number ?? 0) + 1));

export const fmtTime = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const ago = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

export const langColor: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  Astro: '#ff5a03',
  'C#': '#178600',
};

declare global {
  const __HAS_RESUME__: boolean;
}
export const hasResume = __HAS_RESUME__;
