import React, { createContext } from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#ffffff',
  },
  dark: {
    foreground: '#ffffff',
    background: '#000000',
  },
};

// Define a type for the theme
type Theme = {
  foreground: string;
  background: string;
};

// Create a context with default value
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light, // default theme
  setTheme: () => {}, // placeholder function
});
