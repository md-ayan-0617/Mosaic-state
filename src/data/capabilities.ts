import type { CapabilityItem } from '../types';

export const CAPABILITY_ROWS = [
  'WEB',
  'PLATFORMS',
  'IMMERSIVE',
  'DATA',
  'EXHIBITS',
  'AI SYSTEMS'
] as const;

export const CAPABILITY_COLUMNS = [
  'STRATEGY',
  'UX',
  'DESIGN',
  'BUILD',
  'OPERATE'
] as const;

export const MATRIX_CELLS: Record<string, Record<string, string>> = {
  WEB: {
    STRATEGY: 'Digital ecosystem positioning, content hierarchy, stakeholder roadmap alignment.',
    UX: 'Complex journey mapping, non-linear navigation architecture, accessibility modeling.',
    DESIGN: 'Modular design systems, Swiss typographic grids, responsive microinteractions.',
    BUILD: 'React 19, TypeScript, static/hybrid architectures, zero-bloat state management.',
    OPERATE: 'Continuous CI/CD, headless CMS maintenance, edge caching, analytics audits.',
  },
  PLATFORMS: {
    STRATEGY: 'Legacy system de-siloing, API boundary design, multi-tenant governance.',
    UX: 'Deep workflow reduction, task-oriented navigation, high-throughput operator UX.',
    DESIGN: 'Dense data ergonomics, configurable dashboards, enterprise status systems.',
    BUILD: 'Custom WebSockets, state machines, micro-frontends, robust backend integration.',
    OPERATE: 'High-availability monitoring, SLA management, distributed bug observability.',
  },
  IMMERSIVE: {
    STRATEGY: 'Spatial storytelling evaluation, WebGL capability assessment, ROI qualification.',
    UX: '3D navigation ergonomics, camera choreography, fallback modes for low-power devices.',
    DESIGN: 'Stylized spatial modeling, lighting hierarchies, architectural digital models.',
    BUILD: 'Three.js, WebGL shaders, glTF optimization, WebAssembly geometry crunching.',
    OPERATE: 'Asset CDN delivery, GPU memory leak profiling, multi-browser fallback checks.',
  },
  DATA: {
    STRATEGY: 'Information architecture, metric relevance auditing, clear question definition.',
    UX: 'Comparative analysis flows, drill-down interactions, multi-layer query design.',
    DESIGN: 'D3/SVG custom topologies, high-contrast cartography, clear scalar legends.',
    BUILD: 'Canvas API renderers, vector tile parsing, live stream brokers, Web Workers.',
    OPERATE: 'Real-time telemetry integrity, query performance indexing, data freshness checks.',
  },
  EXHIBITS: {
    STRATEGY: 'Spatial visitor journey, dwell-time analysis, multi-user crowd dynamics.',
    UX: 'Zero-instruction affordances, instant touch feedback, multi-touch ergonomics.',
    DESIGN: 'Room-scale typography, ambient attract-loops, physical enclosure harmony.',
    BUILD: 'Kiosk OS lockdown, local offline caching, serial port/hardware communication.',
    OPERATE: 'Remote kiosk fleet management, thermal throttling defenses, watchdog auto-restart.',
  },
  'AI SYSTEMS': {
    STRATEGY: 'Pragmatic utility qualification, deterministic fallback rules, ethical boundary audit.',
    UX: 'Transparent agent state indicators, steerable interfaces, explainable provenance.',
    DESIGN: 'Human-in-the-loop control surfaces, diff views, contextual guidance overlays.',
    BUILD: 'Streaming token renderers, semantic vector search, localized LLM pipelines.',
    OPERATE: 'Model drift auditing, latency guardrails, context window cache optimization.',
  },
};

export const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'DISCOVERY & ARCHITECTURE',
    slug: 'discovery',
    summary: 'We diagnose the underlying relationships before drawing a single screen. We interrogate organizational silos, API dependencies, and actual user mental models.',
    deliverables: ['System Map & Dependency Audit', 'User Journey Architecture', 'Data Model & Technical Scoping', 'Interactive Prototype Specs'],
    matrixIntersections: MATRIX_CELLS['WEB'],
    technologies: ['Systems Thinking', 'Graph Analysis', 'Stakeholder Workshops', 'Information Architecture'],
    caseStudySlugs: ['metro-01', 'nexus'],
  },
  {
    number: '02',
    title: 'UX & SYSTEM NAVIGATION',
    slug: 'ux',
    summary: 'Complex systems fail when they force users to think like engineers. We design information architectures where the most intricate tasks feel natural.',
    deliverables: ['Modular Wireframes', 'Interactive Flow Models', 'Accessibility Tree Specifications', 'Navigation Prototypes'],
    matrixIntersections: MATRIX_CELLS['PLATFORMS'],
    technologies: ['Figma', 'Framer', 'Keyboard Navigation ARIA', 'Cognitive Load Analysis'],
    caseStudySlugs: ['metro-01', 'field-guide', 'forge'],
  },
  {
    number: '03',
    title: 'DESIGN & VISUAL SYSTEMS',
    slug: 'design',
    summary: 'Rooted in Swiss editorial clarity and architectural rigor. We create dynamic design systems that convey authority, warmth, and relentless precision.',
    deliverables: ['Multi-State Design Tokens', 'Typographic Hierarchies', 'Component Libraries', 'Motion Guidelines'],
    matrixIntersections: MATRIX_CELLS['WEB'],
    technologies: ['CSS Custom Properties', 'Afacad Flux System', 'SVG Tooling', 'State-Driven Microinteractions'],
    caseStudySlugs: ['atlas', 'metro-01'],
  },
  {
    number: '04',
    title: 'FRONT-END & PLATFORM ENGINEERING',
    slug: 'web',
    summary: 'Clean, mature, zero-bloat web engineering. We leverage React 19, TypeScript, and modern browser APIs to deliver lightning-fast interactive software.',
    deliverables: ['Production Web Applications', 'Custom State Engines', 'Headless CMS Integration', 'Edge Caching Deployments'],
    matrixIntersections: MATRIX_CELLS['PLATFORMS'],
    technologies: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'Web Workers', 'Edge Compute'],
    caseStudySlugs: ['metro-01', 'current-grid', 'forge'],
  },
  {
    number: '05',
    title: 'IMMERSIVE & SPATIAL WEBGL',
    slug: 'immersive',
    summary: 'Not mindless 3D spectacle, but intentional spatial communication. We use WebGL and Three.js to construct architectural models, configurators, and information cities.',
    deliverables: ['WebGL Custom Canvases', 'Parametric 3D Configurators', 'Interactive Architectural Models', 'Lightweight Shader Pipelines'],
    matrixIntersections: MATRIX_CELLS['IMMERSIVE'],
    technologies: ['Three.js', 'GLTF/Draco Compression', 'Custom GLSL Shaders', 'WebXR', 'Canvas 2D Overlays'],
    caseStudySlugs: ['forge', 'atlas', 'nexus'],
  },
  {
    number: '06',
    title: 'DATA VISUALIZATION & CARTOGRAPHY',
    slug: 'data',
    summary: 'Every visualization must answer an explicit question. We transform dense sensor streams, geospatial routes, and relational networks into transparent logic.',
    deliverables: ['Custom Vector Maps', 'Real-Time Streaming Telemetry', 'Multi-Layer Cartography', 'Accessible Data Tables'],
    matrixIntersections: MATRIX_CELLS['DATA'],
    technologies: ['MapLibre GL', 'D3.js', 'Canvas API', 'GeoJSON', 'Vector Tiles', 'WebSockets'],
    caseStudySlugs: ['current-grid', 'field-guide', 'metro-01'],
  },
  {
    number: '07',
    title: 'ROOM-SCALE & EXHIBIT INTERACTIVES',
    slug: 'exhibits',
    summary: 'Digital design that lives inside physical museum galleries and visitor centres. Touch tables, multi-user video walls, and offline-capable installations.',
    deliverables: ['Multi-Touch Software', 'Interactive Video Walls', 'Hardware & Display Specs', 'Offline Watchdog Scripts'],
    matrixIntersections: MATRIX_CELLS['EXHIBITS'],
    technologies: ['Large-Format Touch Displays', 'Local Node.js Services', 'Serial Port Relays', 'IIIF Zoom'],
    caseStudySlugs: ['atlas', 'field-guide'],
  },
  {
    number: '08',
    title: 'AI SYSTEMS & WORKFLOW ENGINES',
    slug: 'ai',
    summary: 'Pragmatic, explainable AI interfaces that actually assist humans instead of generating hallucinations. Semantic search, knowledge discovery, and structured synthesis.',
    deliverables: ['Semantic Knowledge Graph Search', 'Contextual Co-Pilot Interfaces', 'Workflow Automation Integrations'],
    matrixIntersections: MATRIX_CELLS['AI SYSTEMS'],
    technologies: ['Vector Embeddings', 'Cosine Similarity', 'Streaming LLM Pipelines', 'Deterministic Fallbacks'],
    caseStudySlugs: ['atlas', 'nexus'],
  },
];
