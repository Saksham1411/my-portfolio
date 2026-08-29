import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const letterFall = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-90px) rotate(-14deg) scale(0.5);
    filter: blur(8px);
  }
  50% {
    opacity: 1;
    transform: translateY(12px) rotate(3deg) scale(1.08);
    filter: blur(0px);
  }
  75% {
    transform: translateY(-5px) rotate(-1deg) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) rotate(0deg) scale(1);
    filter: blur(0px);
  }
`;

const lineExpand = keyframes`
  0% {
    width: 0%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div<{ $isExiting: boolean; $isHidden: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #08090d;
  z-index: 999999;
  display: ${({ $isHidden }) => ($isHidden ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;
  user-select: none;
  transform: ${({ $isExiting }) => ($isExiting ? 'translateY(-100%)' : 'translateY(0%)')};
  transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1);
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 1.5rem;
`;

const NameRow = styled.h1`
  font-size: clamp(3.2rem, 11vw, 8.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  display: flex;
  margin-bottom: 1.25rem;
  color: #ffffff;
`;

const Letter = styled.span<{ $delay: number }>`
  display: inline-block;
  opacity: 0;
  animation: ${letterFall} 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: ${({ $delay }) => $delay}ms;

  &.accent {
    color: #10b981;
  }
`;

const SubtitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.72rem, 2vw, 0.875rem);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #94a3b8;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: 0.65s;
`;

const ProgressTrack = styled.div`
  width: 140px;
  height: 2px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  margin-top: 1.75rem;
  overflow: hidden;
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: 0.75s;

  @media (min-width: 640px) {
    width: 200px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981, #38bdf8);
  border-radius: 999px;
  animation: ${lineExpand} 1.1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  animation-delay: 0.8s;
`;

const StatusText = styled.span`
  margin-top: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #64748b;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: 0.9s;
`;

export const IntroPreloader: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const name = 'SAKSHAM';

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Start curtain wipe up after letters and progress finish (1.9s)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = 'auto';
    }, 1900);

    // Completely remove overlay from render tree after exit slide completes (2.8s)
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 2850);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (isHidden) return null;

  return (
    <Overlay $isExiting={isExiting} $isHidden={isHidden} aria-hidden="true">
      <ContentBox>
        <NameRow>
          {name.split('').map((char, index) => (
            <Letter
              key={index}
              $delay={index * 90 + 150}
              className={char === 'K' || char === 'M' ? 'accent' : ''}
            >
              {char}
            </Letter>
          ))}
        </NameRow>

        <SubtitleRow>
          <span>Full-Stack & Distributed Systems</span>
        </SubtitleRow>

        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>

        <StatusText>Initializing Systems...</StatusText>
      </ContentBox>
    </Overlay>
  );
};

