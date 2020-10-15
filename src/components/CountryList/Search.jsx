import React from 'react'
import styled from 'styled-components';
import SearchDarkTheme from '../../assets/SearchDarkTheme.svg';
import SearchLightTheme from '../../assets/SearchLightTheme.svg';
import { useTheme } from '../../context/ThemeContext';

const SearchBox = styled.div`
  position: relative;
  display: inline;
  margin-top: 25px;
  margin-bottom: 40px;
  @media (min-width: 1024px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

const Input = styled.input`
  width: calc(100% - 80px);
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
  color: ${(props) =>
  props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  box-shadow: 0 2px 9px 0 rgba(0,0,0,0.05);
  border: none;
  border-radius: 5px;
  padding: 17px 0px 17px 70px;
  font-size: 14px;

  ::placeholder,
  ::-webkit-input-placeholder {
  opacity: 1 !important;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  }
  background-color: ${(props) =>
  props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};

  @media (min-width: 400px) {
    padding: 17px 0px 17px 55px;
  }

  @media (min-width: 768px) {
    padding: 20px 0px 20px 70px;
  }
    
  @media (min-width: 1024px) {
    width: 480px;
    padding: 17.5px 0px 17.5px 60px;
  }
`;


const InputSearch = styled.img`
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translate(-10%, -50%);

    @media (min-width: 400px) {
        left: 7%;
        transform: translate(-7%, -50%);
    }

    @media (min-width: 768px) {
        left: 5%;
        transform: translate(-5%, -50%);
    }
`;

export const Search = ({ searchTherm, setSearchTherm }) => {
  const theme = useTheme();

  function editSearchTherm(e) {
    setSearchTherm(e.target.value)
  }

  return (
    <SearchBox>
      <Input
        type="text"
        value={searchTherm}
        onChange={editSearchTherm}
        placeholder="Search for a country"
      />
      <InputSearch src={
              theme.mode === 'dark' ? SearchDarkTheme : SearchLightTheme
            } />
    </SearchBox>
  );
}
