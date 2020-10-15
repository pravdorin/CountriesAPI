import React from 'react';
import styled from 'styled-components';
import LightLogo from '../../assets/dark-logo.svg';
import DarkLogo from '../../assets/light-logo.svg';
import { useTheme, useUpdateTheme } from '../../context/ThemeContext';

const SwitchThemeButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
`;

const SwitchThemeImage = styled.img`
  width: 16px;
  height: 16px;
  margin-bottom: 0.1em;

  @media (min-width: 1024px) {
    width: 20px;
    height: 20px;
  }
`;

const SwitchThemeText = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  padding-left: 0.5em;
  color: ${(props) =>
  props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const setTheme = useUpdateTheme();
  return (
    <SwitchThemeButton
      type="button"
      onClick={() =>
        setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' })
      }
    >
      <SwitchThemeImage
        src={theme.mode === 'dark' ? LightLogo : DarkLogo}
        alt="switch theme"
      />
      <SwitchThemeText>Dark Mode</SwitchThemeText>
    </SwitchThemeButton>
  );
};
