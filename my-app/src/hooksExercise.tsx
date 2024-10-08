import React, { useState,useEffect, useContext } from 'react';
import { ThemeContext, themes } from './themeContext';


export function ClickCounter() {
  const [count, setCount] = useState(0);
  const theme = useContext(ThemeContext);}

 

// Wrapper component to provide context
function ToggleTheme() {
  const { theme, setTheme } = useContext(ThemeContext); // Access theme and setTheme directly from context

  const toggleTheme = () => {
    // Toggle between light and dark themes
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  );
}


export default ToggleTheme;
