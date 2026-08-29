export interface Theme {
  mode: 'light' | 'dark';
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  bgCardHover: string;
  bgElevated: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderSubtle: string;
  borderHover: string;
  accentEmerald: string;
  accentCyan: string;
  accentViolet: string;
  accentAmber: string;
  accentRose: string;
  navBg: string;
  cardShadow: string;
  pillBg: string;
  pillText: string;
  glow: string;
  codeBg: string;
}

export const lightTheme: Theme = {
  mode: 'light',
  bgPrimary: '#FAF9F5',
  bgSecondary: '#F1EFEA',
  bgCard: '#FFFFFF',
  bgCardHover: '#F7F6F1',
  bgElevated: '#FFFFFF',
  textPrimary: '#141416',
  textSecondary: '#545864',
  textMuted: '#848896',
  borderSubtle: 'rgba(0, 0, 0, 0.08)',
  borderHover: 'rgba(0, 0, 0, 0.18)',
  accentEmerald: '#059669',
  accentCyan: '#0284C7',
  accentViolet: '#7C3AED',
  accentAmber: '#D97706',
  accentRose: '#E11D48',
  navBg: 'rgba(250, 249, 245, 0.82)',
  cardShadow: '0 12px 36px -10px rgba(0, 0, 0, 0.06)',
  pillBg: 'rgba(0, 0, 0, 0.05)',
  pillText: '#2B2D33',
  glow: 'rgba(5, 150, 105, 0.15)',
  codeBg: '#F3F2EC',
};

export const darkTheme: Theme = {
  mode: 'dark',
  bgPrimary: '#0C0D11',
  bgSecondary: '#13151D',
  bgCard: '#171923',
  bgCardHover: '#1D202D',
  bgElevated: '#242838',
  textPrimary: '#F4F5F7',
  textSecondary: '#9EA3B2',
  textMuted: '#62687A',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  accentEmerald: '#10B981',
  accentCyan: '#38BDF8',
  accentViolet: '#A78BFA',
  accentAmber: '#FBBF24',
  accentRose: '#FB7185',
  navBg: 'rgba(12, 13, 17, 0.85)',
  cardShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.6)',
  pillBg: 'rgba(255, 255, 255, 0.07)',
  pillText: '#E2E8F0',
  glow: 'rgba(16, 185, 129, 0.25)',
  codeBg: '#111319',
};

