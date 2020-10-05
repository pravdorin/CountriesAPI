import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CountryCard } from './CountryCard';

const Container = styled.div`
  position: relative;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(264px, 1fr));
  grid-gap: 20px;
`;

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      await axios
        .get('https://restcountries.eu/rest/v2/all')
        .then((res) => setCountries(res.data));
    }
    fetchCountries();
  }, [countries]);
  return (
    <Container>
      <CountryGrid>
        {countries.map((country) => {
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
        })}
      </CountryGrid>
    </Container>
  );
};

export default CountryList;
