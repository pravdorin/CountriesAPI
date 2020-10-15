import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import { ThemeSwitcher } from './ThemeSwitcher';

const HeaderBlock = styled.header`
  padding: 2em 1em;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06),
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: ${(props) => (props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)')};
`;

const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) {
    padding: 0 80px;
  }
`;

export const Header = () => {
  return (
    <HeaderBlock>
      <HeaderFlex>
        <Logo />
        <ThemeSwitcher />
      </HeaderFlex>
    </HeaderBlock>
  );
};
