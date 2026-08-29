import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100dvh;
  min-height: 100vh;
  background: #08090d;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;
  user-select: none;
  pointer-events: auto;
  touch-action: none;
  overscroll-behavior: none;
`;

const AmbientGlow = styled.div`
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    transparent 70%
  );
  filter: blur(100px);
  pointer-events: none;
`;

const BgGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 50%, transparent 85%);
  pointer-events: none;
`;

const SpiralViewport = styled.div`
  position: relative;
  width: 100vw;
  height: 100dvh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  overflow: hidden;
`;

const MainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .spiral-char {
    position: absolute;
    font-family: 'JetBrains Mono', 'Plus Jakarta Sans', monospace;
    font-size: clamp(0.75rem, 1.6vw, 1.4rem);
    font-weight: 800;
    color: rgba(255, 255, 255, 0.9);
    user-select: none;
    pointer-events: none;
    transform-origin: center center;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
    white-space: nowrap;

    &.highlight {
      color: #ffffff;
      text-shadow: 0 0 18px rgba(255, 255, 255, 0.7);
    }
  }
`;

const FinalHeroTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  z-index: 10;
  pointer-events: none;
  width: 100vw;
  padding: 0 1.5rem;
  box-sizing: border-box;
`;

const FinalName = styled.h1`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 7.5vw, 5.5rem);
  font-weight: 900;
  letter-spacing: clamp(0.06em, 1.2vw, 0.2em);
  line-height: 1.05;
  color: #ffffff;
  text-shadow: 0 10px 40px rgba(255, 255, 255, 0.35);
  margin-bottom: 0.75rem;
  white-space: nowrap;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
`;

const FinalSubtitle = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.68rem, 1.6vw, 0.88rem);
  font-weight: 700;
  letter-spacing: clamp(0.06em, 0.8vw, 0.18em);
  text-transform: uppercase;
  color: #94a3b8;
  text-align: center;
  line-height: 1.4;
  text-wrap: balance;
  width: 100%;
`;

const WORD = 'SAKSHAM';

export const IntroPreloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isHidden, setIsHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const finalHeroRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Strict Full-Page Scroll Lock
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'];
      if (keys.includes(e.code) || keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.scrollTo(0, 0);
    document.documentElement.classList.add('is-preloading');
    document.body.classList.add('is-preloading');

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    const unlockScroll = () => {
      document.documentElement.classList.remove('is-preloading');
      document.body.classList.remove('is-preloading');
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
      window.scrollTo(0, 0);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    };

    const overlay = overlayRef.current;
    const main = mainRef.current;
    const finalHero = finalHeroRef.current;

    if (!overlay || !main || !finalHero) {
      unlockScroll();
      return;
    }

    // Dynamically calculate grid cell counts to fill 100vw x 100vh edge-to-edge
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cellW = Math.max(30, Math.min(50, Math.floor(w / 24)));
    const cellH = Math.max(28, Math.min(48, Math.floor(h / 18)));
    const cols = Math.ceil(w / cellW) + 2;
    const rows = Math.ceil(h / cellH) + 2;
    const totalCells = cols * rows;

    // Generate character elements to fill entire matrix
    main.innerHTML = '';
    const chars: HTMLSpanElement[] = [];

    for (let i = 0; i < totalCells; i++) {
      const char = WORD[i % WORD.length];
      const span = document.createElement('span');
      span.className = `spiral-char ${char === 'K' || char === 'M' ? 'highlight' : ''}`;
      span.innerText = char;
      main.appendChild(span);
      chars.push(span);
    }

    // Master GSAP Timeline with exact mathematical centering and smooth transitions
    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        setIsHidden(true);
        unlockScroll();
      },
    });

    gsap.set(overlay, { yPercent: 0 });
    gsap.set(main, { rotation: 0, opacity: 1, scale: 1 });
    // Mathematical Centering: xPercent: -50, yPercent: -50 ensures 100% true center on any resolution
    gsap.set(finalHero, {
      xPercent: -50,
      yPercent: -50,
      top: '50%',
      left: '50%',
      opacity: 0,
      scale: 0.92,
    });
    gsap.set(chars, { opacity: 0, x: 0, y: 0, scale: 0 });

    // 1. Stage 1 (2.0s): Archimedean Polar Spiral Ingress (elastic.out)
    tl.to(chars, {
      opacity: 1,
      x: (i) => (i / 2 + 10) * Math.cos(i * 5),
      y: (i) => (i / 2 + 10) * Math.sin(i * 5),
      scale: (i) => 0.5 + i / 600,
      ease: 'elastic.out(1.2, 0.5)',
      duration: 2.0,
      stagger: 0.003,
    });

    // 2. Stage 2 (2.0s): Full-Viewport Edge-to-Edge Grid Distribution Matrix (power3.inOut)
    tl.to(chars, {
      x: (i) => (i % cols) * cellW - (cols * cellW) / 2 + cellW / 2,
      y: (i) => Math.floor(i / cols) * cellH - (rows * cellH) / 2 + cellH / 2,
      scale: (i) => 1 + (i % 5) * 0.05,
      ease: 'power3.inOut',
      duration: 2.0,
      stagger: -0.002,
    }, '+=0.1');

    // 3. Stage 3 (2.0s): Kinetic Random Scatter & Rotate 360 (power2.inOut)
    tl.to(chars, {
      x: (i) => '+=' + gsap.utils.random(-i * 5 - 150, i * 5 + 150, 5),
      y: (i) => '+=' + gsap.utils.random(-i * 5 - 100, i * 5 + 100, 5),
      rotate: 360,
      ease: 'power2.inOut',
      duration: 2.0,
      stagger: 0.002,
    }, '+=0.1');

    // 4. Stage 4 (3.0s): Secondary Spiral Recoil (power3.out)
    tl.to(chars, {
      opacity: 1,
      x: (i) => (i / 2 + 20) * Math.cos(i * 5),
      y: (i) => (i / 2 + 20) * Math.sin(i * 5),
      scale: (i) => 0.5 + i / 600,
      ease: 'power3.out',
      duration: 3.0,
      stagger: 0.003,
    }, '+=0.1');

    // 5 & 6. Stage 5 & 6 (3.0s): Silky Smooth 360° Stage Spin & Linear Snap Alignment
    tl.to(main, {
      rotation: 360,
      ease: 'power3.inOut',
      duration: 3.0,
    }, '+=0.1');

    tl.to(chars, {
      x: (i) => ((i * 10) % 100) - 50,
      y: 0,
      scale: 1,
      ease: 'power3.out',
      duration: 2.5,
      stagger: 0.002,
    }, '<+0.3');

    // 7. Stage 7 (1.6s): Gentle Dissolve & Velvet Centered Reveal of SAKSHAM
    tl.to(main, {
      opacity: 0,
      scale: 0.8,
      duration: 1.0,
      ease: 'power2.inOut',
    }, '+=0.2');

    tl.to(finalHero, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    }, '<+0.2');

    // 8. Stage 8 (1.1s): Velvet Curtain Exit Wipe Upward after graceful 1.6s pause
    tl.to(overlay, {
      yPercent: -100,
      duration: 1.1,
      ease: 'power4.inOut',
    }, '+=1.6');

    return () => {
      tl.kill();
      unlockScroll();
    };
  }, []);

  if (isHidden) return null;

  return (
    <Overlay ref={overlayRef} aria-hidden="true">
      <BgGrid />
      <AmbientGlow />
      <SpiralViewport>
        <MainContainer ref={mainRef} />

        <FinalHeroTitle ref={finalHeroRef}>
          <FinalName>SAKSHAM</FinalName>
          <FinalSubtitle>Full-Stack Engineer</FinalSubtitle>
        </FinalHeroTitle>
      </SpiralViewport>
    </Overlay>
  );
};
