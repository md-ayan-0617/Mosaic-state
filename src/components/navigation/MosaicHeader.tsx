import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';
import { FullscreenMenu } from './FullscreenMenu';

const NAV_LINKS = [
  { label: 'WORK', to: '/work' },
  { label: 'CAPABILITIES', to: '/capabilities' },
  { label: 'PLATFORMS', to: '/platforms' },
  { label: 'EXHIBITS', to: '/exhibits' },
  { label: 'STUDIO', to: '/studio' },
];

export const MosaicHeader: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, currentStateLabel, setCursorMode } = useAppState();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isDark = location.pathname.startsWith('/playground') || 
                 (location.pathname.startsWith('/work/'));

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          zIndex: 9990,
          backgroundColor: scrolled || isMenuOpen
            ? (isDark ? 'var(--night)' : 'var(--canvas)')
            : (isHome && !scrolled ? 'transparent' : (isDark ? 'var(--night)' : 'var(--canvas)')),
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 64px)',
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Left: Wordmark + Context State */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <Link
            to="/"
            onMouseEnter={() => setCursorMode('DEFAULT')}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: isDark ? 'var(--night-text)' : 'var(--ink)',
              lineHeight: 1,
              textDecoration: 'none',
            }}
            aria-label="MOSAIC/STATE Home"
          >
            MOSAIC/STATE
          </Link>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--system-blue)',
              letterSpacing: '0.04em',
            }}
          >
            {currentStateLabel}
          </span>
        </div>

        {/* Center: Navigation Links — Desktop only */}
        <nav
          aria-label="Primary navigation"
          style={{
            display: 'flex',
            gap: 'clamp(20px, 3vw, 48px)',
            alignItems: 'center',
          }}
          className="header-nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.06em',
                color: location.pathname.startsWith(link.to)
                  ? 'var(--system-blue)'
                  : isDark ? 'var(--night-text)' : 'var(--text-secondary)',
                textDecoration: 'none',
                paddingBottom: '2px',
                borderBottom: location.pathname.startsWith(link.to)
                  ? '1px solid var(--system-blue)'
                  : '1px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!location.pathname.startsWith(link.to)) {
                  (e.target as HTMLElement).style.color = isDark ? '#fff' : 'var(--ink)';
                }
              }}
              onMouseLeave={(e) => {
                if (!location.pathname.startsWith(link.to)) {
                  (e.target as HTMLElement).style.color = isDark ? 'var(--night-text)' : 'var(--text-secondary)';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Insights + Start + Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link
            to="/insights"
            className="header-insights-link"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: isDark ? 'var(--night-text)' : 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            INSIGHTS
          </Link>
          <Link
            to="/start"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'var(--white)',
              background: 'var(--system-blue)',
              padding: '8px 14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={() => setCursorMode('BEGIN')}
            onMouseLeave={() => setCursorMode('DEFAULT')}
          >
            START PROJECT ↗
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              color: isDark ? 'var(--night-text)' : 'var(--ink)',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'currentColor',
                transform: isMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                transition: 'transform 0.3s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'currentColor',
                opacity: isMenuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'currentColor',
                transform: isMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                transition: 'transform 0.3s ease',
              }}
            />
          </button>
        </div>
      </header>

      <FullscreenMenu />

      <style>{`
        @media (max-width: 900px) {
          .header-nav-desktop { display: none !important; }
          .header-insights-link { display: none !important; }
        }
      `}</style>
    </>
  );
};
