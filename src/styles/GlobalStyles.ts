import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    background-color: ${({ theme }) => theme.bgPrimary};
    color: ${({ theme }) => theme.textPrimary};
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    max-width: 100vw;
    overflow-x: hidden;
    transition: background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ::selection {
    background: ${({ theme }) => theme.accentEmerald};
    color: #FFFFFF;
  }

  /* Custom Modern Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bgPrimary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.borderHover};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accentEmerald};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  code, pre {
    font-family: 'JetBrains Mono', monospace;
  }

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 480px) {
      padding: 0 1.5rem;
    }

    @media (min-width: 768px) {
      padding: 0 2.5rem;
    }

    @media (min-width: 1200px) {
      padding: 0 3.5rem;
    }
  }

  .fluid-hed {
    font-size: clamp(2rem, 5.5vw, 4.8rem);
    line-height: 1.08;
    letter-spacing: -0.035em;
    font-weight: 800;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .fluid-sub {
    font-size: clamp(1rem, 2vw, 1.45rem);
    line-height: 1.5;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.textSecondary};
  }

  .eyebrow {
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
    color: ${({ theme }) => theme.accentEmerald};
  }
`;
