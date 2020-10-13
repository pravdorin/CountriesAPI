import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { RegionSelect } from './RegionSelect';
import { CountryCard } from './CountryCard';

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
  grid-gap: 40px;
  padding: 30px 0;
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
  const [hasError, setHasError] = useState(false);
  const [region, setRegion] = useState(null);

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

  function getContryList(list) {
    return list.map((country) => {
      return (
        <CountryCard
          name={country.name}
          flag={country.flag}
          region={country.region}
          capital={country.capital}
          population={country.population}
          key={country.name}
        />
      );
    });
  }

  return (
    <Container>
      <RegionSelect region={region} setRegion={setRegion} />
      <CountryGrid>
        {hasError ? <Error>Error!</Error> : getContryList(countries)}
      </CountryGrid>
    </Container>
  );
};

export default CountryList;
