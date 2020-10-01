import React from 'react';
import styled from 'styled-components';
import LightLogo from '../assets/dark-logo.svg';
import DarkLogo from '../assets/dark-logo.svg';

const SwitchThemeButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

const SwitchThemeImage = styled.img`
  width: 16px;
  height: 16px;
  margin-bottom: 0.1em;
`;

const SwitchThemeText = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  padding-left: 0.5em;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    }; 
`;

export const ThemeSwitcher = ({ currentTheme, setCurrentTheme, theme }) => {
  return (
    <SwitchThemeButton
      type="button"
      onClick={() =>
        setCurrentTheme(
          currentTheme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' }
        )
      }
    >
      <SwitchThemeImage
        src={currentTheme.mode === 'dark' ? DarkLogo : LightLogo}
        alt="switch theme"
      />
      <SwitchThemeText>Dark Mode</SwitchThemeText>
    </SwitchThemeButton>
  );
};
