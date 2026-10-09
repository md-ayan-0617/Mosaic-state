import React, { useState } from 'react';
import { useAppState } from '../../context/StateContext';

export const ContactPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'New Project Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(32px, 4vw, 64px)',
          borderBottom: '1px solid var(--line)',
        }}
        aria-label="Contact: Start with a question"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--system-blue)',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_11 / CONTACT & DIRECT INQUIRY
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-mega)',
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            fontWeight: 800,
            textTransform: 'uppercase',
            maxWidth: '1100px',
          }}
        >
          START<br />WITH<br />A QUESTION.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-large)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.55,
            marginTop: '36px',
          }}
        >
          Whether you are scoping a complex public transit cartography system, a museum interactive table, or an enterprise configurator engine, our partners are ready to discuss your architecture.
        </p>
      </section>

      {/* ── DETAILS & ABSTRACT MAP & ARCHITECTURAL RULED FORM ── */}
      <section
        style={{
          padding: 'clamp(50px, 7vw, 100px) clamp(20px, 4vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Left: Communication Channels & Abstract Map Diagram */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                01 / NEW BUSINESS & COMMISSIONS
              </div>
              <a
                href="mailto:hello@mosaicstate.studio"
                style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--ink)' }}
              >
                hello@mosaicstate.studio
              </a>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                02 / GENERAL INQUIRIES & ACADEMIC COLLABORATION
              </div>
              <a
                href="mailto:studio@mosaicstate.studio"
                style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--ink)' }}
              >
                studio@mosaicstate.studio
              </a>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                03 / CAREERS & RESIDENCIES
              </div>
              <a
                href="mailto:people@mosaicstate.studio"
                style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--ink)' }}
              >
                people@mosaicstate.studio
              </a>
            </div>
          </div>

          {/* Abstract Local Studio Topology Map */}
          <div style={{ border: '1px solid var(--line)', padding: '24px', backgroundColor: 'var(--white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)' }}>
                COORDINATES / GEOGRAPHIC PRESENCE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                EUROPE & REMOTE
              </span>
            </div>

            <svg viewBox="0 0 100 65" style={{ width: '100%', height: 'auto', backgroundColor: 'var(--canvas)' }} aria-label="Abstract studio geographic nodes">
              {/* Abstract Map Grid Lines */}
              <line x1="10" y1="32" x2="90" y2="32" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="50" y1="5" x2="50" y2="60" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Studio Hubs */}
              {/* Stockholm */}
              <circle cx="56" cy="18" r="3.5" fill="var(--system-blue)" />
              <text x="56" y="14" fontSize="2.8" textAnchor="middle" fill="var(--ink)" fontFamily="Fragment Mono">
                STOCKHOLM
              </text>

              {/* Berlin */}
              <circle cx="50" cy="34" r="3.5" fill="var(--system-blue)" />
              <text x="50" y="30" fontSize="2.8" textAnchor="middle" fill="var(--ink)" fontFamily="Fragment Mono">
                BERLIN
              </text>

              {/* Zurich */}
              <circle cx="44" cy="46" r="3.5" fill="var(--system-blue)" />
              <text x="44" y="52" fontSize="2.8" textAnchor="middle" fill="var(--ink)" fontFamily="Fragment Mono">
                ZURICH
              </text>

              {/* Inter-hub line */}
              <polyline points="56,18 50,34 44,46" fill="none" stroke="var(--system-blue)" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Right: Architectural Ruled Line Form */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Helena Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid var(--ink)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '18px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="helena@institution.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid var(--ink)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '18px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Organization */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  ORGANIZATION & SECTOR
                </label>
                <input
                  type="text"
                  placeholder="e.g. European Heritage Museum / Cultural"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid var(--ink)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '18px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  SUBJECT
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid var(--ink)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                >
                  <option value="New Project Inquiry">New Project Commission</option>
                  <option value="Museum / Exhibit Prototype">Museum / Physical Installation</option>
                  <option value="System Platform Architecture">System Platform / B2B Architecture</option>
                  <option value="Speaking / Academic Inquiry">Speaking & Research Inquiries</option>
                  <option value="Careers / General">Careers & Studio Residency</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  MESSAGE & SYSTEM CONSTRAINTS *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your timeline, goals, and any known technical parameters..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    border: 'none',
                    borderBottom: '1px solid var(--ink)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ backgroundColor: 'var(--system-blue)', borderColor: 'var(--system-blue)', color: '#FFF' }}
                  onMouseEnter={() => setCursorMode('BEGIN')}
                  onMouseLeave={() => setCursorMode('DEFAULT')}
                >
                  SEND DIRECT INQUIRY ↗
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: '48px', backgroundColor: 'var(--white)', border: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)', marginBottom: '8px' }}>
                DIRECT DISPATCH TRANSMITTED
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', textTransform: 'uppercase', marginBottom: '16px' }}>
                MESSAGE RECEIVED.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--graphite)', lineHeight: 1.6 }}>
                Thank you for reaching out, {formData.name}. Your inquiry has been routed to our studio partners. We typically review new technical briefs within 24 to 48 hours.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
