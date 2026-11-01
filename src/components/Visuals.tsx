import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Visual } from '../data/site';

const ease = [0.22, 1, 0.36, 1] as const;

/** Diffbrief: stories get scored, the best one rises and highlights. */
function Digest() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState([0, 1, 2, 3]);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setOrder((o) => [o[3], o[0], o[1], o[2]]), 2200);
    return () => clearInterval(t);
  }, [reduce]);
  const rows = [
    { score: '9.4', src: 'HN', w: '88%' },
    { score: '8.9', src: 'GitHub', w: '72%' },
    { score: '8.6', src: 'Lobsters', w: '80%' },
    { score: '8.1', src: 'HN', w: '64%' },
  ];
  return (
    <div className="vis vis-digest">
      <div className="hdr"><span>Today's brief</span><span>scored by LLM</span></div>
      {order.map((i, pos) => (
        <motion.div key={i} layout transition={{ duration: 0.7, ease }} className={`story${pos === 0 ? ' hot' : ''}`}>
          <span className="score">{rows[i].score}</span>
          <span className="lines"><i style={{ width: rows[i].w }} /><i /></span>
          <span className="src">{rows[i].src}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** Thesis: Detect → Investigator → Reasoner ⇄ Critic → Reporter, with a travelling pulse. */
function Pipeline() {
  const nodes = [
    { x: 40, label: 'Detect' },
    { x: 155, label: 'Investigate' },
    { x: 270, label: 'Reason' },
    { x: 385, label: 'Critic' },
    { x: 500, label: 'Report' },
  ];
  const y = 120;
  return (
    <div className="vis vis-pipe">
      <svg viewBox="0 0 540 240" role="img" aria-label="Agent pipeline: detect, investigate, reason, critic, report">
        <defs>
          <linearGradient id="pg" x1="0" x2="1">
            <stop offset="0" stopColor="#fdba96" />
            <stop offset="1" stopColor="#ef6f8f" />
          </linearGradient>
        </defs>
        <text x="270" y="40" textAnchor="middle" fill="#77706a" fontFamily="Geist Mono Variable, monospace" fontSize="11" letterSpacing="2">HYBRID RAG · BM25 + DENSE + GRAPH</text>
        {[155, 270].map((x) => (
          <line key={x} x1={x} y1={56} x2={x} y2={y - 22} stroke="rgba(255,255,255,0.14)" strokeDasharray="3 4" />
        ))}
        <line x1={40} y1={y} x2={500} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <motion.line
          x1={40} y1={y} x2={500} y2={y} stroke="url(#pg)" strokeWidth="2.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }}
        />
        {/* refine loop critic -> reasoner */}
        <path d="M385 146 C 360 200, 295 200, 270 146" fill="none" stroke="rgba(253,186,150,0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="327" y="214" textAnchor="middle" fill="#aaa29a" fontFamily="Geist Mono Variable, monospace" fontSize="10.5">refine</text>
        <circle r="5" fill="#fff">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={`M40 ${y} L500 ${y}`} />
        </circle>
        {nodes.map((n, i) => (
          <motion.g key={n.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.6, ease }}>
            <circle cx={n.x} cy={y} r="22" fill="#1d1b22" stroke="rgba(253,186,150,0.6)" strokeWidth="1.5" />
            <circle cx={n.x} cy={y} r="6" fill={i === 0 || i === 4 ? '#fc8b55' : '#fdba96'}>
              <animate attributeName="opacity" values="1;0.35;1" dur="3.2s" begin={`${i * 0.64}s`} repeatCount="indefinite" />
            </circle>
            <text x={n.x} y={y + 44} textAnchor="middle" fill="#cfc8c0" fontFamily="Geist Variable, sans-serif" fontSize="12.5">{n.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/** LedgerLM: stacked token bars per source. */
function Ledger() {
  const sources = [
    { name: 'Claude Code', c: '#fc8b55' },
    { name: 'Copilot', c: '#a594ff' },
    { name: 'Codex', c: '#7ee0b5' },
    { name: 'OpenCode', c: '#fdba96' },
  ];
  const days = [
    [30, 18, 10, 6], [42, 20, 8, 10], [26, 30, 12, 8], [50, 16, 14, 6], [38, 24, 18, 12], [56, 22, 10, 14], [44, 28, 16, 9],
  ];
  return (
    <div className="vis vis-ledger">
      <div style={{ width: '100%' }}>
        <div className="ledger-top"><b>Tokens</b><span>last 7 days · local</span></div>
        <div className="bars">
          {days.map((d, i) => (
            <div className="col" key={i}>
              {d.map((v, j) => (
                <motion.i
                  key={j}
                  style={{ height: `${v}%`, background: sources[j].c, opacity: 0.9 }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i + 0.08 * j, duration: 0.7, ease }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="legend">
          {sources.map((s) => <span key={s.name}><i style={{ background: s.c }} />{s.name}</span>)}
        </div>
      </div>
    </div>
  );
}


function Query() {
  const h = [40, 70, 55, 90, 62, 78];
  return (
    <div className="vis vis-query">
      <span className="bubble">Which segments churn the most?</span>
      <span className="sql">SELECT segment, AVG(churn) …</span>
      <div className="mini-bars">
        {h.map((v, i) => (
          <motion.i key={i} style={{ height: `${v}%` }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease }} />
        ))}
      </div>
    </div>
  );
}




export function ProjectVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case 'digest': return <Digest />;
    case 'pipeline': return <Pipeline />;
    case 'ledger': return <Ledger />;
    case 'query': return <Query />;
  }
}
