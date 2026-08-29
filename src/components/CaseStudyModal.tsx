import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ProjectData } from '../data/resumeData';
import {
  RealtimeCursorWidget,
  VideoStreamingWidget,
  GymAnalyticsWidget,
  RealtimeChatWidget,
  GitBroskiWidget,
} from './InteractiveWidgets';
import {
  X,
  CheckCircle2,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  ArrowRight,
  Github,
  ExternalLink,
} from 'lucide-react';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const DrawerContainer = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  max-width: 100vw;
  height: 100%;
  background: ${({ theme }) => theme.bgPrimary};
  border-left: 1px solid ${({ theme }) => theme.borderSubtle};
  display: flex;
  flex-direction: column;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0%)' : 'translateX(100%)')};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    max-width: 780px;
  }
`;

const DrawerHeader = styled.div`
  padding: 1.25rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.navBg};
  backdrop-filter: blur(16px);
  z-index: 10;
  gap: 1rem;

  @media (min-width: 480px) {
    padding: 1.5rem 1.75rem;
  }

  @media (min-width: 768px) {
    padding: 2rem 2.5rem;
  }
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  @media (min-width: 480px) {
    width: 40px;
    height: 40px;
  }

  &:hover {
    background: ${({ theme }) => theme.accentEmerald};
    color: #ffffff;
    transform: rotate(90deg);
  }
`;

const DrawerContent = styled.div`
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 480px) {
    padding: 1.75rem;
  }

  @media (min-width: 768px) {
    padding: 2.5rem;
    gap: 2.5rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.35rem, 3.5vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.35rem;
  line-height: 1.25;
`;

const Subtitle = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.pillBg};
  color: ${({ theme }) => theme.pillText};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionHed = styled.h3`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.accentEmerald};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Paragraph = styled.p`
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
`;

const InteractiveContainer = styled.div`
  background: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 480px) {
    padding: 1.5rem;
    border-radius: 18px;
  }
`;

const InteractiveTitle = styled.div`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const ChallengeSolutionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const ChallengeBox = styled.div`
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  @media (min-width: 480px) {
    border-radius: 16px;
    padding: 1.5rem;
  }
`;

const SolutionBox = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  @media (min-width: 480px) {
    border-radius: 16px;
    padding: 1.5rem;
  }
`;

const BoxHed = styled.h4<{ $color: string }>`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;

  @media (min-width: 480px) {
    gap: 1rem;
  }
`;

const MetricCard = styled.div`
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  @media (min-width: 480px) {
    padding: 1.25rem;
    gap: 0.25rem;
  }
`;

const MetricVal = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.accentEmerald};
`;

const MetricLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const MetricDesc = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textMuted};
`;

const ArchitectureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const ArchitectureItem = styled.li`
  font-size: clamp(0.85rem, 1.8vw, 0.925rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;

  .check-icon {
    color: ${({ theme }) => theme.accentEmerald};
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
`;

const LinksFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const ExternalButton = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ $primary, theme }) =>
    $primary ? (theme.mode === 'dark' ? '#FFFFFF' : '#141416') : theme.bgCard};
  color: ${({ $primary, theme }) =>
    $primary ? (theme.mode === 'dark' ? '#141416' : '#FFFFFF') : theme.textPrimary};
  border: 1px solid ${({ $primary, theme }) => ($primary ? 'transparent' : theme.borderSubtle)};
  transition: all 0.25s ease;
  width: 100%;

  @media (min-width: 480px) {
    width: auto;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.accentEmerald};
  }
`;

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderWidget = () => {
    switch (project.livePreviewType) {
      case 'realtime-cursor':
        return <RealtimeCursorWidget />;
      case 'video-streaming':
        return <VideoStreamingWidget />;
      case 'gym-analytics':
        return <GymAnalyticsWidget />;
      case 'realtime-chat':
        return <RealtimeChatWidget />;
      case 'gitbroski-cli':
        return <GitBroskiWidget />;
      default:
        return null;
    }
  };

  return (
    <Overlay $isOpen={!!project} onClick={onClose}>
      <DrawerContainer $isOpen={!!project} onClick={(e) => e.stopPropagation()}>
        <DrawerHeader>
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: project.accentColor,
                letterSpacing: '0.1em',
              }}
            >
              GitHub Project Deep-Dive
            </span>
            <Title>{project.title}</Title>
            <Subtitle>{project.subtitle}</Subtitle>
            <TagRow>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagRow>
          </div>

          <CloseButton onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </CloseButton>
        </DrawerHeader>

        <DrawerContent>
          {/* Interactive Simulation Widget */}
          <InteractiveContainer>
            <InteractiveTitle>
              <Cpu size={15} color={project.accentColor} />
              <span>Interactive Architecture Simulation</span>
            </InteractiveTitle>
            {renderWidget()}
          </InteractiveContainer>

          {/* Overview */}
          <SectionBlock>
            <SectionHed>
              <Layers size={15} /> System Overview
            </SectionHed>
            <Paragraph>{project.overview}</Paragraph>
          </SectionBlock>

          {/* Challenge & Solution */}
          <ChallengeSolutionGrid>
            <ChallengeBox>
              <BoxHed $color="#EF4444">
                <ShieldCheck size={16} /> Technical Challenge
              </BoxHed>
              <Paragraph>{project.challenge}</Paragraph>
            </ChallengeBox>

            <SolutionBox>
              <BoxHed $color="#10B981">
                <CheckCircle2 size={16} /> Engineered Solution
              </BoxHed>
              <Paragraph>{project.solution}</Paragraph>
            </SolutionBox>
          </ChallengeSolutionGrid>

          {/* Key Architectural Highlights */}
          <SectionBlock>
            <SectionHed>
              <Cpu size={15} /> Key Architectural Highlights
            </SectionHed>
            <ArchitectureList>
              {project.architectureDetails.map((detail, idx) => (
                <ArchitectureItem key={idx}>
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>{detail}</span>
                </ArchitectureItem>
              ))}
            </ArchitectureList>
          </SectionBlock>

          {/* Performance & Reliability Metrics */}
          <SectionBlock>
            <SectionHed>
              <Database size={15} /> Performance & Reliability Metrics
            </SectionHed>
            <MetricGrid>
              {project.metrics.map((m, idx) => (
                <MetricCard key={idx}>
                  <MetricVal>{m.value}</MetricVal>
                  <MetricLabel>{m.label}</MetricLabel>
                  <MetricDesc>{m.desc}</MetricDesc>
                </MetricCard>
              ))}
            </MetricGrid>
          </SectionBlock>

          {/* Actions & Repos */}
          <LinksFooter>
            <ExternalButton
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              $primary={!project.liveUrl}
            >
              <Github size={15} />
              <span>View Source Code on GitHub</span>
              <ArrowRight size={14} />
            </ExternalButton>

            {project.liveUrl && (
              <ExternalButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                $primary
              >
                <ExternalLink size={15} />
                <span>Launch Live Application</span>
                <ArrowRight size={14} />
              </ExternalButton>
            )}
          </LinksFooter>
        </DrawerContent>
      </DrawerContainer>
    </Overlay>
  );
};
