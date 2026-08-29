import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppTheme } from '../hooks/useTheme';
import { Sun, Moon, ArrowUpRight, Menu, X, Terminal } from 'lucide-react';

const NavHeader = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${({ $scrolled }) => ($scrolled ? '0.85rem 1.5rem' : '1.35rem 1.5rem')};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  background: ${({ theme, $scrolled }) =>
    $scrolled ? theme.navBg : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(16px)' : 'none')};
  border-bottom: 1px solid
    ${({ theme, $scrolled }) => ($scrolled ? theme.borderSubtle : 'transparent')};

  @media (min-width: 768px) {
    padding: ${({ $scrolled }) => ($scrolled ? '1rem 3rem' : '1.75rem 3rem')};
  }
`;

const NavContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* Logo with Maria João Abrantes character-drop animation */
const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  cursor: pointer;

  &:hover .char-drop {
    transform: translateY(-2px);
    color: ${({ theme }) => theme.accentEmerald};
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.1)')};
  color: ${({ theme }) => theme.accentEmerald};
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(5, 150, 105, 0.2)')};
`;

const CharSpan = styled.span<{ $delay: number }>`
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) ${({ $delay }) => $delay}ms,
    color 0.25s ease;
`;

const NavCenter = styled.nav`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 840px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s ease;
  position: relative;
  padding: 0.4rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 1.5px;
    background: ${({ theme }) => theme.accentEmerald};
    transition: width 0.25s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.textPrimary};

    &::after {
      width: 100%;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    color: ${({ theme }) => theme.accentEmerald};
    transform: scale(1.05);
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#141416')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#141416' : '#FFFFFF')};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);

    .arrow-icon {
      transform: translate(2px, -2px);
    }
  }

  .arrow-icon {
    transition: transform 0.25s ease;
  }

  @media (max-width: 520px) {
    display: none;
  }
`;

const MobileMenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};

  @media (min-width: 840px) {
    display: none;
  }
`;

/* Full-Screen Mobile Drawer */
const MobileDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: ${({ theme }) => theme.bgPrimary};
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 2rem;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 840px) {
    display: none;
  }
`;

const MobileNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const MobileNavLink = styled.a`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    color: ${({ theme }) => theme.accentEmerald};
  }
`;

const MobileDrawerHeader = styled.div`
  position: absolute;
  top: 1.35rem;
  right: 1.5rem;
`;

export const Navigation: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleTheme } = useAppTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  const logoName = 'SAKSHAM';

  return (
    <>
      <NavHeader $scrolled={scrolled}>
        <NavContainer>
          <LogoLink href="#home" data-cursor="Saksham">
            <LogoIcon>
              <Terminal size={18} />
            </LogoIcon>
            <span>
              {logoName.split('').map((char, index) => (
                <CharSpan key={index} $delay={index * 20} className="char-drop">
                  {char}
                </CharSpan>
              ))}
            </span>
          </LogoLink>

          <NavCenter>
            <NavLink href="#work" data-cursor="View Work">
              Selected Work
            </NavLink>
            <NavLink href="#principles" data-cursor="Principles">
              How I Build
            </NavLink>
            <NavLink href="#skills" data-cursor="Tech Radar">
              Systems & Stack
            </NavLink>
            <NavLink href="#experience" data-cursor="Career">
              Experience
            </NavLink>
          </NavCenter>

          <NavActions>
            <ThemeButton
              onClick={toggleTheme}
              aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            >
              {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </ThemeButton>

            <ContactButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenContact();
              }}
              data-cursor="Let's Talk"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={16} className="arrow-icon" />
            </ContactButton>

            <MobileMenuToggle
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </MobileMenuToggle>
          </NavActions>
        </NavContainer>
      </NavHeader>

      <MobileDrawer $isOpen={mobileOpen}>
        <MobileDrawerHeader>
          <MobileMenuToggle onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </MobileMenuToggle>
        </MobileDrawerHeader>
        <MobileNavList>
          <MobileNavLink href="#work" onClick={() => setMobileOpen(false)}>
            Selected Work <ArrowUpRight size={24} />
          </MobileNavLink>
          <MobileNavLink href="#principles" onClick={() => setMobileOpen(false)}>
            How I Build <ArrowUpRight size={24} />
          </MobileNavLink>
          <MobileNavLink href="#skills" onClick={() => setMobileOpen(false)}>
            Systems & Stack <ArrowUpRight size={24} />
          </MobileNavLink>
          <MobileNavLink href="#experience" onClick={() => setMobileOpen(false)}>
            Experience <ArrowUpRight size={24} />
          </MobileNavLink>
          <MobileNavLink
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onOpenContact();
            }}
          >
            Contact & Resume <ArrowUpRight size={24} />
          </MobileNavLink>
        </MobileNavList>
      </MobileDrawer>
    </>
  );
};

