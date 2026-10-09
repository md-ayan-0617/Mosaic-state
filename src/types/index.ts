export type ProjectCategory = 
  | 'WEBSITES'
  | 'PLATFORMS'
  | 'MAPS'
  | 'IMMERSIVE'
  | 'EXHIBITS'
  | 'DATA'
  | 'AI'
  | 'COMMERCE';

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  descriptor: string;
  statement: string;
  sector: string;
  type: string;
  year: string;
  accentColor: string;
  client: string;
  location: string;
  summary: string;
  challenge: string;
  complexity: string;
  systemArchitecture: {
    title: string;
    description: string;
    nodes: string[];
    flows: { from: string; to: string; label: string }[];
  };
  interactions: string[];
  techStack: string[];
  qualitativeOutcomes: string[];
  image: string;
  aspectRatio?: string;
  featured: boolean;
  categories: ProjectCategory[];
  coordinates: { x: number; y: number }; // For Scatter/Map plot view: Physical <-> Digital (x: -1 to 1), Story <-> Utility (y: -1 to 1)
  connectionIds: string[]; // Related project IDs
}

export interface CapabilityItem {
  number: string;
  title: string;
  slug: string;
  summary: string;
  deliverables: string[];
  matrixIntersections: Record<string, string>; // e.g. STRATEGY: '...', UX: '...', DESIGN: '...', BUILD: '...', OPERATE: '...'
  technologies: string[];
  caseStudySlugs: string[];
}

export interface InsightArticle {
  slug: string;
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  leadParagraph: string;
  bodySections: {
    heading: string;
    paragraphs: string[];
    diagramLabel?: string;
    quote?: string;
  }[];
  references: { title: string; source: string; year: string }[];
}

export interface StudioMember {
  id: string;
  name: string;
  role: string;
  discipline: string;
  unusualFact: string;
  location: string;
  currentFocus: string;
}

export interface PlaygroundExperiment {
  id: string;
  number: string;
  title: string;
  category: string;
  tech: string;
  description: string;
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'SYSTEM_PROTOTYPE';
}
