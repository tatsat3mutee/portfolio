import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent as RMouseEvent } from 'react';
import { Icons } from '../lib/icons';
import { ago, artwork, episodeCount, episodes, fmtTime, langColor, latest, repoByName, repos } from '../lib/data';
import { hiddenRepos, podcast, projects, recognitions, site, stack, type Project } from '../data/site';
import { FeaturedPlayer, PlayButton } from '../player/Player';
import { usePlayer } from '../player/PlayerContext';
import { Platforms, Reveal, ResumeButton, SocialLinks } from './common';
import { ProjectVisual } from './Visuals';

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- Hero ---------------- */

const ROTATE = ['AI agents', 'RAG systems', 'dev tools'];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span style={{ display: 'inline-grid', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATE[i]}
          className="serif grad-text"
          style={{ gridArea: '1 / 1' }}
          initial={{ y: '0.6em', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.6em', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease }}
        >
          {ROTATE[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const CODE: [string, string][][] = [
  [['# multi-agent root-cause analysis', 'c']],
  [['graph', ''], [' = ', ''], ['StateGraph', 'f'], ['(RCAState)', '']],
  [['graph', ''], ['.add_node(', ''], ['"investigator"', 's'], [', investigate)', '']],
  [['graph', ''], ['.add_node(', ''], ['"reasoner"', 's'], [', reason)', '']],
  [['graph', ''], ['.add_node(', ''], ['"critic"', 's'], [', critique)', '']],
  [['graph', ''], ['.add_conditional_edges(', ''], ['"critic"', 's'], [', refine)', '']],
  [['app', ''], [' = graph.', ''], ['compile', 'f'], ['()', '']],
  [['', '']],
  [['>>> ', 'k'], ['app.invoke({', ''], ['"anomaly"', 's'], [': spike})', '']],
];
const CODE_LEN = CODE.reduce((n, l) => n + l.reduce((m, [t]) => m + t.length, 0) + 1, 0);

function Terminal() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? CODE_LEN : 0);
  useEffect(() => {
    if (reduce) return;
    let iv = 0;
    const start = setTimeout(() => {
      iv = window.setInterval(() => setN((v) => (v >= CODE_LEN + 260 ? 0 : v + 2)), 32);
    }, 900);
    return () => {
      clearTimeout(start);
      clearInterval(iv);
    };
  }, [reduce]);
  let left = n;
  return (
    <pre aria-label="Code sample: a LangGraph multi-agent pipeline">
      {CODE.map((line, li) => {
        if (left <= 0) return null;
        const parts = line.map(([t, c], pi) => {
          const show = t.slice(0, Math.max(0, left));
          left -= t.length;
          return show ? <span key={pi} className={c}>{show}</span> : null;
        });
        left -= 1;
        return <div key={li}>{parts}{left <= 0 && <span className="caret" />}{line[0][0] === '' && ' '}</div>;
      })}
      {left > 0 && <span className="caret" />}
    </pre>
  );
}

function NowPlayingCard() {
  const p = usePlayer();
  return (
    <div className={`glass np${p.playing ? ' playing' : ''}`}>
      <div className="np-art">
        <span className="disc" />
        <img src={artwork(200)} alt="Khwaab-e-Surkhaab cover art" width={74} height={74} />
      </div>
      <div className="np-meta">
        <small>{p.playing ? 'Now playing' : 'New episode'}</small>
        <b>{latest.title}</b>
        <span>{podcast.name} · {fmtTime(latest.duration)}</span>
      </div>
      <PlayButton ep={latest} size="sm" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tX = useTransform(sx, (v) => v * 18);
  const tY = useTransform(sy, (v) => v * 18);
  const bX = useTransform(sx, (v) => v * -26);
  const bY = useTransform(sy, (v) => v * -26);
  const onMove = (e: RMouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const words = ['I', 'build'];
  return (
    <header className="hero" ref={ref} onMouseMove={onMove} id="top">
      <div className="aurora" aria-hidden="true"><span className="a1" /><span className="a2" /><span className="a3" /></div>
      <div className="dots" aria-hidden="true" />
      <div className="spot" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <motion.a href="#podcast" className="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6, ease }}>
            <span className="tag">New</span>
            <span><b>{latest.title}</b> is out on {podcast.name}</span>
            <Icons.arrowRight width={14} height={14} />
          </motion.a>
          <h1>
            {words.map((w, i) => (
              <motion.span key={w} className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.7, ease }}>
                {w}&nbsp;
              </motion.span>
            ))}
            <motion.span className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7, ease }}>
              <RotatingWord />
            </motion.span>{' '}
            <motion.span className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23, duration: 0.7, ease }}>
              by&nbsp;day,
            </motion.span>{' '}
            <motion.span className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7, ease }}>
              and&nbsp;write
            </motion.span>{' '}
            <motion.span className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33, duration: 0.7, ease }}>
              <span className="serif grad-text">poetry</span>
            </motion.span>{' '}
            <motion.span className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.7, ease }}>
              by&nbsp;night.
            </motion.span>
          </h1>
          <motion.p className="hero-hindi hindi" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.5, duration: 0.8 }}>
            {podcast.taglineHindi}
          </motion.p>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease }}>
            I'm <strong>Tatsat Pandey</strong>, a {site.role} working on multi-agent systems, retrieval and
            developer tooling. Off the clock I write and narrate Hindi poems on <strong>{podcast.name}</strong>.
          </motion.p>
          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease }}>
            <a className="btn btn-primary" href="#work">See my work <Icons.arrowDown /></a>
            <a className="btn btn-ghost" href="#podcast"><Icons.play /> Listen</a>
            <ResumeButton />
          </motion.div>
        </div>
        <motion.div className="hero-cards" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.9, ease }}>
          <motion.div className="glass term" style={{ x: tX, y: tY }}>
            <div className="term-bar"><i /><i /><i /><span>rca/agents.py</span></div>
            <Terminal />
          </motion.div>
          <motion.div style={{ x: bX, y: bY }}>
            <NowPlayingCard />
          </motion.div>
        </motion.div>
      </div>
      <div className="scroll-cue" aria-hidden="true">SCROLL<i /></div>
    </header>
  );
}

/* ---------------- Marquee ---------------- */

export function Marquee() {
  const items = [...stack, ...stack];
  return (
    <div className="marquee" aria-label="Tools and technologies">
      <div className="marquee-track">
        {items.map((s, i) => <span key={i} aria-hidden={i >= stack.length}>{s}</span>)}
      </div>
    </div>
  );
}

/* ---------------- Work ---------------- */

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const repo = repoByName.get(p.repo.toLowerCase());
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: RMouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const big = p.size === 'xl' || p.size === 'wide' || p.size === 'tall';
  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      className={`card ${p.size}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
    >
      <div className="card-visual"><ProjectVisual kind={p.visual} /></div>
      <div className="card-body">
        <div className="card-top">
          <h3>{p.name}</h3>
          {p.live && p.size === 'xl' && <span className="badge-live"><i />Live</span>}
        </div>
        <p className="tagline">{p.tagline}</p>
        {big && (
          <ul className="points">
            {p.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        )}
        <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
        <div className="card-foot">
          <div className="meta">
            {repo?.language && <span className="lang"><i style={{ background: langColor[repo.language] ?? 'var(--peach)' }} />{repo.language}</span>}
            {repo && repo.stars > 0 && <span className="lang"><Icons.star width={12} height={12} />{repo.stars}</span>}
            {repo && <span>updated {ago(repo.pushedAt)}</span>}
          </div>
          <div className="links">
            {p.live && <a className="link-pill" href={p.live} target="_blank" rel="noopener">{p.liveLabel && p.size !== 'sm' ? p.liveLabel : 'Live'} <Icons.arrowUpRight /></a>}
            <a className="link-pill" href={repo?.url ?? `https://github.com/tatsat3mutee/${p.repo}`} target="_blank" rel="noopener" aria-label={`${p.name} source code on GitHub`}>
              <Icons.github /> Code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const featured = new Set(projects.map((p) => p.repo.toLowerCase()));
  const more = repos
    .filter((r) => !r.fork && !featured.has(r.name.toLowerCase()) && !hiddenRepos.some((rx) => rx.test(r.name)))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
    .slice(0, 6);
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">01 · Selected work</span>
            <h2 className="section-title">Things I've <span className="serif grad-text">built</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-sub">Agents, retrieval systems and developer tools. Every card is a real repository, and the activity is pulled from GitHub on each deploy.</p>
          </Reveal>
        </div>
        <div className="bento">
          {projects.map((p, i) => <ProjectCard key={p.repo} p={p} i={i} />)}
        </div>
        {more.length > 0 && (
          <Reveal className="more">
            <div className="more-head">
              <h3>More on GitHub</h3>
              <a className="link-pill" href="https://github.com/tatsat3mutee?tab=repositories" target="_blank" rel="noopener">All repositories <Icons.arrowUpRight /></a>
            </div>
            <ul className="repo-list">
              {more.map((r) => (
                <li key={r.name}>
                  <a href={r.url} target="_blank" rel="noopener">
                    <b>{r.name}</b>
                    <p>{r.description || 'Repository on GitHub'}</p>
                    <span className="meta">
                      {r.language && <span className="lang"><i style={{ background: langColor[r.language] ?? 'var(--peach)' }} />{r.language}</span>}
                      <span>{ago(r.pushedAt)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------- Podcast ---------------- */

export function Podcast({ playerRef }: { playerRef: React.RefObject<HTMLDivElement> }) {
  const p = usePlayer();
  return (
    <section className="section" id="podcast">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">02 · Poetry</span>
            <h2 className="section-title">The other <span className="serif grad-text">half</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-sub">Hindi poems, written and narrated by me, with a little music under the words. Press play and keep scrolling; the player follows you.</p>
          </Reveal>
        </div>
        <Reveal>
          <div className={`pod${p.playing ? ' playing' : ''}`}>
            <div className="pod-grid">
              <div className="pod-art">
                <span className="disc" />
                <img src={artwork(800)} alt="Khwaab-e-Surkhaab cover art" width={420} height={420} loading="lazy" />
              </div>
              <div ref={playerRef}>
                <span className="label">Podcast · {episodeCount}+ episodes</span>
                <h2 className="serif">{podcast.name}</h2>
                <p className="hindi-title hindi">{podcast.hindi}</p>
                <p className="tagline">{podcast.tagline}</p>
                <FeaturedPlayer />
                <ul className="ep-list">
                  {episodes.slice(1, 4).map((ep) => (
                    <li key={ep.slug} className={`ep${p.isCurrent(ep) ? ' current' : ''}`}>
                      <PlayButton ep={ep} size="sm" ghost />
                      <div className="ep-main">
                        <b>{ep.title}</b>
                        <span>{ep.number ? `Episode ${ep.number} · ` : ''}{new Date(ep.date).getFullYear()}</span>
                      </div>
                      <span className="ep-dur">{fmtTime(ep.duration)}</span>
                    </li>
                  ))}
                </ul>
                <Platforms only={['spotify', 'youtube', 'apple', 'jiosaavn']} />
                <a className="btn btn-glow" href="/khwaab/" style={{ marginTop: 22 }}>
                  Open the show <Icons.arrowRight />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

export function About() {
  const publicRepos = repos.filter((r) => !r.fork && !/^skills-/.test(r.name)).length;
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="about-grid">
          <Reveal>
            <span className="label">03 · About</span>
            <p className="about-big" style={{ marginTop: 18 }}>
              An engineer who <span className="serif grad-text">writes</span>, and a poet who <span className="serif grad-text">ships</span>.{' '}
              <span className="dim">I like systems that explain themselves, and words that don't have to.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-text">
              <p>
                I work on generative AI: multi-agent pipelines, retrieval that holds up in production, and tools that make
                developers faster. My M.Tech dissertation built a team of agents that investigate telecom billing anomalies
                and explain their root cause.
              </p>
              <p>
                On the side I build things I want to use myself: a daily engineering digest that curates itself, and a VS Code
                extension that shows exactly where your AI tokens go. And when the laptop closes, I write.
              </p>
            </div>
            <div className="stats">
              <div className="stat"><b>{publicRepos}</b><span>public repositories</span></div>
              <div className="stat"><b>{episodeCount}+</b><span>poetry episodes</span></div>
              <div className="stat"><b>{recognitions.length}</b><span>recognitions at IBM</span></div>
            </div>
          </Reveal>
        </div>
        <ul className="awards">
          {recognitions.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08} className="award">
              <span className="ic"><Icons.trophy /></span>
              <div><b>{r.title}</b>{r.when && <span>{r.when}</span>}</div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <section className="section contact" id="contact">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <Reveal><span className="label">04 · Contact</span></Reveal>
        <Reveal delay={0.05}>
          <h2>Let's <span className="serif grad-text">talk.</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p>About agents, a tool you're building, or a poem that stayed with you. My inbox is open.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="row">
            <a className="btn btn-glow" href={`mailto:${site.email}`}><Icons.mail /> {site.email}</a>
            <button className="btn btn-ghost" onClick={copy} aria-live="polite">
              {copied ? <><Icons.check /> Copied</> : <><Icons.copy /> Copy email</>}
            </button>
            <ResumeButton />
          </div>
          <SocialLinks />
        </Reveal>
      </div>
    </section>
  );
}
