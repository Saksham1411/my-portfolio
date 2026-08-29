import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CursorProps {
  $x: number;
  $y: number;
  $isHovering: boolean;
  $label: string;
  $visible: boolean;
}

const CursorWrapper = styled.div<CursorProps>`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  transform: translate3d(${({ $x }) => $x}px, ${({ $y }) => $y}px, 0);
  transition: transform 0.08s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.25s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  display: none;

  @media (pointer: fine) {
    display: block;
  }
`;

const CursorDot = styled.div<{ $isHovering: boolean }>`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accentEmerald};
  box-shadow: 0 0 12px ${({ theme }) => theme.accentEmerald};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${({ $isHovering }) => ($isHovering ? 'scale(0)' : 'scale(1)')};
`;

const CursorPill = styled.div<{ $isHovering: boolean }>`
  position: absolute;
  top: -18px;
  left: -18px;
  padding: 8px 16px;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#141416')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#141416' : '#FFFFFF')};
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 999px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${({ $isHovering }) => ($isHovering ? 'scale(1) translateY(-10px)' : 'scale(0)')};
  opacity: ${({ $isHovering }) => ($isHovering ? 1 : 0)};
  pointer-events: none;
`;

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<{ isHovering: boolean; label: string }>({
    isHovering: false,
    label: '',
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const label = cursorTarget.getAttribute('data-cursor') || 'View';
        setHoverState({ isHovering: true, label });
      } else {
        setHoverState({ isHovering: false, label: '' });
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <CursorWrapper
      $x={pos.x}
      $y={pos.y}
      $isHovering={hoverState.isHovering}
      $label={hoverState.label}
      $visible={visible}
    >
      <CursorDot $isHovering={hoverState.isHovering} />
      <CursorPill $isHovering={hoverState.isHovering}>{hoverState.label}</CursorPill>
    </CursorWrapper>
  );
};

