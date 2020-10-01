import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import storage from 'local-storage-fallback';
import { Header } from './components/Header';
import './styles/app.scss';

const GlobalStyle = createGlobalStyle`
   body {
    height: 1000px;
    background-color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 98%)'};
    color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    };   
    };
`;

function getInitialTheme() {
  const savedTheme = storage.getItem('theme');
  return savedTheme ? JSON.parse(savedTheme) : { mode: 'light' };
}

export const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    storage.setItem('theme', JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header currentTheme={theme} setCurrentTheme={setTheme} />
    </ThemeProvider>
  );
};
