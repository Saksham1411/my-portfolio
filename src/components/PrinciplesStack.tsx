import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';

const SectionWrapper = styled.section`
  padding: 4.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  position: relative;

  @media (min-width: 768px) {
    padding: 7rem 0;
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

const CounterBadge = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 0.2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ theme }) => theme.textPrimary};
  margin-top: 0.75rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-top: 0;
  }

  .accent {
    color: ${({ theme }) => theme.accentEmerald};
  }

  .total {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textMuted};
  }
`;

const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const StickyCard = styled.div<{ $index: number }>`
  position: sticky;
  top: calc(65px + ${({ $index }) => $index * 12}px);
  background: ${({ theme }) => (theme.mode === 'dark' ? '#14161F' : '#FFFFFF')};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 18px;
  padding: 1.5rem 1.25rem;
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark' ? '0 16px 40px rgba(0,0,0,0.6)' : '0 16px 32px rgba(0,0,0,0.06)'};
  transition: transform 0.2s ease, border-color 0.2s ease;
  z-index: ${({ $index }) => $index + 1};

  @media (min-width: 640px) {
    border-radius: 24px;
    padding: 2.5rem;
    top: calc(85px + ${({ $index }) => $index * 18}px);
  }

  @media (min-width: 768px) {
    padding: 3.5rem 4rem;
    top: calc(100px + ${({ $index }) => $index * 24}px);
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const CardIndex = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.accentEmerald};
  padding: 0.25rem 0.65rem;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.1)'};
  border-radius: 999px;

  @media (min-width: 640px) {
    font-size: 1.25rem;
    padding: 0.3rem 0.8rem;
  }
`;

const CardHighlight = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.textMuted};

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 3.2vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.3;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
  }
`;

const CardBody = styled.p`
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 860px;
`;

export const PrinciplesStack: React.FC = () => {
  const [activeCard, setActiveCard] = useState(1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollPos >= top) {
          setActiveCard(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SectionWrapper id="principles">
      <div className="container">
        <SectionHeader>
          <div>
            <Eyebrow>Engineering Philosophy</Eyebrow>
            <SectionTitle>How I Build & Operate Systems</SectionTitle>
          </div>
          <CounterBadge>
            <span className="accent">0{activeCard}</span>
            <span className="total">/ 0{RESUME_DATA.principles.length}</span>
          </CounterBadge>
        </SectionHeader>

        <StackContainer>
          {RESUME_DATA.principles.map((principle, idx) => (
            <StickyCard
              key={principle.id}
              $index={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              data-cursor={`Principle ${principle.id}`}
            >
              <CardTop>
                <CardIndex>{principle.id}</CardIndex>
                <CardHighlight>{principle.highlight}</CardHighlight>
              </CardTop>
              <CardTitle>{principle.title}</CardTitle>
              <CardBody>{principle.body}</CardBody>
            </StickyCard>
          ))}
        </StackContainer>
      </div>
    </SectionWrapper>
  );
};
