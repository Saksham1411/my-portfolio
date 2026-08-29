import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';

const SectionWrapper = styled.section`
  padding: 5rem 0 12rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  position: relative;

  @media (min-width: 768px) {
    padding: 7rem 0 16rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4.5rem;
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
  position: relative;
  display: block;
`;

const StickyCard = styled.div<{ $index: number; $scale: number; $brightness: number }>`
  position: -webkit-sticky;
  position: sticky;
  top: calc(75px + ${({ $index }) => $index * 16}px);
  background: ${({ theme }) => (theme.mode === 'dark' ? '#13151D' : '#FFFFFF')};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
  margin-bottom: 3rem;
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      : '0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)'};
  transform: scale(${({ $scale }) => $scale});
  transform-origin: center top;
  filter: brightness(${({ $brightness }) => $brightness});
  transition: transform 0.12s ease-out, filter 0.15s ease-out, border-color 0.25s ease;
  z-index: ${({ $index }) => $index + 1};
  will-change: transform, filter;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 640px) {
    border-radius: 24px;
    padding: 2.5rem 2.25rem;
    top: calc(90px + ${({ $index }) => $index * 20}px);
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    padding: 3.5rem 4rem;
    top: calc(105px + ${({ $index }) => $index * 26}px);
    margin-bottom: 5.5rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2.25rem;
  }
`;

const CardIndex = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.accentEmerald};
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.1)'};
  border: 1px solid
    ${({ theme }) => (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(5, 150, 105, 0.2)')};
  border-radius: 999px;

  @media (min-width: 640px) {
    font-size: 1.25rem;
    padding: 0.35rem 0.9rem;
  }
`;

const CardHighlight = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.textMuted};

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.25rem, 3.2vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.25;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1.25rem;

  @media (min-width: 640px) {
    margin-bottom: 1.75rem;
  }
`;

const CardBody = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 860px;
`;

export const PrinciplesStack: React.FC = () => {
  const [activeCard, setActiveCard] = useState(1);
  const [cardTransforms, setCardTransforms] = useState<{ scale: number; brightness: number }[]>(
    RESUME_DATA.principles.map(() => ({ scale: 1, brightness: 1 }))
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const transforms = RESUME_DATA.principles.map((_, index) => {
          const cardEl = cardRefs.current[index];
          if (!cardEl) return { scale: 1, brightness: 1 };

          const targetTop = 105 + index * 26;

          // How far subsequent cards have passed this card
          let depth = 0;
          for (let nextIdx = index + 1; nextIdx < RESUME_DATA.principles.length; nextIdx++) {
            const nextCard = cardRefs.current[nextIdx];
            if (nextCard) {
              const nextRect = nextCard.getBoundingClientRect();
              if (nextRect.top <= targetTop + 80) {
                depth += 1;
              }
            }
          }

          // Calculate smooth dynamic scale and brightness dimming
          const scale = Math.max(0.90, 1 - depth * 0.035);
          const brightness = Math.max(0.78, 1 - depth * 0.07);

          return { scale, brightness };
        });

        setCardTransforms(transforms);

        // Update active index
        const scrollPos = window.scrollY + 280;
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const top = card.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveCard(index + 1);
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
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
              $scale={cardTransforms[idx]?.scale ?? 1}
              $brightness={cardTransforms[idx]?.brightness ?? 1}
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
