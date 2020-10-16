import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Search } from './Search';
import { RegionSelect } from './RegionSelect';
import { CountryCard } from './CountryCard';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  overflow-x: hidden;
  width: 100%;

  @media (min-width: 1024px) {
    padding: 0 80px;
  }
`;

const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
  grid-gap: 40px;
  padding: 30px 0;

  @media (min-width: 1024px) {
    grid-gap: 75px;
    grid-template-columns: repeat(auto-fit, minmax(264px, 264px));
    justify-content: center;
  }
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    margin-top: 50px;
    margin-bottom: 50px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const CountryCardLink = styled(Link)`
  text-decoration: none;

  @media (min-width: 400px) {
    padding: 0 20px;
  }
`;

const Error = styled.div`
  text-align: center;
  margin-top: 25px;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
`;

const CountryList = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTherm, setSearchTherm] = useState('');
  const [region, setRegion] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => {
        setAllCountries(res.data);
        setCountries(res.data);
      })
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    if (region !== null) {
      const regionLabel = region.label;
      if (regionLabel === 'All') {
        setCountries(allCountries);
      } else {
        const filteredCountries = allCountries.filter((country) => {
          return country.region === regionLabel;
        });
        setCountries(filteredCountries);
      }
    }
  }, [region]);

  useEffect(() => {
    if (region !== null) {
      const regionLabel = region.label;
      if (regionLabel === 'All') {
        const foundedCountries = filterCountries(allCountries)
        setCountries(foundedCountries);
      } else {
        const filteredCountries = allCountries.filter((country) => {
          return country.region === regionLabel;
        });
        const foundedCountries = filterCountries(filteredCountries);
        setCountries(foundedCountries);
      }
    } else {
      const foundedCountries = filterCountries(allCountries);
      setCountries(foundedCountries);
    }
  }, [searchTherm]);

  function filterCountries(countryList) {
    return countryList.filter((country) => {
          return country.name.toLowerCase().includes(searchTherm.toLowerCase());
    });
  }

  function getContryList(list) {
    return list.map((country) => {
      const countryNameURL = country.name.toLowerCase();
      return (
        <CountryCardLink to={`/country/${countryNameURL}`} key={countryNameURL}>
          <CountryCard
            name={country.name}
            flag={country.flag}
            region={country.region}
            capital={country.capital}
            population={country.population}
          />
        </CountryCardLink>
      );
    });
  }


  return (
    <Container>
      <FilterBox>
      <Search searchTherm={searchTherm} setSearchTherm={setSearchTherm} />
      <RegionSelect region={region} setRegion={setRegion} />
      </FilterBox>
      <CountryGrid>
        {hasError ? <Error>Error!</Error> : getContryList(countries)}
      </CountryGrid>
    </Container>
  );
};

export default CountryList;
