import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StateProvider } from './context/StateContext';
import { SmoothScrollProvider } from './components/motion/SmoothScrollProvider';
import { MosaicHeader } from './components/navigation/MosaicHeader';
import { StudioFooter } from './components/navigation/StudioFooter';
import { Preloader } from './components/motion/Preloader';
import { CustomCursor } from './components/motion/CustomCursor';
import { GridOverlay } from './components/motion/GridOverlay';
import { PageTransition } from './components/motion/PageTransition';

// Page imports
import { HomePage } from './pages/home/HomePage';
import { WorkPage } from './pages/work/WorkPage';
import { CaseStudyPage } from './pages/case-study/CaseStudyPage';
import { CapabilitiesPage } from './pages/capabilities/CapabilitiesPage';
import { WebCapabilitiesPage } from './pages/capabilities/WebCapabilitiesPage';
import { ImmersiveCapabilitiesPage } from './pages/capabilities/ImmersiveCapabilitiesPage';
import { DataCapabilitiesPage } from './pages/capabilities/DataCapabilitiesPage';
import { PlatformsPage } from './pages/platforms/PlatformsPage';
import { ExhibitsPage } from './pages/exhibits/ExhibitsPage';
import { StudioPage } from './pages/studio/StudioPage';
import { ProcessPage } from './pages/process/ProcessPage';
import { InsightsPage } from './pages/insights/InsightsPage';
import { ArticlePage } from './pages/insights/ArticlePage';
import { PlaygroundPage } from './pages/playground/PlaygroundPage';
import { StartProjectPage } from './pages/start/StartProjectPage';
import { ContactPage } from './pages/contact/ContactPage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <SmoothScrollProvider>
          {/* Global System Overlays */}
          <Preloader />
          <CustomCursor />
          <GridOverlay />
          <PageTransition />

          {/* Context-Adaptive Header */}
          <MosaicHeader />

          {/* Application Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/capabilities/web" element={<WebCapabilitiesPage />} />
            <Route path="/capabilities/immersive" element={<ImmersiveCapabilitiesPage />} />
            <Route path="/capabilities/data" element={<DataCapabilitiesPage />} />
            <Route path="/platforms" element={<PlatformsPage />} />
            <Route path="/exhibits" element={<ExhibitsPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<ArticlePage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/start" element={<StartProjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Institutional System Footer */}
          <StudioFooter />
        </SmoothScrollProvider>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
