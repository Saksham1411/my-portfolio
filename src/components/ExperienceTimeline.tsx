import React from 'react';
import styled from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const TimelineSection = styled.section`
  padding: 6rem 0 5.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 768px) {
    padding: 8rem 0 7.5rem;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    margin-bottom: 3.5rem;
  }
`;

const Eyebrow = styled.p`
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

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;

  @media (min-width: 768px) {
    gap: 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    bottom: 1.5rem;
    left: 17px;
    width: 2px;
    background: ${({ theme }) => theme.borderSubtle};

    @media (min-width: 768px) {
      left: 27px;
    }
  }
`;

const TimelineNode = styled.div`
  display: flex;
  gap: 0.85rem;
  position: relative;

  @media (min-width: 480px) {
    gap: 1.25rem;
  }

  @media (min-width: 768px) {
    gap: 2.5rem;
  }
`;

const IconBadge = styled.div<{ $isCurrent?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $isCurrent, theme }) =>
    $isCurrent
      ? theme.accentEmerald
      : theme.mode === 'dark'
      ? '#1A1D27'
      : '#FFFFFF'};
  color: ${({ $isCurrent }) => ($isCurrent ? '#FFFFFF' : '#10B981')};
  border: 2px solid ${({ theme }) => theme.accentEmerald};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.25);

  @media (min-width: 768px) {
    width: 56px;
    height: 56px;
  }
`;

const ContentCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 18px;
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    transform: translateY(-2px);
  }

  @media (min-width: 480px) {
    padding: 1.75rem;
  }

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 2.5rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  gap: 0.4rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
`;

const RoleHeading = styled.h3`
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  letter-spacing: -0.02em;
`;

const CompanyName = styled.span`
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 600;
  color: ${({ theme }) => theme.accentEmerald};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textMuted};
  font-family: 'JetBrains Mono', monospace;

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  margin-bottom: 1.5rem;
`;

const BulletItem = styled.li`
  font-size: clamp(0.85rem, 1.8vw, 0.9375rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;

  .bullet-icon {
    color: ${({ theme }) => theme.accentEmerald};
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const TechPillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
`;

const TechPill = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.codeBg};
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  font-family: 'JetBrains Mono', monospace;
`;

/* Education Card */
const EducationCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 18px;
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    transform: translateY(-2px);
  }

  @media (min-width: 480px) {
    padding: 1.75rem;
  }

  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 2.5rem;
  }
`;

const DegreeTitle = styled.h3`
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
`;

const InstitutionName = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 600;
  color: ${({ theme }) => theme.accentEmerald};
  margin-bottom: 0.85rem;
`;

const AcademicBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const AcadBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.12);
  color: ${({ theme }) => theme.accentEmerald};
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-size: 0.78rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
`;

export const ExperienceTimeline: React.FC = () => {
  return (
    <TimelineSection id="experience">
      <div className="container">
        <SectionHeader>
          <Eyebrow>Career Trajectory</Eyebrow>
          <SectionTitle>Experience & Impact</SectionTitle>
        </SectionHeader>

        <TimelineWrapper>
          {RESUME_DATA.experiences.map((exp, idx) => (
            <TimelineNode key={`${exp.company}-${idx}`} data-cursor={exp.company}>
              <IconBadge $isCurrent={exp.isCurrent}>
                <Briefcase size={20} />
              </IconBadge>

              <ContentCard>
                <CardHeader>
                  <div>
                    <RoleHeading>{exp.role}</RoleHeading>
                    <CompanyName>{exp.company}</CompanyName>
                  </div>
                  <MetaInfo>
                    <span>
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span>
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </MetaInfo>
                </CardHeader>

                <BulletList>
                  {exp.achievements.map((item, aIdx) => (
                    <BulletItem key={aIdx}>
                      <CheckCircle2 size={16} className="bullet-icon" />
                      <span>{item}</span>
                    </BulletItem>
                  ))}
                </BulletList>

                {exp.technologies && exp.technologies.length > 0 && (
                  <TechPillRow>
                    {exp.technologies.map((t) => (
                      <TechPill key={t}>{t}</TechPill>
                    ))}
                  </TechPillRow>
                )}
              </ContentCard>
            </TimelineNode>
          ))}

          {/* Education Node */}
          <TimelineNode data-cursor="Education">
            <IconBadge>
              <GraduationCap size={20} />
            </IconBadge>

            <EducationCard>
              <DegreeTitle>{RESUME_DATA.education.degree}</DegreeTitle>
              <InstitutionName>{RESUME_DATA.education.institution}</InstitutionName>

              <MetaInfo>
                <span>
                  <Calendar size={13} />
                  Graduating {RESUME_DATA.education.graduationYear}
                </span>
                <span>
                  <MapPin size={13} />
                  Punjab, India
                </span>
              </MetaInfo>

              <AcademicBadges>
                <AcadBadge>CGPA: {RESUME_DATA.education.cgpa}</AcadBadge>
                <AcadBadge>{RESUME_DATA.education.honors}</AcadBadge>
              </AcademicBadges>
            </EducationCard>
          </TimelineNode>
        </TimelineWrapper>
      </div>
    </TimelineSection>
  );
};
