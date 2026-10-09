import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppState } from '../../context/StateContext';

gsap.registerPlugin(ScrollTrigger);

interface PlatformModule {
  id: string;
  name: string;
  role: string;
  protocol: string;
  activeStatus: string;
}

const PLATFORM_NODES: PlatformModule[] = [
  { id: 'ERP', name: 'SAP S/4HANA ERP', role: 'Enterprise inventory balances, manufacturing cost centres, automated ledger reconciliation.', protocol: 'OData RFC / gRPC', activeStatus: 'SYNCED (12ms)' },
  { id: 'CRM', name: 'Salesforce Enterprise', role: 'Distributor tier verification, credit limits, account management, regional sales territories.', protocol: 'REST Webhooks', activeStatus: 'ACTIVE (40ms)' },
  { id: 'WMS', name: 'Automated Warehouse', role: 'Real-time bin locations, pick-and-pack routing, robotic palletizer queuing.', protocol: 'MQTT / AMQP', activeStatus: 'STREAMING' },
  { id: 'CPQ', name: 'Parametric Rules Engine', role: '12,000 mechanical configuration rules, tolerance matrix solver, custom Bill of Materials.', protocol: 'WebAssembly', activeStatus: '0.4ms LOCAL' },
  { id: 'PAY', name: 'Multi-Currency Clearing', role: 'SEPA B2B direct debits, letters of credit, escrow verification for cross-border freight.', protocol: 'ISO 20022 API', activeStatus: 'STANDBY' },
  { id: 'BI', name: 'Telemetry & Telematics', role: 'Machine running hours, predictive vibration diagnostics, warranty claim attribution.', protocol: 'Kafka Streaming', activeStatus: '1.2M PKTS/S' },
];

export const PlatformsPage = () => {
  const { setCursorMode } = useAppState();
  const [activeNode, setActiveNode] = useState<string>('ERP');
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const topologyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = topologyRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate platform lines drawing on scroll
      gsap.fromTo(
        '.platform-conn-line',
        { strokeDashoffset: 100, strokeDasharray: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
          },
        }
      );

      // Animate node entrance
      gsap.fromTo(
        '.platform-node-g',
        { scale: 0.6, opacity: 0, transformOrigin: 'center center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const selectedModule = PLATFORM_NODES.find((m) => m.id === activeNode) || PLATFORM_NODES[0];

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--graphite)',
        color: 'var(--white)',
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 130px) clamp(20px, 4vw, 64px) clamp(48px, 6vw, 90px)',
          borderBottom: '1px solid #444642',
        }}
        aria-label="Platforms: Beyond the marketing site"
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--network-green)',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          STATE_04 / SYSTEM PLATFORMS
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
            color: 'var(--white)',
          }}
        >
          BEYOND<br />THE<br />MARKETING<br />SITE.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-large)',
            color: 'var(--mist)',
            maxWidth: '680px',
            lineHeight: 1.55,
            marginTop: '36px',
          }}
        >
          We architect mission-critical platforms: dealer networks, multi-tenant portals, complex CPQ systems, and operational dispatch consoles. The website is sometimes only the front door.
        </p>

        {/* System Examples Ticker */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '40px',
          }}
        >
          {[
            'Dealer Portal',
            'Marketplace',
            'Member Platform',
            'Customer Portal',
            'B2B Ordering',
            'CPQ Engine',
            'Internal Tool',
            'Operations Dashboard',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '6px 14px',
                border: '1px solid #444642',
                color: 'var(--network-green)',
                backgroundColor: 'rgba(79, 206, 131, 0.05)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE SYSTEM ENGINE DIAGRAM ── */}
      <section
        style={{
          padding: 'clamp(50px, 7vw, 100px) clamp(20px, 4vw, 64px)',
          borderBottom: '1px solid #444642',
          backgroundColor: '#222321',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', letterSpacing: '0.06em', marginBottom: '8px' }}>
              INTERACTIVE TOPOLOGY / SYSTEM ENGINE
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 54px)', letterSpacing: '-0.03em', fontWeight: 700, textTransform: 'uppercase' }}>
              SYSTEMS THAT TALK TO OTHER SYSTEMS
            </h2>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            CLICK NODES TO INSPECT PROTOCOLS
          </div>
        </div>

        {/* Topology Console */}
        <div
          ref={topologyRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            border: '1px solid #444642',
            backgroundColor: 'var(--graphite)',
            overflow: 'hidden',
          }}
        >
          {/* Left: Dynamic SVG Graph */}
          <div style={{ padding: '32px', position: 'relative', borderRight: '1px solid #444642' }}>
            <svg
              viewBox="0 0 100 80"
              style={{ width: '100%', height: 'auto', maxHeight: '520px' }}
              aria-label="Interactive platform architecture diagram"
            >
              {/* Central Engine Node */}
              <circle cx="50" cy="40" r="14" fill="#1B1D1A" stroke="var(--network-green)" strokeWidth="1.2" />
              <text x="50" y="38" textAnchor="middle" fontFamily="Fragment Mono, monospace" fontSize="3.2" fill="var(--white)" fontWeight="bold">
                CORE PLATFORM
              </text>
              <text x="50" y="44" textAnchor="middle" fontFamily="Fragment Mono, monospace" fontSize="2.2" fill="var(--network-green)">
                EVENT BUS
              </text>

              {/* Surrounding Nodes & Lines */}
              {PLATFORM_NODES.map((node, i) => {
                const angle = (i / PLATFORM_NODES.length) * Math.PI * 2 - Math.PI / 2;
                const nx = 50 + Math.cos(angle) * 32;
                const ny = 40 + Math.sin(angle) * 26;
                const isSelected = activeNode === node.id;

                return (
                  <g
                    key={node.id}
                    className="platform-node-g"
                    onClick={() => setActiveNode(node.id)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setCursorMode('EXPAND')}
                    onMouseLeave={() => setCursorMode('DEFAULT')}
                  >
                    {/* Animated Data Line */}
                    <line
                      className="platform-conn-line"
                      x1="50"
                      y1="40"
                      x2={nx}
                      y2={ny}
                      stroke={isSelected ? 'var(--network-green)' : '#555852'}
                      strokeWidth={isSelected ? '1' : '0.5'}
                      strokeDasharray={isSelected ? '2,2' : 'none'}
                    />
                    {/* Node Circle */}
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isSelected ? 6.5 : 5.5}
                      fill={isSelected ? 'var(--network-green)' : '#1B1D1A'}
                      stroke={isSelected ? '#fff' : '#6E7169'}
                      strokeWidth="0.8"
                      style={{ transition: 'all 0.25s' }}
                    />
                    <text
                      x={nx}
                      y={ny + 1.2}
                      textAnchor="middle"
                      fontFamily="Fragment Mono, monospace"
                      fontSize="2.5"
                      fill={isSelected ? '#111310' : 'var(--white)'}
                      fontWeight="600"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right: Selected Node Telemetry Panel */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#1B1D1A' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--network-green)', padding: '3px 8px', border: '1px solid var(--network-green)' }}>
                  MODULE / {selectedModule.id}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E9188' }}>
                  {selectedModule.activeStatus}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '14px' }}>
                {selectedModule.name}
              </h3>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--mist)', lineHeight: 1.6, marginBottom: '24px' }}>
                {selectedModule.role}
              </p>

              <div style={{ borderTop: '1px solid #333630', paddingTop: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E9188', marginBottom: '4px' }}>
                  INTEGRATION PROTOCOL
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--network-green)' }}>
                  {selectedModule.protocol}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #333630', paddingTop: '20px', marginTop: '28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E9188', marginBottom: '8px' }}>
                ALL CONNECTED INTEGRATIONS
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {PLATFORM_NODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveNode(m.id)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      padding: '4px 10px',
                      background: activeNode === m.id ? 'var(--network-green)' : '#2B2C29',
                      color: activeNode === m.id ? '#111310' : '#DADBD3',
                      border: '1px solid #444642',
                      cursor: 'pointer',
                    }}
                  >
                    {m.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STORIES: 3 CHAPTERS ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', letterSpacing: '0.06em', marginBottom: '16px' }}>
          CASE ARCHITECTURES / 3 SYSTEMS
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 68px)', letterSpacing: '-0.035em', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '48px' }}>
          PLATFORM ARCHITECTURES
        </h2>

        {/* Chapter Tabs */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', borderBottom: '1px solid #444642', paddingBottom: '16px', flexWrap: 'wrap' }}>
          {[
            { id: 0, title: '01 / MARKETPLACE', desc: 'Buyer ↔ Seller Multi-Sided Network' },
            { id: 1, title: '02 / DEALER PORTAL', desc: 'Manufacturer ↔ Dealer ↔ Customer' },
            { id: 2, title: '03 / B2B ORDERING', desc: 'Catalog ↔ Inventory ↔ SAP ERP' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChapter(c.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                padding: '8px 16px',
                background: activeChapter === c.id ? 'var(--network-green)' : 'transparent',
                color: activeChapter === c.id ? '#111310' : 'var(--mist)',
                border: '1px solid',
                borderColor: activeChapter === c.id ? 'var(--network-green)' : '#444642',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div>{c.title}</div>
              <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>{c.desc}</div>
            </button>
          ))}
        </div>

        {/* Active Chapter Details */}
        {activeChapter === 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', marginBottom: '8px' }}>
                ARCHITECTURE CHAPTER 01
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', marginBottom: '20px' }}>
                MULTI-SIDED COMMERCE & ESCROW MARKETPLACE
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--mist)', lineHeight: 1.6, marginBottom: '20px' }}>
                Managing complex settlement flows where high-value industrial assets trade with milestone verification, digital inspection certificates, and integrated escrow holding accounts.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Real-time automated KYC & sanction screening for institutional buyers',
                  'Split-payout ledger engine with dynamic commission fee calculators',
                  'Cryptographic chain-of-custody logging for heavy capital machinery',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--network-green)' }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: '1px solid #444642', padding: '36px', backgroundColor: '#1B1D1A' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E9188', marginBottom: '16px' }}>DATA FLOW RELAY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { from: 'BUYER BROWSER', to: 'GRAPHQL EDGE', label: 'Signed Request' },
                  { from: 'GRAPHQL EDGE', to: 'ESCROW GATEWAY', label: 'Milestone Hold' },
                  { from: 'ESCROW GATEWAY', to: 'SELLER LEDGER', label: 'Verified Release' },
                  { from: 'LOGISTICS API', to: 'TRACKING BUS', label: 'GPS Geofence Ping' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #333630', paddingBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)' }}>{step.from}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--network-green)' }}>→ {step.label} →</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#DADBD3' }}>{step.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeChapter === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', marginBottom: '8px' }}>
                ARCHITECTURE CHAPTER 02
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', marginBottom: '20px' }}>
                DEALER COLLABORATION & QUOTE ENGINE
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--mist)', lineHeight: 1.6, marginBottom: '20px' }}>
                Bridging 320 global independent dealer hubs with direct factory production queues. Dealers configure assemblies locally, negotiate discounts with automated tier limits, and print client-ready technical dossiers.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Offline-first quotation canvas storing 10,000 spec sheets in IndexedDB',
                  'Instant margin calculators respecting multi-currency distributor bands',
                  'One-click CAD and STEP export bound directly to production serial queues',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--network-green)' }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: '1px solid #444642', padding: '36px', backgroundColor: '#1B1D1A' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E9188', marginBottom: '16px' }}>DEALER RELAY STACK</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { from: 'FACTORY CORE', to: 'DISTRIBUTOR HUB', label: 'BOM & Part Numbers' },
                  { from: 'DISTRIBUTOR HUB', to: 'FIELD REP UI', label: 'Discount Authority' },
                  { from: 'FIELD REP UI', to: 'CLIENT PORTAL', label: 'Instant Certified Spec' },
                  { from: 'CLIENT PORTAL', to: 'SAP PRODUCTION', label: 'Automated PO Lock' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #333630', paddingBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)' }}>{step.from}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--network-green)' }}>→ {step.label} →</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#DADBD3' }}>{step.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeChapter === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--network-green)', marginBottom: '8px' }}>
                ARCHITECTURE CHAPTER 03
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', marginBottom: '20px' }}>
                HIGH-THROUGHPUT B2B RE-ORDERING & WAREHOUSE DISPATCH
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--mist)', lineHeight: 1.6, marginBottom: '20px' }}>
                Sub-second bulk ordering interfaces designed for procurement officers ordering 2,000 SKUs via CSV ingestion, barcode optical scanner streaming, and direct EDI ERP conduits.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Keyboard-accelerated rapid SKU grid with autocomplete across 80,000 parts',
                  'Live inventory reservation locks preventing double-allocation in warehouses',
                  'Direct PunchOut cXML integration with Ariba, Coupa, and Oracle Procurement',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--network-green)' }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: '1px solid #444642', padding: '36px', backgroundColor: '#1B1D1A' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E9188', marginBottom: '16px' }}>PROCUREMENT PIPELINE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { from: 'PUNCHOUT CXML', to: 'INGEST GATEWAY', label: 'Cart Handshake' },
                  { from: 'INGEST GATEWAY', to: 'STOCK RESERVER', label: '10ms Bin Hold' },
                  { from: 'STOCK RESERVER', to: 'SAP S/4HANA', label: 'PO Creation' },
                  { from: 'SAP S/4HANA', to: 'WMS ROBOTICS', label: 'Automated Pick Queue' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #333630', paddingBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--white)' }}>{step.from}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--network-green)' }}>→ {step.label} →</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#DADBD3' }}>{step.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── CALL TO ACTION ── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 4vw, 64px)',
          borderTop: '1px solid #444642',
          backgroundColor: '#1B1D1A',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 0.95, textTransform: 'uppercase' }}>
            NEED AN ENGINE,<br />NOT JUST A SCREEN?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--mist)', marginTop: '16px', maxWidth: '500px' }}>
            Let us review your system architecture, data models, and workflow bottlenecks.
          </p>
        </div>
        <div>
          <Link
            to="/start"
            className="btn-primary"
            style={{ backgroundColor: 'var(--network-green)', borderColor: 'var(--network-green)', color: '#111310' }}
            onMouseEnter={() => setCursorMode('BEGIN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            START A PLATFORM BRIEF ↗
          </Link>
        </div>
      </section>
    </main>
  );
};
