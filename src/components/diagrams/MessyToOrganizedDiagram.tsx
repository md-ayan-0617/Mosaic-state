import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NodeDef {
  id: string;
  name: string;
  tier: number; // 0, 1, 2, 3
  // Chaotic coordinates
  cx: number;
  cy: number;
  // Clean structured coordinates
  tx: number;
  ty: number;
}

interface EdgeDef {
  source: string;
  target: string;
  // Control points for chaotic bezier
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
}

const NODES: NodeDef[] = [
  // Tier 0 - Ingestion
  { id: 'n01', name: 'GTFS_FEED_01', tier: 0, cx: 310, cy: 390, tx: 110, ty: 100 },
  { id: 'n02', name: 'TELEMETRY_RT', tier: 0, cx: 580, cy: 90, tx: 110, ty: 170 },
  { id: 'n03', name: 'RAW_IIIF_TIFF', tier: 0, cx: 220, cy: 440, tx: 110, ty: 240 },
  { id: 'n04', name: 'SCADA_PACKET', tier: 0, cx: 720, cy: 370, tx: 110, ty: 310 },
  { id: 'n05', name: 'CAD_STEP_BLOB', tier: 0, cx: 160, cy: 120, tx: 110, ty: 380 },
  { id: 'n06', name: 'DEM_ELEVATION', tier: 0, cx: 480, cy: 460, tx: 110, ty: 450 },

  // Tier 1 - Normalization
  { id: 'n07', name: 'TOPOLOGY_SYNC', tier: 1, cx: 140, cy: 280, tx: 370, ty: 100 },
  { id: 'n08', name: 'GEOJSON_PIPE', tier: 1, cx: 810, cy: 140, tx: 370, ty: 170 },
  { id: 'n09', name: 'VECTOR_EMBED', tier: 1, cx: 390, cy: 80, tx: 370, ty: 240 },
  { id: 'n10', name: 'KAFKA_DOWNSAMPLER', tier: 1, cx: 270, cy: 200, tx: 370, ty: 310 },
  { id: 'n11', name: 'WASM_SOLVER', tier: 1, cx: 640, cy: 290, tx: 370, ty: 380 },
  { id: 'n12', name: 'CONTOUR_GEN', tier: 1, cx: 850, cy: 410, tx: 370, ty: 450 },

  // Tier 2 - Distributed State
  { id: 'n13', name: 'SPATIAL_INDEX', tier: 2, cx: 190, cy: 340, tx: 630, ty: 100 },
  { id: 'n14', name: 'ROUTING_GRAPH', tier: 2, cx: 770, cy: 240, tx: 630, ty: 170 },
  { id: 'n15', name: 'QUADTREE_MESH', tier: 2, cx: 430, cy: 270, tx: 630, ty: 240 },
  { id: 'n16', name: 'STATE_MACHINE', tier: 2, cx: 520, cy: 360, tx: 630, ty: 310 },
  { id: 'n17', name: 'BOM_VALIDATOR', tier: 2, cx: 330, cy: 160, tx: 630, ty: 380 },
  { id: 'n18', name: 'LORAWAN_HUB', tier: 2, cx: 690, cy: 460, tx: 630, ty: 450 },

  // Tier 3 - Runtime Client
  { id: 'n19', name: 'SPA_DISPATCH', tier: 3, cx: 460, cy: 180, tx: 890, ty: 100 },
  { id: 'n20', name: 'WEBGL_VIEWPORT', tier: 3, cx: 280, cy: 310, tx: 890, ty: 170 },
  { id: 'n21', name: 'TOUCH_TABLE_8K', tier: 3, cx: 610, cy: 220, tx: 890, ty: 240 },
  { id: 'n22', name: 'OFFLINE_STORE', tier: 3, cx: 830, cy: 320, tx: 890, ty: 310 },
  { id: 'n23', name: 'ERP_REST_GW', tier: 3, cx: 540, cy: 420, tx: 890, ty: 380 },
  { id: 'n24', name: 'KIOSK_TELEMETRY', tier: 3, cx: 210, cy: 230, tx: 890, ty: 450 },
];

const EDGES: EdgeDef[] = [
  { source: 'n01', target: 'n07', c1x: 200, c1y: 450, c2x: 100, c2y: 200 },
  { source: 'n02', target: 'n08', c1x: 700, c1y: 80, c2x: 900, c2y: 200 },
  { source: 'n03', target: 'n09', c1x: 150, c1y: 300, c2x: 450, c2y: 100 },
  { source: 'n04', target: 'n10', c1x: 500, c1y: 400, c2x: 200, c2y: 150 },
  { source: 'n05', target: 'n11', c1x: 300, c1y: 100, c2x: 500, c2y: 350 },
  { source: 'n06', target: 'n12', c1x: 600, c1y: 490, c2x: 750, c2y: 380 },
  { source: 'n07', target: 'n13', c1x: 250, c1y: 220, c2x: 120, c2y: 380 },
  { source: 'n08', target: 'n14', c1x: 720, c1y: 180, c2x: 820, c2y: 300 },
  { source: 'n09', target: 'n15', c1x: 410, c1y: 120, c2x: 490, c2y: 320 },
  { source: 'n10', target: 'n16', c1x: 350, c1y: 280, c2x: 600, c2y: 400 },
  { source: 'n11', target: 'n17', c1x: 580, c1y: 240, c2x: 380, c2y: 120 },
  { source: 'n12', target: 'n18', c1x: 780, c1y: 460, c2x: 650, c2y: 420 },
  { source: 'n13', target: 'n19', c1x: 300, c1y: 300, c2x: 400, c2y: 150 },
  { source: 'n14', target: 'n20', c1x: 820, c1y: 200, c2x: 320, c2y: 350 },
  { source: 'n15', target: 'n21', c1x: 500, c1y: 220, c2x: 650, c2y: 250 },
  { source: 'n16', target: 'n22', c1x: 600, c1y: 380, c2x: 780, c2y: 280 },
  { source: 'n17', target: 'n23', c1x: 400, c1y: 200, c2x: 580, c2y: 480 },
  { source: 'n18', target: 'n24', c1x: 650, c1y: 410, c2x: 250, c2y: 300 },
  { source: 'n07', target: 'n14', c1x: 320, c1y: 180, c2x: 500, c2y: 200 },
  { source: 'n10', target: 'n15', c1x: 380, c1y: 240, c2x: 420, c2y: 220 },
];

const TIER_HEADERS = [
  '01. INGESTION GATEWAY',
  '02. NORMALIZATION PIPELINE',
  '03. DISTRIBUTED STATE MESH',
  '04. RUNTIME CLIENT ENDPOINTS',
];

interface Props {
  accentColor: string;
  projectTitle: string;
}

export const MessyToOrganizedDiagram = ({ accentColor, projectTitle }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const proxy = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=160%',
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        proxy.val = self.progress;
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const p = progress; // 0 = messy chaos, 1 = clean structured hierarchy
  const entropy = Math.round((1 - p) * 100);
  const alignedCount = Math.min(24, Math.round(p * 24));

  // Node position calculation via linear interpolation between (cx, cy) and (tx, ty)
  const getNodePos = (node: NodeDef) => {
    return {
      x: node.cx + (node.tx - node.cx) * p,
      y: node.cy + (node.ty - node.cy) * p,
    };
  };

  const nodePosMap = new Map<string, { x: number; y: number }>();
  NODES.forEach((n) => {
    nodePosMap.set(n.id, getNodePos(n));
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--canvas)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '32px clamp(20px, 4vw, 64px)',
      }}
      aria-label="Interactive Complexity Transformation Diagram"
    >
      {/* Top telemetry bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: p > 0.85 ? 'var(--network-green)' : accentColor,
              borderRadius: '1px',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--ink)',
            }}
          >
            SYSTEM STATE: {p > 0.85 ? 'STRUCTURED WONDER (UNENTANGLED)' : p > 0.3 ? 'TOPOLOGY RESOLVING...' : 'HIGH ENTROPY / SILOED CHAOS'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
            ENTROPY:{' '}
            <span
              style={{
                color: entropy > 50 ? 'var(--signal-orange)' : 'var(--network-green)',
                fontWeight: 600,
              }}
            >
              {entropy}%
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
            ROUTES ALIGNED:{' '}
            <span style={{ color: accentColor, fontWeight: 600 }}>
              {alignedCount}/24
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              SCROLL SCRUB:
            </span>
            <div
              style={{
                width: '100px',
                height: '4px',
                backgroundColor: 'var(--mist)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${p * 100}%`,
                  height: '100%',
                  backgroundColor: accentColor,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tier Column Headers (visible and fading in as structured) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '8px',
          opacity: Math.max(0.2, p),
          transition: 'opacity 0.2s ease',
        }}
      >
        {TIER_HEADERS.map((h, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.05em',
              color: p > 0.6 ? accentColor : 'var(--text-muted)',
              borderBottom: `1px solid ${p > 0.6 ? accentColor : 'var(--line)'}`,
              paddingBottom: '4px',
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* The Interactive SVG Canvas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '460px',
          backgroundColor: 'var(--paper)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--mist)" strokeWidth="0.5" strokeOpacity="0.6" />
            </pattern>
          </defs>

          {/* Alignment Grid Overlay */}
          <rect width="1000" height="500" fill="url(#gridPattern)" />

          {/* Tier Boundary Guidelines (reveal with progress) */}
          <g opacity={p * 0.7}>
            <line x1="240" y1="0" x2="240" y2="500" stroke={accentColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <line x1="500" y1="0" x2="500" y2="500" stroke={accentColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <line x1="760" y1="0" x2="760" y2="500" stroke={accentColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
          </g>

          {/* EDGES: morph from chaotic loops into clean orthogonal buses */}
          {EDGES.map((edge, i) => {
            const sPos = nodePosMap.get(edge.source);
            const tPos = nodePosMap.get(edge.target);
            if (!sPos || !tPos) return null;

            const isEdgeHighlighted =
              hoveredNodeId === edge.source || hoveredNodeId === edge.target;

            // In chaotic mode: cubic bezier through wild control points
            // In organized mode: orthogonal bezier or horizontal link
            const midX = sPos.x + (tPos.x - sPos.x) * 0.5;
            const tidyC1x = midX;
            const tidyC1y = sPos.y;
            const tidyC2x = midX;
            const tidyC2y = tPos.y;

            const currentC1x = edge.c1x + (tidyC1x - edge.c1x) * p;
            const currentC1y = edge.c1y + (tidyC1y - edge.c1y) * p;
            const currentC2x = edge.c2x + (tidyC2x - edge.c2x) * p;
            const currentC2y = edge.c2y + (tidyC2y - edge.c2y) * p;

            const pathD = `M ${sPos.x} ${sPos.y} C ${currentC1x} ${currentC1y}, ${currentC2x} ${currentC2y}, ${tPos.x} ${tPos.y}`;

            return (
              <g key={i}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={
                    isEdgeHighlighted
                      ? accentColor
                      : p > 0.7
                      ? 'var(--line)'
                      : 'rgba(23, 24, 22, 0.22)'
                  }
                  strokeWidth={isEdgeHighlighted ? 2.5 : p > 0.8 ? 1.5 : 1}
                  strokeDasharray={p < 0.3 ? '4,3' : 'none'}
                  style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                />
                {/* Moving telemetry pulse on organized edge */}
                {p > 0.5 && isEdgeHighlighted && (
                  <circle r="3" fill={accentColor}>
                    <animateMotion path={pathD} dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* NODES */}
          {NODES.map((node) => {
            const pos = nodePosMap.get(node.id);
            if (!pos) return null;
            const isHovered = hoveredNodeId === node.id;
            const tierColor =
              node.tier === 0
                ? '#2454FF'
                : node.tier === 1
                ? '#4FCE83'
                : node.tier === 2
                ? '#FF6037'
                : '#826CFF';

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Halo when hovered */}
                {isHovered && (
                  <circle
                    r="16"
                    fill={accentColor}
                    fillOpacity="0.15"
                    stroke={accentColor}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                )}

                {/* Node Shape: changes from messy tilted cross to clean aligned pill/square */}
                <rect
                  x="-6"
                  y="-6"
                  width="12"
                  height="12"
                  fill={isHovered ? accentColor : p > 0.7 ? tierColor : 'var(--ink)'}
                  stroke="var(--paper)"
                  strokeWidth="1.5"
                  rx={p > 0.6 ? 2 : 0}
                  transform={`rotate(${(1 - p) * (node.tier * 35 - 40)})`}
                />

                {/* Label (rendered with high legibility) */}
                <text
                  x="12"
                  y="4"
                  fontFamily="var(--font-mono)"
                  fontSize="9px"
                  fontWeight={isHovered ? 700 : 500}
                  fill={isHovered ? accentColor : p > 0.6 ? 'var(--ink)' : 'var(--text-secondary)'}
                  letterSpacing="0.04em"
                  pointerEvents="none"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating caption instructions */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--text-muted)',
            backgroundColor: 'rgba(247, 246, 241, 0.92)',
            padding: '4px 10px',
            border: '1px solid var(--line)',
            letterSpacing: '0.04em',
          }}
        >
          SCROLL DOWN TO DE-ENTANGLE ARCHITECTURE • HOVER NODES TO TRACE PACKETS
        </div>
      </div>

      {/* Narrative takeaway */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span>
          DESIGN IMPACT: Transformed {projectTitle}'s 22 uncoordinated silos into a 4-tier normalized reactive pipeline.
        </span>
        <button
          onClick={() => {
            const next = p > 0.5 ? 0 : 1;
            setProgress(next);
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            padding: '4px 10px',
            backgroundColor: 'var(--paper)',
            border: `1px solid ${accentColor}`,
            color: accentColor,
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          TOGGLE STATE ({p > 0.5 ? 'VIEW RAW CHAOS' : 'VIEW STRUCTURE'})
        </button>
      </div>
    </div>
  );
};
