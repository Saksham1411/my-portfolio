import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import { Terminal, Layers } from 'lucide-react';

const softLandingGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }
  70% {
    box-shadow: 0 0 20px 4px rgba(16, 185, 129, 0.25);
  }
  100% {
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.5);
  }
`;

/* Pinned Scroll Stage across all devices */
const ScrollStage = styled.section`
  height: 250vh;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 768px) {
    height: 300vh;
  }
`;

const StickyViewport = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 60px;
  height: calc(100dvh - 60px);
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.75rem 0.5rem;
  box-sizing: border-box;
  overflow: visible;

  @media (min-width: 768px) {
    top: 70px;
    height: calc(100vh - 70px);
    min-height: calc(100vh - 70px);
    justify-content: center;
    padding: clamp(1rem, 2.5vh, 2rem) 0;
  }

  @media (min-width: 768px) and (max-height: 800px) {
    justify-content: flex-start;
    padding-top: 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 0.6rem;
  padding: 0 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 1.25rem;
    padding: 0 1rem;
  }
`;

const Eyebrow = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.accentEmerald};
  margin-bottom: 0.2rem;

  @media (min-width: 768px) {
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    margin-bottom: 0.3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.35rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.15;
  margin-bottom: 0.2rem;

  @media (min-width: 768px) {
    margin-bottom: 0.35rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(0.74rem, 1.2vw, 0.92rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.35;
  max-width: 600px;
  margin: 0 auto;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
  overflow-x: auto;
  padding: 0.2rem 0.5rem 0.4rem;
  width: 100%;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 640px) {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
    margin-bottom: 1.25rem;
    padding: 0;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.accentEmerald : theme.borderSubtle)};
  background: ${({ $active, theme }) =>
    $active
      ? theme.mode === 'dark'
        ? 'rgba(16, 185, 129, 0.2)'
        : 'rgba(5, 150, 105, 0.15)'
      : theme.bgCard};
  color: ${({ $active, theme }) => ($active ? theme.accentEmerald : theme.textSecondary)};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
  flex-shrink: 0;

  @media (min-width: 768px) {
    padding: 0.38rem 0.85rem;
    font-size: 0.78rem;
    gap: 0.35rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    color: ${({ theme }) => theme.textPrimary};
    transform: translateY(-2px);
  }
`;

/* Dynamic Central Cloud Container - Zero Inner Scrollbars, 100% Fluid */
const ChipCloudContainer = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: 0 auto 0.75rem;
  padding: clamp(0.75rem, 1.8vh, 1.5rem) clamp(0.5rem, 1.8vw, 1.5rem);
  border-radius: 18px;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(0.35rem, 0.8vw, 0.65rem);
  position: relative;
  backdrop-filter: blur(8px);
  height: auto;
  overflow: visible;
  box-sizing: border-box;

  @media (min-width: 640px) {
    border-radius: 24px;
    margin-bottom: 1.25rem;
  }
`;

/* Alternating Left-Right Ingress Chip */
const ChipPill = styled.div<{
  $isDocked: boolean;
  $side: 'left' | 'right';
  $accentColor: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: clamp(0.3rem, 0.6vw, 0.45rem);
  padding: clamp(0.32rem, 0.7vh, 0.52rem) clamp(0.6rem, 1vw, 1.1rem);
  border-radius: 999px;
  font-size: clamp(0.72rem, 1.1vw, 0.88rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#141620' : '#FFFFFF')};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark' ? '0 4px 14px rgba(0,0,0,0.35)' : '0 4px 12px rgba(0,0,0,0.06)'};
  cursor: default;
  user-select: none;
  will-change: transform, opacity, filter;

  @media (min-width: 640px) {
    box-shadow: ${({ theme }) =>
      theme.mode === 'dark' ? '0 8px 20px rgba(0,0,0,0.4)' : '0 6px 16px rgba(0,0,0,0.06)'};
  }

  /* Smooth cubic-bezier easing */
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.35s ease-out,
              filter 0.35s ease-out,
              border-color 0.25s ease,
              background-color 0.25s ease,
              box-shadow 0.3s ease;

  /* Left vs Right Ingress Coordinates */
  opacity: ${({ $isDocked }) => ($isDocked ? 1 : 0)};
  filter: ${({ $isDocked }) => ($isDocked ? 'blur(0px)' : 'blur(5px)')};
  pointer-events: ${({ $isDocked }) => ($isDocked ? 'auto' : 'none')};
  transform: ${({ $isDocked, $side }) =>
    $isDocked
      ? 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
      : $side === 'left'
      ? 'translate3d(-60px, 8px, 0) rotate(-3deg) scale(0.92)'
      : 'translate3d(60px, 8px, 0) rotate(3deg) scale(0.92)'};

  &.just-docked {
    animation: ${softLandingGlow} 0.8s ease-out;
  }

  &:hover {
    transform: translateY(-3px) scale(1.06) !important;
    border-color: ${({ $accentColor }) => $accentColor} !important;
    background: ${({ $accentColor }) => $accentColor}22 !important;
    box-shadow: 0 10px 24px -4px ${({ $accentColor }) => $accentColor}55 !important;
    z-index: 50;
  }
`;

const ChipDot = styled.span<{ $color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 7px ${({ $color }) => $color};
  flex-shrink: 0;

  @media (min-width: 640px) {
    width: 7px;
    height: 7px;
    box-shadow: 0 0 8px ${({ $color }) => $color};
  }
`;

const ScrollTelemetry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.68rem, 1vw, 0.74rem);
  color: ${({ theme }) => theme.textMuted};
  padding: 0 0.5rem;
`;

const ScrollBarTrack = styled.div`
  width: 90px;
  height: 3px;
  border-radius: 999px;
  background: ${({ theme }) => theme.borderSubtle};
  overflow: hidden;

  @media (min-width: 640px) {
    width: 110px;
  }
`;

const ScrollBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress * 100}%;
  background: linear-gradient(90deg, #10b981, #38bdf8);
  transition: width 0.08s ease-out;
`;

const CATEGORIES = [
  'All Stack',
  'Languages',
  'Backend & Architecture',
  'Databases & ORM',
  'DevOps & Cloud Infrastructure',
  'Testing & Observability',
] as const;

export const SkillMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stack');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const stageRef = useRef<HTMLElement | null>(null);

  // Pin-scoped scroll calculation
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const rect = stage.getBoundingClientRect();
        const navOffset = window.innerWidth < 768 ? 60 : 70;
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) return;

        const rawProgress = (-rect.top + navOffset) / totalScrollable;
        const clamped = Math.min(1, Math.max(0, rawProgress));

        setScrollProgress(clamped);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter skills based on category tab
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All Stack') {
      return RESUME_DATA.skillsList;
    }
    return RESUME_DATA.skillsList.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const totalSkills = filteredSkills.length;
  // Progressively dock chips on scroll down, undock on scroll back up
  const dockedCount = Math.min(
    totalSkills,
    Math.max(1, Math.floor(scrollProgress * (totalSkills + 1)))
  );

  return (
    <ScrollStage id="skills" ref={stageRef}>
      <StickyViewport>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <SectionHeader>
            <Eyebrow>Technical Capabilities</Eyebrow>
            <SectionTitle>Core Skills & Systems</SectionTitle>
            <SectionSubtitle>
              Scroll down to watch technologies dock into the central cluster from alternating sides.
            </SectionSubtitle>
          </SectionHeader>

          <CategoryTabs>
            {CATEGORIES.map((cat) => (
              <TabButton
                key={cat}
                $active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor={cat}
              >
                {cat === 'All Stack' ? <Layers size={13} /> : <Terminal size={13} />}
                <span>{cat}</span>
              </TabButton>
            ))}
          </CategoryTabs>

          {/* Alternating Left-Right Ingress Chip Cloud */}
          <ChipCloudContainer>
            {filteredSkills.map((skill, index) => {
              const isDocked = index < dockedCount;
              const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';

              return (
                <ChipPill
                  key={`${selectedCategory}-${skill.name}`}
                  $isDocked={isDocked}
                  $side={side}
                  $accentColor={skill.accentColor}
                  data-cursor={skill.name}
                >
                  <ChipDot $color={skill.accentColor} />
                  <span>{skill.name}</span>
                </ChipPill>
              );
            })}
          </ChipCloudContainer>

          <ScrollTelemetry>
            <span>
              {dockedCount} of {totalSkills} Active Capabilities
            </span>
            <ScrollBarTrack>
              <ScrollBarFill $progress={scrollProgress} />
            </ScrollBarTrack>
          </ScrollTelemetry>
        </div>
      </StickyViewport>
    </ScrollStage>
  );
};
