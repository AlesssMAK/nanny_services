import { createContext } from 'react';
import type { Theme } from '../../types/theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
