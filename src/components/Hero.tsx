import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import { HeroCanvas } from './HeroCanvas';
import { ArrowDown, Copy, Check, Sparkles, Layers } from 'lucide-react';

const slideUp = keyframes`
  0% {
    transform: translateY(115%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.6;
  }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 6rem;
  padding-bottom: 4rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding-top: 8.5rem;
    padding-bottom: 6rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1080px;
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.pillBg};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  font-size: clamp(0.72rem, 2.5vw, 0.8125rem);
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
  max-width: 100%;
  line-height: 1.4;

  @media (min-width: 768px) {
    padding: 0.45rem 1.15rem;
    margin-bottom: 2rem;
  }
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  display: inline-block;
  flex-shrink: 0;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const TitleClip = styled.div`
  overflow: hidden;
  margin-bottom: 0.4rem;
`;

const HeroHed = styled.h1`
  font-size: clamp(1.85rem, 5.8vw, 4.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1.5rem;
  overflow-wrap: break-word;
  word-break: break-word;

  .word-inner {
    display: inline-block;
    animation: ${slideUp} 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .accent-highlight {
    background: linear-gradient(135deg, ${({ theme }) => theme.accentEmerald}, ${({ theme }) => theme.accentCyan});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .accent-highlight-alt {
    background: linear-gradient(135deg, ${({ theme }) => theme.accentCyan}, ${({ theme }) => theme.accentViolet});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSub = styled.p`
  font-size: clamp(0.95rem, 2.2vw, 1.35rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 860px;
  margin-bottom: 2.25rem;
  letter-spacing: -0.01em;

  strong {
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.75rem;

  @media (min-width: 540px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3.5rem;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 600;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#141416')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#141416' : '#FFFFFF')};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  width: 100%;

  @media (min-width: 540px) {
    width: auto;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 600;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.25s ease;
  width: 100%;

  @media (min-width: 540px) {
    width: auto;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    transform: translateY(-2px);
    background: ${({ theme }) => theme.bgCardHover};
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 860px;
  padding-top: 1.75rem;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    padding-top: 2rem;
  }
`;

const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetricVal = styled.span`
  font-size: clamp(1.25rem, 3.2vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  font-family: 'JetBrains Mono', monospace;
`;

const MetricLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textMuted};
  font-weight: 500;

  @media (min-width: 480px) {
    font-size: 0.8125rem;
  }
`;

export const Hero: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <HeroSection id="home">
      <HeroCanvas />
      <div className="container">
        <HeroContent>
            <StatusPill>
              <StatusDot />
              <span>Full-Stack & MCP Architect · Turning Prompts into Production</span>
            </StatusPill>

          <TitleClip>
            <HeroHed>
              <span className="word-inner">
                Crafting <span className="accent-highlight">fluid web apps</span> by day,
              </span>
              <br />
              <span className="word-inner" style={{ animationDelay: '0.12s' }}>
                taming <span className="accent-highlight-alt">distributed backends & AI agents</span> by night.
              </span>
            </HeroHed>
          </TitleClip>

          <HeroSub>
            Obsessed with <strong>intuitive user interfaces</strong>, resilient distributed backends, and low-latency{' '}
            <strong>Model Context Protocol (MCP)</strong> agent pipelines. If an API query drags or an AI tool call lags, I take it personally.
          </HeroSub>

          <ActionRow>
            <PrimaryButton href="#work" data-cursor="View Projects">
              <Layers size={16} />
              <span>Explore GitHub Projects</span>
              <ArrowDown size={16} />
            </PrimaryButton>

            <SecondaryButton onClick={handleCopyEmail} data-cursor="Copy Email">
              {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
              <span>{copied ? 'Copied to clipboard!' : 'Copy Email'}</span>
            </SecondaryButton>

            <SecondaryButton onClick={onOpenContact} data-cursor="Connect">
              <Sparkles size={16} color="#10B981" />
              <span>Get In Touch</span>
            </SecondaryButton>
          </ActionRow>

          <MetricGrid>
            <MetricCard>
              <MetricVal>2+ Yrs</MetricVal>
              <MetricLabel>Full-Stack Experience</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricVal>1M+</MetricVal>
              <MetricLabel>Daily Operational Logs</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricVal>35%</MetricVal>
              <MetricLabel>Latency Optimization</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricVal>50+</MetricVal>
              <MetricLabel>Devs on MCP Gateway</MetricLabel>
            </MetricCard>
          </MetricGrid>
        </HeroContent>
      </div>
    </HeroSection>
  );
};
