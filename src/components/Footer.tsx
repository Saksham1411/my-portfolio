import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import { Clock, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const FooterWrapper = styled.footer`
  padding: 4.5rem 0 2.5rem;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#090A0E' : '#F5F4EE')};
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
  position: relative;

  @media (min-width: 768px) {
    padding: 6rem 0 3rem;
  }
`;

const BigNameWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};
  padding-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 4rem;
    padding-bottom: 2rem;
  }
`;

const BigName = styled.div`
  font-size: clamp(2.75rem, 13vw, 13rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.88;
  color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)')};
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.15)')};
  }
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3.5rem;
  }
`;

const BrandBlock = styled.div`
  max-width: 420px;
`;

const BrandRole = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.35rem;
`;

const BrandDesc = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
`;

const RightLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    align-items: flex-end;
    gap: 1.25rem;
  }
`;

const TimePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textSecondary};
  width: fit-content;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.65rem;
`;

const SocialBtn = styled.a`
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
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textMuted};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.span`
  font-family: 'JetBrains Mono', monospace;
`;

const ScrollTopBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.2s ease;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.accentEmerald};
  }
`;

export const Footer: React.FC = () => {
  const [indiaTime, setIndiaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIndiaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterWrapper>
      <div className="container">
        <BigNameWrapper>
          <BigName>{RESUME_DATA.name}</BigName>
        </BigNameWrapper>

        <FooterTop>
          <BrandBlock>
            <BrandRole>{RESUME_DATA.role}</BrandRole>
            <BrandDesc>
              Specializing in distributed systems, microservices architectures, fine-grained authorization,
              and high-performance backend pipelines.
            </BrandDesc>
          </BrandBlock>

          <RightLinks>
            <TimePill>
              <Clock size={13} color="#10B981" />
              <span>Fazilka, India (IST): {indiaTime || 'Loading...'}</span>
            </TimePill>

            <SocialRow>
              <SocialBtn
                href={RESUME_DATA.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="GitHub"
                aria-label="GitHub"
              >
                <Github size={17} />
              </SocialBtn>
              <SocialBtn
                href={RESUME_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </SocialBtn>
              <SocialBtn
                href={`mailto:${RESUME_DATA.email}`}
                data-cursor="Email"
                aria-label="Email"
              >
                <Mail size={17} />
              </SocialBtn>
            </SocialRow>
          </RightLinks>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} {RESUME_DATA.name}. Designed & Engineered with precision.
          </Copyright>

          <ScrollTopBtn onClick={scrollToTop} data-cursor="Scroll Top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </ScrollTopBtn>
        </FooterBottom>
      </div>
    </FooterWrapper>
  );
};
