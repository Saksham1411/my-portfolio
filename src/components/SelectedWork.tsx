import React from 'react';
import styled from 'styled-components';
import { RESUME_DATA, ProjectData } from '../data/resumeData';
import {
  RealtimeCursorWidget,
  VideoStreamingWidget,
  GymAnalyticsWidget,
  RealtimeChatWidget,
  GitBroskiWidget,
} from './InteractiveWidgets';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const WorkSection = styled.section`
  padding: 4.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 768px) {
    padding: 6rem 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3.5rem;
  }
`;

const SectionEyebrow = styled.p`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.accentEmerald};
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.85rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.15;
`;

const GithubProfileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  margin-top: 1rem;
  transition: all 0.25s ease;
  width: fit-content;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    color: ${({ theme }) => theme.textPrimary};
    transform: translateY(-2px);
  }
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;

  @media (min-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
`;

const WorkCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.borderHover};
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.2);

    .arrow-btn {
      transform: translate(2px, -2px);
      background: ${({ theme }) => theme.accentEmerald};
      color: #ffffff;
    }
  }

  @media (min-width: 768px) {
    border-radius: 20px;

    &:hover {
      transform: translateY(-6px);
    }
  }
`;

const CardPreview = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.bgSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;

  @media (min-width: 480px) {
    padding: 1.5rem;
    min-height: 220px;
  }
`;

const CardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  @media (min-width: 480px) {
    padding: 2rem;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
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

const CardTitle = styled.h3`
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const CardTagline = styled.p`
  font-size: clamp(0.85rem, 1.8vw, 0.9375rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
  gap: 0.5rem;
`;

const LinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

const ExtLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s ease;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;

  &:hover {
    color: ${({ theme }) => theme.accentEmerald};
  }
`;

const ArrowAction = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;
`;

interface SelectedWorkProps {
  onSelectProject: (project: ProjectData) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const renderPreview = (type: ProjectData['livePreviewType']) => {
    switch (type) {
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
    <WorkSection id="work">
      <div className="container">
        <SectionHeader>
          <div>
            <SectionEyebrow>Open Source & Full-Stack Projects</SectionEyebrow>
            <SectionTitle>Featured GitHub Repositories</SectionTitle>
          </div>

          <GithubProfileLink
            href={RESUME_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GitHub"
          >
            <Github size={16} />
            <span>Explore All 30+ Repositories</span>
            <ArrowUpRight size={14} />
          </GithubProfileLink>
        </SectionHeader>

        <WorkGrid>
          {RESUME_DATA.projects.map((project) => (
            <WorkCard
              key={project.id}
              onClick={() => onSelectProject(project)}
              data-cursor="Open Deep-Dive"
            >
              <CardPreview>{renderPreview(project.livePreviewType)}</CardPreview>

              <CardBody>
                <div>
                  <TagRow>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>

                  <CardTitle>{project.title}</CardTitle>
                  <CardTagline>{project.tagline}</CardTagline>
                </div>

                <CardFooter>
                  <LinksGroup onClick={(e) => e.stopPropagation()}>
                    <ExtLink
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Source Code"
                    >
                      <Github size={13} />
                      <span>Code</span>
                    </ExtLink>
                    {project.liveUrl && (
                      <ExtLink
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Live Demo"
                      >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                      </ExtLink>
                    )}
                  </LinksGroup>

                  <ArrowAction className="arrow-btn">
                    <ArrowUpRight size={16} />
                  </ArrowAction>
                </CardFooter>
              </CardBody>
            </WorkCard>
          ))}
        </WorkGrid>
      </div>
    </WorkSection>
  );
};
