import React from 'react';
import styled from 'styled-components';
import { marquee } from '../styles/animations';
import { RESUME_DATA } from '../data/resumeData';

const TickerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 1.25rem 0;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)')};
  display: flex;
  user-select: none;
`;

const Track = styled.div`
  display: flex;
  white-space: nowrap;
  width: max-content;
  animation: ${marquee} 36s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const TickerItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.textSecondary};

  &::after {
    content: '•';
    color: ${({ theme }) => theme.accentEmerald};
    font-size: 1.25rem;
  }
`;

export const ProofTicker: React.FC = () => {
  const items = [...RESUME_DATA.proofItems, ...RESUME_DATA.proofItems];

  return (
    <TickerWrapper aria-hidden="true">
      <Track>
        {items.map((text, idx) => (
          <TickerItem key={idx}>{text}</TickerItem>
        ))}
      </Track>
    </TickerWrapper>
  );
};

