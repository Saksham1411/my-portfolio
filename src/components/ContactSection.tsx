import React, { useState } from 'react';
import styled from 'styled-components';
import { RESUME_DATA } from '../data/resumeData';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Check,
  Copy,
  X,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const CTASection = styled.section`
  padding: 4.5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.borderSubtle};

  @media (min-width: 768px) {
    padding: 7.5rem 0;
  }
`;

const CTAContainer = styled.div`
  max-width: 820px;
  margin: 0 auto;
`;

const CTAEyebrow = styled.p`
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.accentEmerald};
  margin-bottom: 1rem;
`;

const CTAHed = styled.h2`
  font-size: clamp(1.85rem, 5vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.15;
  margin-bottom: 1.25rem;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const CTASub = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.3rem);
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2.25rem;
  line-height: 1.6;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 540px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.25rem;
  }
`;

const BigButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#141416')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#141416' : '#FFFFFF')};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;

  @media (min-width: 540px) {
    width: auto;
    font-size: 1.05rem;
    padding: 1.1rem 2.4rem;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.3);
  }
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 700;
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.25s ease;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 540px) {
    width: auto;
    font-size: 1.05rem;
    padding: 1.1rem 2.2rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.accentEmerald};
    transform: translateY(-3px);
    background: ${({ theme }) => theme.bgCardHover};
  }
`;

/* Modal Overlay & Card */
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`;

const ModalBox = styled.div<{ $isOpen: boolean }>`
  background: ${({ theme }) => theme.bgCard};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem 1.25rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)')};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;

  @media (min-width: 480px) {
    border-radius: 24px;
    padding: 2.5rem;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  @media (min-width: 480px) {
    top: 1.5rem;
    right: 1.5rem;
    width: 36px;
    height: 36px;
  }

  &:hover {
    background: ${({ theme }) => theme.accentEmerald};
    color: #ffffff;
  }
`;

const ModalTitle = styled.h3`
  font-size: clamp(1.35rem, 3.5vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.35rem;
`;

const ModalSub = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  gap: 0.5rem;
  overflow: hidden;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.accentEmerald};
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.1)')};
  flex-shrink: 0;

  &:hover {
    opacity: 0.85;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  font-family: inherit;
  font-size: 0.88rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.accentEmerald};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgSecondary};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  color: ${({ theme }) => theme.textPrimary};
  font-family: inherit;
  font-size: 0.88rem;
  outline: none;
  resize: vertical;
  min-height: 90px;

  &:focus {
    border-color: ${({ theme }) => theme.accentEmerald};
  }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 700;
  background: ${({ theme }) => theme.accentEmerald};
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
  }
`;

interface ContactSectionProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isOpen, onOpen, onClose }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      onClose();
    }, 2500);
  };

  return (
    <>
      <CTASection id="contact">
        <div className="container">
          <CTAContainer>
            <CTAEyebrow>Initiate Collaboration</CTAEyebrow>
            <CTAHed>
              Ready to architect resilient distributed systems?
              <br />
              Let's build together.
            </CTAHed>
            <CTASub>
              Whether you need to scale microservices, deploy fine-grained authorization, or optimize
              high-throughput data pipelines — I'm open to high-impact technical discussions.
            </CTASub>

            <ButtonRow>
              <BigButton onClick={onOpen} data-cursor="Open Modal">
                <Sparkles size={18} />
                <span>Get in touch / Connect</span>
              </BigButton>

              <SecondaryCTA
                href={`mailto:${RESUME_DATA.email}`}
                data-cursor="Send Email"
              >
                <Mail size={16} />
                <span>{RESUME_DATA.email}</span>
              </SecondaryCTA>
            </ButtonRow>
          </CTAContainer>
        </div>
      </CTASection>

      <ModalOverlay $isOpen={isOpen} onClick={onClose}>
        <ModalBox $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <ModalClose onClick={onClose}>
            <X size={18} />
          </ModalClose>

          <ModalTitle>Let's Connect</ModalTitle>
          <ModalSub>
            Direct contact channels for technical opportunities, distributed systems consulting, and
            collaborations.
          </ModalSub>

          <ContactGrid>
            <ContactItem>
              <ContactInfo>
                <Mail size={16} color="#10B981" />
                <span>{RESUME_DATA.email}</span>
              </ContactInfo>
              <CopyBtn onClick={handleCopyEmail}>
                {emailCopied ? <Check size={13} /> : <Copy size={13} />}
                <span>{emailCopied ? 'Copied' : 'Copy'}</span>
              </CopyBtn>
            </ContactItem>

            <ContactItem>
              <ContactInfo>
                <Linkedin size={16} color="#38BDF8" />
                <span>LinkedIn Profile</span>
              </ContactInfo>
              <a
                href={RESUME_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#38BDF8',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                <span>Visit</span>
                <ArrowUpRight size={13} />
              </a>
            </ContactItem>

            <ContactItem>
              <ContactInfo>
                <Github size={16} color="#A78BFA" />
                <span>GitHub Repositories</span>
              </ContactInfo>
              <a
                href={RESUME_DATA.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#A78BFA',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                <span>Visit</span>
                <ArrowUpRight size={13} />
              </a>
            </ContactItem>
          </ContactGrid>

          <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Your Name or Company" required />
            <Input type="email" placeholder="Your Email Address" required />
            <Textarea placeholder="How can we collaborate on high-performance engineering?" required />

            <SubmitBtn type="submit">
              {formSent ? (
                <>
                  <Check size={16} />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Direct Message</span>
                </>
              )}
            </SubmitBtn>
          </Form>
        </ModalBox>
      </ModalOverlay>
    </>
  );
};
