import React, { useEffect, useState, useRef } from 'react';
import { useAppState } from '../../context/StateContext';

interface NodePoint {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export const Preloader: React.FC = () => {
  const { isPreloaded, setIsPreloaded } = useAppState();
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState('INITIALIZING TOPOLOGY');
  const [isExpanding, setIsExpanding] = useState(false);
  const [isDone, setIsDone] = useState(isPreloaded);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 12 nodes that initially scatter then converge toward an M/S glyph shape
  const nodesRef = useRef<NodePoint[]>([
    // 'M' column 1
    { id: '01', x: 20, y: 80, targetX: 35, targetY: 70 },
    { id: '02', x: 25, y: 30, targetX: 35, targetY: 50 },
    { id: '03', x: 30, y: 15, targetX: 35, targetY: 30 },
    // 'M' diagonal apex
    { id: '04', x: 45, y: 20, targetX: 43, targetY: 45 },
    // 'M' column 2
    { id: '05', x: 55, y: 15, targetX: 51, targetY: 30 },
    { id: '06', x: 60, y: 40, targetX: 51, targetY: 50 },
    { id: '07', x: 65, y: 85, targetX: 51, targetY: 70 },
    // '/' Slash
    { id: '08', x: 40, y: 75, targetX: 54, targetY: 75 },
    { id: '09', x: 60, y: 25, targetX: 58, targetY: 25 },
    // 'S' curves
    { id: '10', x: 80, y: 30, targetX: 68, targetY: 32 },
    { id: '11', x: 75, y: 55, targetX: 65, targetY: 50 },
    { id: '12', x: 85, y: 80, targetX: 68, targetY: 68 },
  ]);

  useEffect(() => {
    if (isPreloaded) {
      setIsDone(true);
      return;
    }

    let currentP = 0;
    const interval = setInterval(() => {
      currentP += Math.floor(Math.random() * 8) + 3;
      if (currentP >= 100) {
        currentP = 100;
        clearInterval(interval);
        setStatus('READY');
        setTimeout(() => {
          setIsExpanding(true);
          setTimeout(() => {
            setIsPreloaded(true);
            setIsDone(true);
          }, 650);
        }, 350);
      } else if (currentP > 70) {
        setStatus('SOLVING M/S RELATIONAL GEOMETRY');
      } else if (currentP > 35) {
        setStatus('BINDING DISPERSED NODES');
      }
      setPercent(currentP);
    }, 45);

    return () => clearInterval(interval);
  }, [isPreloaded, setIsPreloaded]);

  // Canvas animation rendering nodes and topological connecting lines
  useEffect(() => {
    if (isDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      const progress = percent / 100;
      const nodes = nodesRef.current;

      // Draw grid lines background in canvas
      ctx.strokeStyle = '#DADBD3';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Compute current node positions with interpolation
      const currentNodes = nodes.map((node) => {
        let curX = node.x + (node.targetX - node.x) * progress;
        let curY = node.y + (node.targetY - node.y) * progress;

        if (isExpanding) {
          curX = curX + (curX - 50) * 2.5;
          curY = curY + (curY - 50) * 2.5;
        }

        const screenX = (curX / 100) * width;
        const screenY = (curY / 100) * height;
        return { ...node, screenX, screenY };
      });

      // Draw connecting lines between adjacent nodes
      ctx.strokeStyle = '#2454FF';
      ctx.lineWidth = 1;
      ctx.beginPath();

      // M connections
      ctx.moveTo(currentNodes[0].screenX, currentNodes[0].screenY);
      ctx.lineTo(currentNodes[1].screenX, currentNodes[1].screenY);
      ctx.lineTo(currentNodes[2].screenX, currentNodes[2].screenY);
      ctx.lineTo(currentNodes[3].screenX, currentNodes[3].screenY);
      ctx.lineTo(currentNodes[4].screenX, currentNodes[4].screenY);
      ctx.lineTo(currentNodes[5].screenX, currentNodes[5].screenY);
      ctx.lineTo(currentNodes[6].screenX, currentNodes[6].screenY);

      // Slash connection
      ctx.moveTo(currentNodes[7].screenX, currentNodes[7].screenY);
      ctx.lineTo(currentNodes[8].screenX, currentNodes[8].screenY);

      // S connection
      ctx.moveTo(currentNodes[9].screenX, currentNodes[9].screenY);
      ctx.lineTo(currentNodes[10].screenX, currentNodes[10].screenY);
      ctx.lineTo(currentNodes[11].screenX, currentNodes[11].screenY);
      ctx.stroke();

      // Draw nodes and ID labels
      currentNodes.forEach((node) => {
        // Outer ring
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#171816';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner blue dot
        ctx.fillStyle = '#2454FF';
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, 2, 0, Math.PI * 2);
        ctx.fill();

        // ID Label
        ctx.fillStyle = '#30312F';
        ctx.font = '10px "Fragment Mono", monospace';
        ctx.fillText(`ID_${node.id}`, node.screenX + 8, node.screenY - 8);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isDone, percent, isExpanding]);

  if (isDone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999990,
        backgroundColor: 'var(--canvas)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px clamp(20px, 4vw, 64px)',
        opacity: isExpanding ? 0 : 1,
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isExpanding ? 'none' : 'all',
      }}
      aria-live="polite"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Top Header Information */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 2,
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em', fontWeight: 600 }}>
            MOSAIC/STATE
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            INTERACTIVE SYSTEMS / DIGITAL EXPERIENCES
          </div>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <div>LAT: 59.3293° N // LON: 18.0686° E</div>
          <div style={{ color: 'var(--system-blue)' }}>STATE: {status}</div>
        </div>
      </div>

      {/* Bottom Telemetry Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 2,
          borderTop: '1px solid var(--line)',
          paddingTop: '16px',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            SYSTEM TOPOLOGY INITIALIZATION
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 0.9 }}>
            {percent.toString().padStart(3, '0')}%
          </div>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          <span>NODE CLUSTER: </span>
          <span style={{ color: 'var(--system-blue)', fontWeight: 600 }}>12 BOUND</span>
        </div>
      </div>
    </div>
  );
};
