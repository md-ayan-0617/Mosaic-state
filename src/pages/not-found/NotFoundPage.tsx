import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/StateContext';

export const NotFoundPage: React.FC = () => {
  const { setCursorMode } = useAppState();
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  return (
    <main
      id="main-content"
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        backgroundColor: 'var(--canvas)',
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px clamp(20px, 4vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="404: State Not Found"
    >
      <div style={{ maxWidth: '960px', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: isReconnecting ? 'var(--network-green)' : 'var(--deep-red)',
            marginBottom: '24px',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isReconnecting ? 'var(--network-green)' : 'var(--deep-red)' }} />
          NODE_404 // STATUS: {isReconnecting ? 'TOPOLOGY RE-LINKED (OK)' : 'DISCONNECTED FROM TOPOLOGY'}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-mega)',
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          STATE<br />NOT<br />FOUND.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-large)',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            lineHeight: 1.55,
            marginBottom: '48px',
          }}
        >
          The coordinate or state identifier you requested does not exist in the active graph. Hover to re-bind the disconnected node to our origin network.
        </p>

        <div>
          <Link
            to="/"
            className="btn-primary"
            onMouseEnter={() => {
              setIsReconnecting(true);
              setCursorMode('BEGIN');
            }}
            onMouseLeave={() => {
              setIsReconnecting(false);
              setCursorMode('DEFAULT');
            }}
            style={{
              backgroundColor: isReconnecting ? 'var(--network-green)' : 'var(--ink)',
              borderColor: isReconnecting ? 'var(--network-green)' : 'var(--ink)',
              color: '#FFF',
              transition: 'all 0.3s ease',
            }}
          >
            RECONNECT TO SYSTEM ORIGIN →
          </Link>
        </div>
      </div>

      {/* Disconnected Node Visual Network */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '20%',
          width: '450px',
          height: '450px',
          zIndex: 1,
          opacity: 0.85,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          {/* Main cluster */}
          <circle cx="35" cy="35" r="3" fill="var(--ink)" />
          <circle cx="20" cy="55" r="3" fill="var(--ink)" />
          <circle cx="45" cy="65" r="3" fill="var(--ink)" />
          <line x1="35" y1="35" x2="20" y2="55" stroke="var(--line)" strokeWidth="0.8" />
          <line x1="20" y1="55" x2="45" y2="65" stroke="var(--line)" strokeWidth="0.8" />
          <line x1="45" y1="65" x2="35" y2="35" stroke="var(--line)" strokeWidth="0.8" />

          {/* Disconnected 404 Node */}
          <line
            x1="45"
            y1="65"
            x2="80"
            y2="30"
            stroke={isReconnecting ? 'var(--network-green)' : 'var(--deep-red)'}
            strokeWidth={isReconnecting ? '1.5' : '0.5'}
            strokeDasharray={isReconnecting ? 'none' : '2,2'}
            style={{ transition: 'all 0.4s ease' }}
          />
          <circle
            cx="80"
            cy="30"
            r={isReconnecting ? '6' : '4.5'}
            fill={isReconnecting ? 'var(--network-green)' : 'var(--deep-red)'}
            style={{ transition: 'all 0.4s ease' }}
          />
          <text x="80" y="22" fontSize="3" textAnchor="middle" fill={isReconnecting ? 'var(--network-green)' : 'var(--deep-red)'} fontFamily="Fragment Mono">
            NODE_404
          </text>
        </svg>
      </div>
    </main>
  );
};
