import { useState, useEffect, createContext, useContext } from 'react';
import { Theme, lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextType {
  theme: Theme;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  mode: 'dark',
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export function useThemeState() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('saksham_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to sleek dark mode (matching high-end software engineer vibe)
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('saksham_theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
    document.body.style.backgroundColor = mode === 'dark' ? darkTheme.bgPrimary : lightTheme.bgPrimary;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return { theme, mode, toggleTheme };
}

