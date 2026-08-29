import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useThemeState, ThemeContext } from './hooks/useTheme';
import { GlobalStyles } from './styles/GlobalStyles';
import { IntroPreloader } from './components/IntroPreloader';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProofTicker } from './components/ProofTicker';
import { SelectedWork } from './components/SelectedWork';
import { PrinciplesStack } from './components/PrinciplesStack';
import { SkillMatrix } from './components/SkillMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectData } from './data/resumeData';

export const App: React.FC = () => {
  const { theme, mode, toggleTheme } = useThemeState();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <IntroPreloader />
        <CustomCursor />

        <Navigation onOpenContact={() => setContactOpen(true)} />

        <main id="main-content">
          <Hero onOpenContact={() => setContactOpen(true)} />
          <ProofTicker />
          <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />
          <PrinciplesStack />
          <SkillMatrix />
          <ExperienceTimeline />
        </main>

        <ContactSection
          isOpen={contactOpen}
          onOpen={() => setContactOpen(true)}
          onClose={() => setContactOpen(false)}
        />

        <Footer />

        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;

