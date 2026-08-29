import React, { useState } from 'react';
import styled from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import { Terminal, Database, Cloud, Shield, Code2, Sparkles } from 'lucide-react';

const MatrixSection = styled.section`
  padding: 4.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 768px) {
    padding: 6.5rem 0;
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.45rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    flex-wrap: wrap;
    overflow-x: visible;
    margin-bottom: 2.5rem;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.accentEmerald : theme.borderSubtle)};
  background: ${({ $active, theme }) => ($active ? theme.accentEmerald : theme.bgCard)};
  color: ${({ $active }) => ($active ? '#FFFFFF' : 'inherit')};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  flex-shrink: 0;

  @media (min-width: 768px) {
    padding: 0.6rem 1.25rem;
    font-size: 0.875rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    transform: translateY(-2px);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 580px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkillCard = styled.div<{ $featured?: boolean }>`
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ $featured, theme }) => ($featured ? theme.borderHover : theme.borderSubtle)};
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.85rem;
  transition: all 0.25s ease;
  box-shadow: ${({ theme }) => theme.cardShadow};

  @media (min-width: 768px) {
    border-radius: 16px;
    padding: 1.5rem;
    gap: 1rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    transform: translateY(-3px);
  }
`;

const SkillTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SkillName = styled.h4`
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const SkillCategoryTag = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.textMuted};
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)')};
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $level: number }>`
  height: 100%;
  width: ${({ $level }) => $level}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.accentEmerald}, ${({ theme }) => theme.accentCyan});
  border-radius: 999px;
  transition: width 0.8s ease-in-out;
`;

export const SkillMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...RESUME_DATA.skillCategories.map((c) => c.category)];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code2 size={15} />;
      case 'Backend & Distributed Systems':
        return <Terminal size={15} />;
      case 'Databases & Caching':
        return <Database size={15} />;
      case 'DevOps, Cloud & Infrastructure':
        return <Cloud size={15} />;
      case 'Testing, Security & Observability':
        return <Shield size={15} />;
      default:
        return <Sparkles size={15} />;
    }
  };

  const allSkills = RESUME_DATA.skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      ...skill,
      categoryName: cat.category,
    }))
  );

  const filteredSkills =
    selectedCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.categoryName === selectedCategory);

  return (
    <MatrixSection id="skills">
      <div className="container">
        <SectionHeader>
          <Eyebrow>Core Competencies</Eyebrow>
          <SectionTitle>Technical Proficiencies</SectionTitle>
        </SectionHeader>

        <CategoryTabs>
          {categories.map((cat) => (
            <TabButton
              key={cat}
              $active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              data-cursor={cat}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </TabButton>
          ))}
        </CategoryTabs>

        <SkillsGrid>
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.name} $featured={skill.featured} data-cursor={skill.name}>
              <SkillTop>
                <SkillName>
                  {skill.name}
                  {skill.featured && <Sparkles size={13} color="#10B981" />}
                </SkillName>
                <SkillCategoryTag>{skill.categoryName.split(' ')[0]}</SkillCategoryTag>
              </SkillTop>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: '#888',
                    marginBottom: '0.35rem',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span>Proficiency</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>{skill.level}%</span>
                </div>
                <ProgressBar>
                  <ProgressFill $level={skill.level} />
                </ProgressBar>
              </div>
            </SkillCard>
          ))}
        </SkillsGrid>
      </div>
    </MatrixSection>
  );
};
