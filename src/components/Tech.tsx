import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent as RMouseEvent } from 'react';
import { Icons } from '../lib/icons';
import { ago, repoByName } from '../lib/data';
import { architectures, expertise, type ArchId } from '../data/site';
import { Reveal } from './common';

const ease = [0.22, 1, 0.36, 1] as const;
const ARCH_EVENT = 'arch-select';

/** Jump to the "Under the hood" section with a given system selected. */
function openArch(id: ArchId) {
  window.dispatchEvent(new CustomEvent<ArchId>(ARCH_EVENT, { detail: id }));
}

/* ---------------- Hero card: a live system ---------------- */

export function LiveSystemCard() {
  const repo = repoByName.get('devpulse');
  const stages = architectures[0].steps.map((s) => s.title);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((v) => (v + 1) % stages.length), 1400);
    return () => clearInterval(t);
  }, [reduce, stages.length]);
  return (
    <a className="glass live" href="#arch" onClick={() => openArch('diffbrief')}>
      <div className="live-top">
        <span className="badge-live"><i />Live system</span>
        <span className="mono live-time" suppressHydrationWarning>{repo ? `last push ${ago(repo.pushedAt)}` : 'daily at 05:53 IST'}</span>
      </div>
      <b className="live-name">Diffbrief</b>
      <span className="live-sub">Self-running AI engineering digest · daily at 05:53 IST</span>
      <div className="live-stages" aria-label={`Pipeline: ${stages.join(', ')}`}>
        {stages.map((s, i) => (
          <span key={s} className={`live-stage${i === active ? ' on' : ''}${i < active ? ' done' : ''}`}>{s}</span>
        ))}
      </div>
    </a>
  );
}

/* ---------------- 01 · What I build ---------------- */

export function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">01 · What I build</span>
            <h2 className="section-title">Engineering, <span className="serif grad-text">end to end</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-sub">From the agents and the retrieval underneath them to the routing, evaluation and the pipeline that ships it. Each area links to a system that does it.</p>
          </Reveal>
        </div>
        <div className="xp-grid">
          {expertise.map((x, i) => {
            const Icon = Icons[x.icon];
            return (
              <Reveal key={x.title} delay={(i % 2) * 0.08} className="xp">
                <span className="xp-ic"><Icon /></span>
                <h3>{x.title}</h3>
                <p className="xp-blurb">{x.blurb}</p>
                <ul>
                  {x.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <div className="xp-proof">
                  <span className="mono">See it in</span>
                  {x.proof.map((p) => (
                    <a key={p.arch} href="#arch" onClick={() => openArch(p.arch)} className="link-pill">
                      {p.label} <Icons.arrowRight />
                    </a>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 03 · Under the hood ---------------- */

export function UnderTheHood() {
  const reduce = useReducedMotion();
  const [archId, setArchId] = useState<ArchId>('diffbrief');
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const arch = architectures.find((a) => a.id === archId)!;
  const repo = repoByName.get(arch.repo.toLowerCase());

  // select a system when another section asks for it
  useEffect(() => {
    const on = (e: Event) => {
      setArchId((e as CustomEvent<ArchId>).detail);
      setStep(0);
      setAuto(true);
    };
    window.addEventListener(ARCH_EVENT, on);
    return () => window.removeEventListener(ARCH_EVENT, on);
  }, []);

  // walk through the pipeline while the section is on screen, until the visitor takes over
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduce || !auto || !visible) return;
    const t = setInterval(() => setStep((s) => (s + 1) % arch.steps.length), 3600);
    return () => clearInterval(t);
  }, [reduce, auto, visible, arch.steps.length]);

  const pick = (i: number) => {
    setStep(i);
    setAuto(false);
  };
  const onMove = (e: RMouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="section" id="arch" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">03 · Under the hood</span>
            <h2 className="section-title">How they're <span className="serif grad-text">built</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-sub">Pick a system and step through its pipeline. Every stage and number comes from the project's own documentation.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="arch-tabs" role="tablist" aria-label="Systems">
            {architectures.map((a) => (
              <button
                key={a.id}
                role="tab"
                aria-selected={a.id === archId}
                className={`arch-tab${a.id === archId ? ' on' : ''}`}
                onClick={() => { setArchId(a.id); setStep(0); setAuto(true); }}
              >
                {a.id === archId && <motion.span layoutId="arch-pill" className="pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                {a.name}
              </button>
            ))}
          </div>

          <div className="arch card" onMouseMove={onMove} role="tabpanel" aria-label={arch.name}>
            <div className="arch-head">
              <p className="arch-summary">{arch.summary}</p>
              <div className="links">
                {arch.live && <a className="link-pill" href={arch.live} target="_blank" rel="noopener">Live <Icons.arrowUpRight /></a>}
                <a className="link-pill" href={repo?.url ?? `https://github.com/tatsat3mutee/${arch.repo}`} target="_blank" rel="noopener" aria-label={`${arch.name} source code`}>
                  <Icons.github /> Code
                </a>
              </div>
            </div>

            {/* pipeline rail */}
            <ol className="rail" style={{ ['--n' as string]: arch.steps.length, ['--i' as string]: step }}>
              <span className="rail-line" aria-hidden="true"><span className="rail-fill" /></span>
              {arch.steps.map((s, i) => (
                <li key={s.title}>
                  <button className={`rail-node${i === step ? ' on' : ''}${i < step ? ' done' : ''}`} onClick={() => pick(i)} aria-current={i === step ? 'step' : undefined}>
                    <span className="rail-dot"><span className="mono">{String(i + 1).padStart(2, '0')}</span></span>
                    <span className="rail-label">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="arch-body">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${archId}-${step}`}
                  className="arch-detail"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <span className="mono arch-step">Stage {step + 1} of {arch.steps.length}</span>
                  <h3>{arch.steps[step].title}</h3>
                  <p>{arch.steps[step].detail}</p>
                  <div className="chips">{arch.steps[step].tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                </motion.div>
              </AnimatePresence>
              <div className="facts">
                {arch.facts.map((f) => (
                  <div key={f.label} className="fact">
                    <b className="grad-text">{f.value}</b>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* every system's full pipeline as text, for search engines and screen readers */}
            <div className="sr-only">
              {architectures.map((a) => (
                <section key={a.id} aria-label={`${a.name} pipeline`}>
                  <h4>{a.name}: {a.summary}</h4>
                  <ol>{a.steps.map((s) => <li key={s.title}>{s.title}: {s.detail}</li>)}</ol>
                </section>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
