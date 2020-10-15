import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { useTheme } from '../../context/ThemeContext';

import SelectArrowDarkTheme from '../../assets/SelectArrowDarkTheme.svg';
import SelectArrowLightTheme from '../../assets/SelectArrowLightTheme.svg';

const CustomSelect = styled(Select)`
  & .react-select__control {
    background-color: ${(props) =>
  props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
    box-shadow: 0 2px 9px 0 rgba(0,0,0,0.05);
    border: none;
    border-radius: 5px;
    padding: 10px 0px 10px 20px;
    width: 200px;
    font-size: 14px;
    white-space: nowrap;
  }

  & .react-select__value-container {
    color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  }

  & .react-select__single-value {
    color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  }

  & .react-select__menu {
    background-color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
  }

  & .react-select__option {
    background-color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
    color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  }

  & .react-select__placeholder {
    color: ${(props) =>
      props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    font-family: Helvetica;
  }

  & .react-select__indicator-separator {
    display: none;
  }

  & .react-select__indicator {
    margin-right: 15px;
  }
`;

const options = [
  { value: 'all', label: 'All' },
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
];

export const RegionSelect = ({ region, setRegion }) => {
  const theme = useTheme();

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img
          src={
            theme.mode === 'dark' ? SelectArrowDarkTheme : SelectArrowLightTheme
          }
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <CustomSelect
      classNamePrefix="react-select"
      components={{ DropdownIndicator }}
      defaultValue={region}
      onChange={setRegion}
      options={options}
      placeholder="Filter by Region"
    />
  );
};
