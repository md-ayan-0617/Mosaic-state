import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { INSIGHTS } from '../../data/insights';

const CATEGORIES = ['UX', 'SYSTEMS', 'WEBGL', 'MAPPING', 'PLATFORMS', 'AI', 'EXHIBITS', 'ACCESSIBILITY'];

export const InsightsPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? INSIGHTS.filter((a) => a.category.toLowerCase().includes(activeCategory.toLowerCase()))
    : INSIGHTS;

  return (
    <main id="main-content" style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--white)' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '24px', letterSpacing: '0.06em' }}>
          STATE_08 / WORKING KNOWLEDGE
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', letterSpacing: '-0.04em', lineHeight: 0.88, fontWeight: 800, textTransform: 'uppercase', maxWidth: '800px' }}>
          NOTES<br />ON<br />BUILDING<br />COMPLEX<br />THINGS.
        </h1>
      </section>

      {/* Category Filter */}
      <div style={{ padding: '16px clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>CATEGORY</span>
        <button
          onClick={() => setActiveCategory(null)}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', border: `1px solid ${activeCategory === null ? 'var(--ink)' : 'var(--line)'}`, backgroundColor: activeCategory === null ? 'var(--ink)' : 'transparent', color: activeCategory === null ? '#fff' : 'var(--text-muted)', cursor: 'pointer' }}
        >
          ALL
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', border: `1px solid ${activeCategory === cat ? 'var(--ink)' : 'var(--line)'}`, backgroundColor: activeCategory === cat ? 'var(--ink)' : 'transparent', color: activeCategory === cat ? '#fff' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Index */}
      <div>
        {filtered.map((article) => (
          <Link
            key={article.slug}
            to={`/insights/${article.slug}`}
            onMouseEnter={() => setCursorMode('OPEN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
            style={{ display: 'block', textDecoration: 'none' }}
          >
            <div
              style={{ display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '40px', alignItems: 'center', padding: '32px clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--canvas)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '4px', letterSpacing: '0.04em' }}>
                  {article.category}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {article.date}
                </div>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.8vw, 36px)', letterSpacing: '-0.025em', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.05, marginBottom: '8px' }}>
                  {article.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4, maxWidth: '580px' }}>
                  {article.excerpt}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{article.readTime}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--system-blue)' }}>→</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
