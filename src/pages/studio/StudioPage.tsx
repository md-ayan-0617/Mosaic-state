import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { TEAM_MEMBERS, STUDIO_BELIEFS } from '../../data/studio';

export const StudioPage = () => {
  const { setCursorMode } = useAppState();

  return (
    <main id="main-content" style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--paper)' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', marginBottom: '24px', letterSpacing: '0.06em' }}>
            STATE_07 / STUDIO CULTURE
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', letterSpacing: '-0.04em', lineHeight: 0.88, fontWeight: 800, textTransform: 'uppercase' }}>
            GOOD<br />SYSTEMS<br />START WITH<br />GOOD<br />
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.9em' }}>conversations.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body-large)', color: 'var(--text-secondary)', marginTop: '32px', lineHeight: 1.5, maxWidth: '420px' }}>
            A small multidisciplinary team of researchers, designers, and engineers working in the same conversation from day one.
          </p>
        </div>
        <div>
          <img src="/assets/images/studio_team.jpg" alt="MOSAIC/STATE team reviewing work" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ── TEAM CONTACT SHEET ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '40px', letterSpacing: '0.06em' }}>
          THE PEOPLE / STUDIO CONTACT SHEET
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', backgroundColor: 'var(--line)' }}>
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              style={{ backgroundColor: 'var(--paper)', padding: '32px 28px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 24px)', letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--ink)', lineHeight: 1, marginBottom: '4px' }}>
                    {member.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', letterSpacing: '0.04em' }}>
                    {member.discipline}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', padding: '3px 7px', border: '1px solid var(--line)' }}>
                  {member.id}
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px', fontWeight: 500 }}>
                {member.role}
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '12px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.05em' }}>
                  CURRENT FOCUS
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {member.currentFocus}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '12px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.05em' }}>
                  UNUSUAL FACT
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {member.unusualFact}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {member.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BELIEFS ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--canvas)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '40px', letterSpacing: '0.06em' }}>
          WHAT WE BELIEVE / STUDIO PRINCIPLES
        </div>

        {STUDIO_BELIEFS.map((belief) => (
          <div
            key={belief.number}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr',
              gap: '40px',
              padding: '32px 0',
              borderBottom: '1px solid var(--line)',
              alignItems: 'start',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--network-green)', letterSpacing: '0.04em' }}>
              {belief.number}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>
              {belief.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {belief.body}
            </p>
          </div>
        ))}
      </section>

      {/* Studio Process Photo */}
      <section style={{ overflow: 'hidden', maxHeight: '480px' }}>
        <img src="/assets/images/studio_process.jpg" alt="Studio process documentation" style={{ width: '100%', objectFit: 'cover', maxHeight: '480px' }} />
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)', textAlign: 'center', backgroundColor: 'var(--paper)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', letterSpacing: '-0.03em', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px' }}>
          LET'S BUILD<br />SOMETHING COMPLEX.
        </h2>
        <Link
          to="/start"
          className="btn-primary"
          onMouseEnter={() => setCursorMode('BEGIN')}
          onMouseLeave={() => setCursorMode('DEFAULT')}
        >
          START A PROJECT ↗
        </Link>
      </section>
    </main>
  );
};
