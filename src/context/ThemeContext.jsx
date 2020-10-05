import React, { useState, useContext, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import storage from 'local-storage-fallback';

const GlobalStyle = createGlobalStyle`
   body {
    background-color: ${(props) => (props.theme.mode === 'dark' ? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 98%)')};
    color: ${(props) => (props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)')};
  };   
`;

const ThemeCtx = React.createContext();
const ThemeUpdateCtx = React.createContext();

export function useTheme() {
  return useContext(ThemeCtx);
}

export function useUpdateTheme() {
  return useContext(ThemeUpdateCtx);
}

function getInitialTheme() {
  const savedTheme = storage.getItem('theme');
  return savedTheme ? JSON.parse(savedTheme) : { mode: 'light' };
}

export const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    storage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeCtx.Provider value={theme}>
      <ThemeUpdateCtx.Provider value={setTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </ThemeUpdateCtx.Provider>
    </ThemeCtx.Provider>
  );
};
