import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type CursorMode = 
  | 'DEFAULT'
  | 'OPEN'
  | 'EXPAND'
  | 'EXPLORE'
  | 'MOVE'
  | 'TOGGLE'
  | 'PLAY'
  | 'OUT'
  | 'BEGIN'
  | 'DISABLED';

interface StateContextType {
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  isGridVisible: boolean;
  toggleGrid: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  currentStateLabel: string;
  nextStateLabel: string | null;
  triggerTransition: (nextLabel: string) => void;
  isPreloaded: boolean;
  setIsPreloaded: (loaded: boolean) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const ROUTE_STATE_MAP: Record<string, string> = {
  '/': 'STATE_01 / HOME',
  '/work': 'STATE_02 / WORK ARCHIVE',
  '/capabilities': 'STATE_03 / CAPABILITIES MATRIX',
  '/capabilities/web': 'STATE_03.1 / WEB SYSTEMS',
  '/capabilities/immersive': 'STATE_03.2 / IMMERSIVE 3D',
  '/capabilities/data': 'STATE_03.3 / DATA CARTOGRAPHY',
  '/platforms': 'STATE_04 / SYSTEM PLATFORMS',
  '/exhibits': 'STATE_05 / SPATIAL EXHIBITS',
  '/process': 'STATE_06 / PROCESS FUNNEL',
  '/studio': 'STATE_07 / STUDIO CULTURE',
  '/insights': 'STATE_08 / WORKING KNOWLEDGE',
  '/playground': 'STATE_09 / EXPERIMENTS',
  '/start': 'STATE_10 / PROJECT MAPPER',
  '/contact': 'STATE_11 / CONTACT & INQUIRY',
};

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [cursorMode, setCursorMode] = useState<CursorMode>('DEFAULT');
  const [cursorText, setCursorText] = useState<string>('');
  const [isGridVisible, setIsGridVisible] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [nextStateLabel, setNextStateLabel] = useState<string | null>(null);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(() => {
    // Check if session has already preloaded to keep UX snappy on return
    return sessionStorage.getItem('ms_preloaded') === 'true';
  });

  const path = location.pathname;
  let currentStateLabel = ROUTE_STATE_MAP[path] || 'STATE_SYS / EXPLORER';
  if (path.startsWith('/work/')) {
    currentStateLabel = 'STATE_02.X / CASE STUDY';
  } else if (path.startsWith('/insights/')) {
    currentStateLabel = 'STATE_08.X / ARTICLE';
  }

  // Update document theme attribute based on route
  useEffect(() => {
    let theme = 'home';
    if (path.startsWith('/work')) theme = 'work';
    else if (path.startsWith('/capabilities')) theme = 'capabilities';
    else if (path.startsWith('/platforms')) theme = 'platforms';
    else if (path.startsWith('/exhibits')) theme = 'exhibits';
    else if (path.startsWith('/process')) theme = 'process';
    else if (path.startsWith('/studio')) theme = 'studio';
    else if (path.startsWith('/insights')) theme = 'insights';
    else if (path.startsWith('/playground')) theme = 'playground';
    else if (path.startsWith('/start')) theme = 'home';
    else if (path.startsWith('/contact')) theme = 'contact';
    
    document.documentElement.setAttribute('data-theme', theme);
    window.scrollTo(0, 0);
  }, [path]);

  // Keyboard shortcut 'G' to toggle alignment grid
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' || e.key === 'G') {
        // Only if not typing in form input
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          setIsGridVisible((prev) => !prev);
        }
      }
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleGrid = () => setIsGridVisible((prev) => !prev);

  const triggerTransition = (nextLabel: string) => {
    setNextStateLabel(nextLabel);
    setTimeout(() => {
      setNextStateLabel(null);
    }, 900);
  };

  const handleSetPreloaded = (val: boolean) => {
    setIsPreloaded(val);
    sessionStorage.setItem('ms_preloaded', 'true');
  };

  return (
    <StateContext.Provider
      value={{
        cursorMode,
        setCursorMode,
        cursorText,
        setCursorText,
        isGridVisible,
        toggleGrid,
        isMenuOpen,
        setIsMenuOpen,
        currentStateLabel,
        nextStateLabel,
        triggerTransition,
        isPreloaded,
        setIsPreloaded: handleSetPreloaded,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};
