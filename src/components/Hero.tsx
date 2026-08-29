import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import { HeroCanvas } from './HeroCanvas';
import { ArrowDown, Copy, Check, Sparkles } from 'lucide-react';

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

const pillFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PUNCHY_PHRASES = [
  'Latency is my personal enemy',
  '99.99% uptime · 100% intentional',
  'Scaled to millions, tuned for milliseconds',
  'Breaking monoliths · Slashing cloud bills',
  'Tested in production · Survived with style',
  'Less code, more throughput',
  'Built to scale, engineered to flex',
  'Zero downtime, zero excuses',
  'Turning complex distributed chaos into clean APIs',
];

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

const DynamicPillText = styled.span`
  display: inline-block;
  animation: ${pillFadeIn} 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

const TitleClip = styled.div`
  overflow: hidden;
`;

const HeroHed = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4.75rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1.5rem;

  .word-inner {
    display: inline-block;
    animation: ${slideUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .accent-highlight {
    color: ${({ theme }) => theme.accentEmerald};
  }

  .accent-highlight-alt {
    color: ${({ theme }) => theme.accentCyan};
  }

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SubText = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 680px;
  margin-bottom: 2.25rem;
  font-weight: 450;

  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const ProofStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2.25rem;
  margin-bottom: 2.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 768px) {
    margin-bottom: 3.5rem;
    gap: 2rem 3rem;
  }
`;

const ProofItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProofValue = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.25rem, 2.5vw, 1.65rem);
  font-weight: 800;
  color: ${({ theme }) => theme.textPrimary};
  letter-spacing: -0.02em;
`;

const ProofLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.textMuted};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.65rem;
  border-radius: 999px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#0B0C10')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#08090D' : '#FFFFFF')};
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: ${({ theme }) => theme.borderHover};
    transform: translateY(-2px);
  }
`;

const EmailCopyBadge = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.85rem 1.25rem;
  border-radius: 999px;
  background: transparent;
  border: 1px solid
    ${({ $copied, theme }) => ($copied ? theme.accentEmerald : theme.borderSubtle)};
  color: ${({ $copied, theme }) => ($copied ? theme.accentEmerald : theme.textSecondary)};
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    color: ${({ theme }) => theme.textPrimary};
  }

  @media (min-width: 480px) {
    font-size: 0.8125rem;
  }
`;

export const Hero: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState(false);
  // Initialize with a random index on reload so it starts on a different phrase every visit
  const [phraseIndex, setPhraseIndex] = useState(() =>
    Math.floor(Math.random() * PUNCHY_PHRASES.length)
  );

  // Automatically rotates every 5 minutes (300,000 ms) while on the page
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PUNCHY_PHRASES.length);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
            <DynamicPillText key={phraseIndex}>
              {PUNCHY_PHRASES[phraseIndex]}
            </DynamicPillText>
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

          <SubText>
            Obsessed with intuitive user interfaces, resilient distributed backends, and low-latency Model Context Protocol (MCP) agent pipelines. If an API query drags or an AI tool call lags, I take it personally.
          </SubText>

          <ProofStrip>
            <ProofItem>
              <ProofValue>2+ Yrs</ProofValue>
              <ProofLabel>Full-Stack Experience</ProofLabel>
            </ProofItem>
            <ProofItem>
              <ProofValue>1M+</ProofValue>
              <ProofLabel>Daily Logs Handled</ProofLabel>
            </ProofItem>
            <ProofItem>
              <ProofValue>35%</ProofValue>
              <ProofLabel>Latency Optimization</ProofLabel>
            </ProofItem>
          </ProofStrip>

          <ActionRow>
            <PrimaryButton href="#work" data-cursor="View Projects">
              <span>View Selected Work</span>
              <ArrowDown size={15} />
            </PrimaryButton>

            <SecondaryButton onClick={onOpenContact} data-cursor="Get in touch">
              <Sparkles size={15} />
              <span>Get in Touch</span>
            </SecondaryButton>

            <EmailCopyBadge
              onClick={handleCopyEmail}
              $copied={copied}
              data-cursor="Copy Email"
              title="Click to copy email address"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied to clipboard' : RESUME_DATA.email}</span>
            </EmailCopyBadge>
          </ActionRow>
        </HeroContent>
      </div>
    </HeroSection>
  );
};
