import React from 'react';
import styled from 'styled-components';

const FlagImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Card = styled.div`
  max-width: 264px;
`;

export const CountryCard = ({
  name, flag, region, capital, population,
}) => {
  return (
    <Card>
      <FlagImage src={flag} alt={name} />
      <h4>{name}</h4>
      <h5>{population}</h5>
      <h5>{region}</h5>
      <h5>{capital}</h5>
    </Card>
  );
};
