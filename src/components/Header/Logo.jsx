import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoItem = styled(Link)`
  font-size: 0.9rem;
  font-weight: 400;
  text-decoration: none;
  color: ${(props) =>
  props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    
    @media (min-width: 1024px) {
      font-size: 1.5rem;
      font-weight: 600;
    }
`;

export const Logo = () => {
  return (
      <LogoItem to="/">Where in the world?</LogoItem>
  );
};
