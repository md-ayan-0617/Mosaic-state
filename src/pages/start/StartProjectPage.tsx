import { useState } from 'react';

const PROJECT_TYPES = [
  'Website',
  'Platform',
  'Interactive Map',
  'Spatial Exhibit',
  'WebGL 3D Experience',
  'Application',
  'Data Visualization',
  'AI-Assisted System',
  'Not Sure Yet',
];

export const StartProjectPage = () => {

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    organization: '',
    sector: '',
    problem: '',
    users: '',
    currentSolution: '',
    desiredChange: '',
    projectTypes: [] as string[],
    timeline: '',
    budget: '',
    name: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleType = (t: string) => {
    setFormData((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(t)
        ? prev.projectTypes.filter((x) => x !== t)
        : [...prev.projectTypes, t],
    }));
  };

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
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px) clamp(32px, 4vw, 64px)',
          borderBottom: '1px solid var(--line)',
        }}
        aria-label="Start a project: What are we trying to solve?"
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
          STATE_10 / PROJECT MAPPER
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
          WHAT ARE<br />WE TRYING<br />TO SOLVE?
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
          We start with constraints, systems, and people — not pre-packaged templates. Complete this interactive mapper to construct your problem architecture.
        </p>
      </section>

      {/* ── INTERACTIVE 9-STEP MAPPER & SYSTEM GRAPH ── */}
      <section
        style={{
          padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Left: Wizard Form */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)' }}>
                  STEP 0{step} OF 09 //
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {step === 1 && 'ORGANIZATION & SECTOR'}
                  {step === 2 && 'THE CORE PROBLEM'}
                  {step === 3 && 'WHO USES THIS SYSTEM'}
                  {step === 4 && 'CURRENT INFRASTRUCTURE'}
                  {step === 5 && 'DESIRED TRANSFORMATION'}
                  {step === 6 && 'PROJECT CAPABILITIES'}
                  {step === 7 && 'TIMELINE EXPECTATIONS'}
                  {step === 8 && 'BUDGETARY BOUNDARY'}
                  {step === 9 && 'CONTACT COORDINATES'}
                </span>
              </div>

              {/* Step 1: Org */}
              {step === 1 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    What is your organization and sector?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nordic Heritage Foundation / Cultural"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      border: 'none',
                      borderBottom: '2px solid var(--ink)',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* Step 2: Problem */}
              {step === 2 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    What is the essential problem you need to solve?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. Visitors struggle to discover 9,000 collection items across disjointed archival taxonomies..."
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      border: 'none',
                      borderBottom: '2px solid var(--ink)',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* Step 3: Users */}
              {step === 3 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    Who will actually use this system day-to-day?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gallery visitors, academic curators, field technicians"
                    value={formData.users}
                    onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      border: 'none',
                      borderBottom: '2px solid var(--ink)',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* Step 4: What exists today */}
              {step === 4 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    What system, tool, or website exists today?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. A 10-year-old monolithic portal with siloed APIs"
                    value={formData.currentSolution}
                    onChange={(e) => setFormData({ ...formData, currentSolution: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      border: 'none',
                      borderBottom: '2px solid var(--ink)',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* Step 5: What should change */}
              {step === 5 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    What must fundamentally change?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Instant sub-second search, spatial discovery, touch table compatibility"
                    value={formData.desiredChange}
                    onChange={(e) => setFormData({ ...formData, desiredChange: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      border: 'none',
                      borderBottom: '2px solid var(--ink)',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* Step 6: Project Type */}
              {step === 6 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    What type of interactive system are we building?
                  </label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {PROJECT_TYPES.map((t) => {
                      const isSel = formData.projectTypes.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleType(t)}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            padding: '10px 16px',
                            background: isSel ? 'var(--system-blue)' : 'var(--white)',
                            color: isSel ? '#FFF' : 'var(--ink)',
                            border: '1px solid',
                            borderColor: isSel ? 'var(--system-blue)' : 'var(--line)',
                            cursor: 'pointer',
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 7: Timeline */}
              {step === 7 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    What is your target launch horizon?
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {['Q2 2026', 'Q3/Q4 2026', '2027 Horizon', 'Flexible / R&D'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline: time })}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          padding: '10px 18px',
                          background: formData.timeline === time ? 'var(--system-blue)' : 'var(--white)',
                          color: formData.timeline === time ? '#FFF' : 'var(--ink)',
                          border: '1px solid',
                          borderColor: formData.timeline === time ? 'var(--system-blue)' : 'var(--line)',
                          cursor: 'pointer',
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Budget */}
              {step === 8 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    Anticipated budget tier:
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {['€50k – €100k', '€100k – €250k', '€250k – €500k+', 'Not defined'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          padding: '10px 18px',
                          background: formData.budget === tier ? 'var(--system-blue)' : 'var(--white)',
                          color: formData.budget === tier ? '#FFF' : 'var(--ink)',
                          border: '1px solid',
                          borderColor: formData.budget === tier ? 'var(--system-blue)' : 'var(--line)',
                          cursor: 'pointer',
                        }}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 9: Contact */}
              {step === 9 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
                    Who should we coordinate with?
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name & Role"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        padding: '14px 0',
                        border: 'none',
                        borderBottom: '2px solid var(--ink)',
                        backgroundColor: 'transparent',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '16px',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        padding: '14px 0',
                        border: 'none',
                        borderBottom: '2px solid var(--ink)',
                        backgroundColor: 'transparent',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '16px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-secondary"
                  >
                    ← PREVIOUS
                  </button>
                )}
                {step < 9 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="btn-primary"
                    style={{ backgroundColor: 'var(--system-blue)', borderColor: 'var(--system-blue)', color: '#FFF' }}
                  >
                    CONTINUE →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ backgroundColor: 'var(--system-blue)', borderColor: 'var(--system-blue)', color: '#FFF' }}
                  >
                    SUBMIT PROBLEM BRIEF ↗
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div style={{ padding: '40px', backgroundColor: 'var(--white)', border: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--system-blue)', marginBottom: '8px' }}>
                SYSTEM STATE // BRIEF RECORDED
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', textTransform: 'uppercase', marginBottom: '16px' }}>
                THANK YOU, {formData.name || 'PARTNER'}.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--graphite)', lineHeight: 1.6, marginBottom: '24px' }}>
                Your problem map has been registered into our active intake queue. A partner from our studio will review your parameters and follow up within 48 business hours.
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                COORDINATION: {formData.email || 'hello@mosaicstate.studio'}
              </div>
            </div>
          )}
        </div>

        {/* Right: Dynamic Interactive Brief Architecture Map */}
        <div
          style={{
            border: '1px solid var(--line)',
            backgroundColor: 'var(--white)',
            padding: '36px',
            position: 'sticky',
            top: '96px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--system-blue)', marginBottom: '12px', letterSpacing: '0.06em' }}>
            REALTIME SYSTEM ARCHITECTURE MAP
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Nodes dynamically organize as you specify constraints.
          </div>

          <svg viewBox="0 0 100 85" style={{ width: '100%', height: 'auto', maxHeight: '360px', backgroundColor: 'var(--canvas)', border: '1px solid var(--line)' }}>
            {/* Step 1 Node: Org */}
            <circle cx="20" cy="20" r="8" fill={formData.organization ? 'var(--system-blue)' : '#DDD'} />
            <text x="20" y="21" fontSize="2.2" textAnchor="middle" fill={formData.organization ? '#FFF' : '#888'} fontFamily="Fragment Mono">
              ORG
            </text>

            {/* Step 2 Node: Problem */}
            <circle cx="50" cy="20" r="8" fill={formData.problem ? 'var(--signal-orange)' : '#DDD'} />
            <text x="50" y="21" fontSize="2.2" textAnchor="middle" fill={formData.problem ? '#FFF' : '#888'} fontFamily="Fragment Mono">
              PROBLEM
            </text>

            {/* Step 3 Node: Users */}
            <circle cx="80" cy="20" r="8" fill={formData.users ? 'var(--network-green)' : '#DDD'} />
            <text x="80" y="21" fontSize="2.2" textAnchor="middle" fill={formData.users ? '#FFF' : '#888'} fontFamily="Fragment Mono">
              USERS
            </text>

            {/* Inter-node lines */}
            <line x1="28" y1="20" x2="42" y2="20" stroke="var(--line)" strokeWidth="0.8" />
            <line x1="58" y1="20" x2="72" y2="20" stroke="var(--line)" strokeWidth="0.8" />

            {/* Step 6 Node: Solution Hub */}
            <line x1="50" y1="28" x2="50" y2="48" stroke="var(--line)" strokeWidth="0.8" />
            <rect x="30" y="48" width="40" height="24" fill={formData.projectTypes.length > 0 ? 'var(--ink)' : '#EEE'} rx="2" />
            <text x="50" y="58" fontSize="2.6" textAnchor="middle" fill={formData.projectTypes.length > 0 ? '#FFF' : '#999'} fontFamily="Fragment Mono" fontWeight="bold">
              SYSTEM
            </text>
            <text x="50" y="64" fontSize="2" textAnchor="middle" fill={formData.projectTypes.length > 0 ? 'var(--system-blue)' : '#AAA'} fontFamily="Fragment Mono">
              {formData.projectTypes[0] || 'CONFIGURING'}
            </text>
          </svg>

          {/* Quick Realtime Summary */}
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              SUMMARY LEDGER:
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)', marginTop: '6px' }}>
              • ORG: {formData.organization || 'Awaiting entry'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)' }}>
              • TYPES: {formData.projectTypes.join(', ') || 'Selecting'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink)' }}>
              • HORIZON: {formData.timeline || 'Not specified'}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
