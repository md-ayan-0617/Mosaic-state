import type { InsightArticle } from '../types';

export const INSIGHTS: InsightArticle[] = [
  {
    slug: 'designing-maps-for-people-who-dont-think-in-maps',
    id: 'art-01',
    title: "DESIGNING MAPS FOR PEOPLE WHO DON'T THINK IN MAPS",
    category: 'MAPPING & CARTOGRAPHY',
    date: 'SEPTEMBER 2026',
    readTime: '6 MIN READ',
    excerpt: 'Cartography on screens often mistakes spatial fidelity for human usefulness. Here is why route hierarchy, contextual pruning, and legible landmarks outperform satellite realism.',
    leadParagraph: 'A map is never neutral. It is an intentional distillation of spatial reality designed to answer one question: "Where am I in relation to where I need to be?" When digital designers dump raw GIS vector tiles into a viewport without typographic hierarchy, cognitive paralysis ensues.',
    bodySections: [
      {
        heading: '01. The Illusion of Infinite Detail',
        paragraphs: [
          'The biggest mistake in web cartography is displaying every road, creek, and building contour at uniform visual weight simply because the vector tile database contains them. In high-stress navigational environments—such as a commuter rushing between subway platforms—the eye processes only 3 to 4 hierarchy levels simultaneously.',
          'By deliberately suppressing secondary residential alleys until zoom level 15, and emphasizing transfer stations with bold topological geometries rather than geographic bends, the cognitive burden drops drastically.',
        ],
        diagramLabel: 'FIGURE 01: GEOGRAPHIC FIDELITY VS. TOPOLOGICAL CLARITY',
      },
      {
        heading: '02. Landmark Anchoring vs. Coordinate Grids',
        paragraphs: [
          'Pedestrians orient themselves through physical memory: the clock tower, the public plaza, the river bend. A digital map that treats a monument with the same visual emphasis as an electrical substation fails human intuition.',
          'In our METRO/01 and FIELD GUIDE systems, we introduced typographic anchors that scale independently of zoom factors, giving users consistent mental bearings across all interaction states.',
        ],
        quote: 'A good map removes 90% of geography so the remaining 10% can guide human action.',
      },
      {
        heading: '03. Touch and Desktop Gestural Ergonomics',
        paragraphs: [
          'Scroll-jacking is the enemy of mapping UX. If a user scrolls a case study or article and inadvertently gets trapped inside a pan-and-zoom map canvas, trust is broken immediately. Maps must require deliberate activation states before capturing pointer scroll events.',
        ],
      },
    ],
    references: [
      { title: 'Semiology of Graphics: Diagrams, Networks, Maps', source: 'Jacques Bertin', year: '1967' },
      { title: 'The Visual Display of Quantitative Information', source: 'Edward Tufte', year: '1983' },
      { title: 'How Maps Work: Representation, Visualization, and Design', source: 'Alan M. MacEachren', year: '1995' },
    ],
  },
  {
    slug: 'when-should-a-website-become-a-platform',
    id: 'art-02',
    title: 'WHEN SHOULD A WEBSITE BECOME A PLATFORM?',
    category: 'PLATFORMS & SYSTEMS',
    date: 'AUGUST 2026',
    readTime: '8 MIN READ',
    excerpt: 'The line between editorial presentation and software system is breached the moment users expect state persistence, role permissions, and bidirectional transaction.',
    leadParagraph: 'Many enterprise organizations commission a "website redesign" when what their business actually demands is a digital operational platform. Conflating the two results in bloated marketing sites that fail as tools or brittle portals that fail to inspire.',
    bodySections: [
      {
        heading: '01. The Boundary Line of Statefulness',
        paragraphs: [
          'A marketing website is fundamentally a broadcast medium: identical content presented to an anonymous reader. A platform, by contrast, is a state machine. It remembers configuration history, integrates live inventory, recalculates engineering tolerances, and negotiates transactional boundaries.',
          'When we built FORGE for Vanguard Automation, the initial brief was for a product showcase. Within two weeks of technical discovery, we revealed that dealers were spending 6 weeks manually re-keying quote spreadsheets. Transforming the product viewer into a parametric ERP-connected configurator saved 4,000 engineering hours annually.',
        ],
      },
      {
        heading: '02. Architecture Follows Organizational Truth',
        paragraphs: [
          'If your internal teams cannot update prices without a software engineer deploying a build, you have neither an effective platform nor a clean website. Separating UI rendering from business logic via decoupled headless APIs is mandatory for systems intended to survive 5+ years.',
        ],
        quote: 'Websites inform. Platforms empower. Do not confuse the front door with the factory floor.',
      },
    ],
    references: [
      { title: 'Designing Data-Intensive Applications', source: 'Martin Kleppmann', year: '2017' },
      { title: 'Domain-Driven Design: Tackling Complexity in the Heart of Software', source: 'Eric Evans', year: '2003' },
    ],
  },
  {
    slug: 'threejs-is-not-the-answer-to-every-3d-problem',
    id: 'art-03',
    title: 'THREE.JS IS NOT THE ANSWER TO EVERY 3D PROBLEM',
    category: 'WEBGL & IMMERSIVE',
    date: 'JULY 2026',
    readTime: '5 MIN READ',
    excerpt: 'The web design industry is plagued by heavy 3D canvases that consume 80% GPU load to render a spinning cube. Mature engineering chooses rendering technologies with restraint.',
    leadParagraph: 'WebGL is an extraordinary capability of the modern browser, but it is frequently wielded as a hammer looking for nails. When a simple SVG path or 2D Canvas can communicate a concept with 1/50th of the memory footprint and instant accessibility tree hydration, booting an entire WebGL context is technical negligence.',
    bodySections: [
      {
        heading: '01. Rendering Boundaries: DOM, SVG, Canvas, WebGL',
        paragraphs: [
          'Our studio enforces a strict rendering rule: DOM for semantic readable content; SVG for precision diagrams, vectors, and interactive line charts; Canvas 2D for dense particle visualizations and raster image manipulation; WebGL exclusively for true 3D spatial models, interactive volumes, and custom vertex shaders.',
          'Adhering to this boundary keeps our sites loading in under 1.2 seconds on mobile cellular connections while ensuring battery life is preserved.',
        ],
        diagramLabel: 'FIGURE 02: BROWSER RENDERING PIPELINE ALLOCATION MATRIX',
      },
    ],
    references: [
      { title: 'WebGL Insights', source: 'Patrick Cozzi', year: '2015' },
      { title: 'Real-Time Rendering, 4th Edition', source: 'Akenine-Möller et al.', year: '2018' },
    ],
  },
  {
    slug: 'what-museum-interactives-teach-us-about-web-ux',
    id: 'art-04',
    title: 'WHAT MUSEUM INTERACTIVES TEACH US ABOUT WEB UX',
    category: 'EXHIBITS & SPATIAL',
    date: 'JUNE 2026',
    readTime: '7 MIN READ',
    excerpt: 'In physical exhibition galleries, users walk away in 4 seconds if an interface is confusing. Museum interactives enforce the ultimate test of intuitive design.',
    leadParagraph: 'On the open web, visitors will tolerate modest UX friction because they are sitting in a chair with a keyboard. In a public museum gallery, visitors are on their feet, surrounded by distractions, with zero interest in reading onboarding tutorials. If the first physical touch does not yield delightful comprehension, they walk away.',
    bodySections: [
      {
        heading: '01. The Attract Loop: Communicating Affordance from 10 Meters',
        paragraphs: [
          'Every physical exhibit must have an Attract State: an ambient, gentle visual motion that signals "this is alive, this is responsive, and this wants your touch." When we translate this principle to the web, we replace aggressive popups with subtle kinetic affordances that reward user curiosity without shouting.',
        ],
      },
      {
        heading: '02. Zero-Instruction Ergonomics',
        paragraphs: [
          'If an interface requires a "How to Use" tooltip, the design has failed. Museum touch tables must accommodate both a 7-year-old child and a 75-year-old researcher within the same interaction canvas.',
        ],
        quote: 'Physical galleries teach you humility: you cannot blame the visitor for misunderstanding your interface.',
      },
    ],
    references: [
      { title: 'Designing for the Museum Experience', source: 'Nina Simon', year: '2010' },
      { title: 'The Design of Everyday Things', source: 'Don Norman', year: '2013' },
    ],
  },
  {
    slug: 'designing-for-live-data',
    id: 'art-05',
    title: 'DESIGNING FOR LIVE DATA',
    category: 'DATA & SYSTEMS',
    date: 'MAY 2026',
    readTime: '6 MIN READ',
    excerpt: 'Static dashboards tell yesterday’s story. Live telemetry demands visual rhythm, stable axis transitions, and clear delta indicators that do not induce vertigo.',
    leadParagraph: 'When streaming telemetry updates hundreds of times per second, the primary design challenge is not receiving the packets—it is preventing visual flicker. Human visual perception requires stability to detect trends.',
    bodySections: [
      {
        heading: '01. Temporal Buffering and Micro-Interpolations',
        paragraphs: [
          'Directly binding raw incoming WebSocket values to DOM state creates jarring UI jitters. By applying exponential moving average smoothing in Web Workers before flushing to Canvas or SVG, data pulses feel organic and legible.',
        ],
      },
    ],
    references: [
      { title: 'Envisioning Information', source: 'Edward Tufte', year: '1990' },
    ],
  },
  {
    slug: 'why-information-architecture-still-matters',
    id: 'art-06',
    title: 'WHY INFORMATION ARCHITECTURE STILL MATTERS',
    category: 'SYSTEMS & UX',
    date: 'APRIL 2026',
    readTime: '9 MIN READ',
    excerpt: 'In an era of AI chat and infinite feeds, structured information architecture remains the invisible spine of digital comprehension.',
    leadParagraph: 'Search bars and chatbots cannot replace well-conceived information architecture because users cannot search for concepts they do not yet know exist. Categorization is pedagogy.',
    bodySections: [
      {
        heading: '01. The Hierarchy of Understanding',
        paragraphs: [
          'A system that does not expose its conceptual boundaries leaves users disoriented. By constructing clear spatial maps, faceted taxonomy matrices, and explicit relational states, we transform amorphous data into an empowering landscape for exploration.',
        ],
      },
    ],
    references: [
      { title: 'Information Architecture for the Web and Beyond', source: 'Rosenfeld & Morville', year: '2015' },
    ],
  },
];
