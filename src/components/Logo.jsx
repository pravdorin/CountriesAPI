import React from 'react';
import styled from 'styled-components';

const LogoItem = styled.a`
  font-size: 0.9rem;
  font-weight: 400;
  text-decoration: none;
   color: ${(props) =>
     props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    }; 
`;

export const Logo = () => {
  return (
    <LogoItem href="/">
      Where in the world?
    </LogoItem>
  );
};
