import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  backgroundColor: '#f8f9fa',
  textColor: '#000',
  borderColor: '#007bff',
  buttonBackground: '#007bff',
  buttonText: '#fff',
  switchTrackColor: '#767577',
  switchThumbColor: '#f4f3f4',
};

export const darkTheme = {
  backgroundColor: '#333',
  textColor: '#fff',
  borderColor: '#fff',
  buttonBackground: '#1f1f1f',
  buttonText: '#fff',
  switchTrackColor: '#81b0ff',
  switchThumbColor: '#f5dd4b',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
