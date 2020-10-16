import styled from 'styled-components';
import React from 'react';

const Card = styled.div`
  max-width: 100%;
  min-height: 365px;
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
  box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
`;

const FlagImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const InfoBlock = styled.div`
  padding: 24px 0px 24px 24px;
`;

const Name = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  margin: 20px 0 0 0;
  padding-bottom: 15px;
`;

const Population = styled.h5`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  margin: 0;
`;

const PopulationNumber = styled.span`
  font-weight: 300;
`;

const Region = styled.h5`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  padding: 15px 0;
  margin: 0;
`;

const RegionText = styled.span`
  font-weight: 300;
`;

const Capital = styled.h5`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  margin: 0;
`;

const CapitalText = styled.span`
  font-weight: 300;
`;

export const CountryCard = ({ name, flag, region, capital, population }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const pupulationWithCommas = numberWithCommas(population);
  return (
      <Card>
        <FlagImage src={flag} alt={name} />
        <InfoBlock>
          <Name>{name}</Name>
          <Population>
            Population: <PopulationNumber>{pupulationWithCommas}</PopulationNumber>
          </Population>
          <Region>
            Region: <RegionText>{region}</RegionText>
          </Region>
          <Capital>
            Capital: <CapitalText>{capital}</CapitalText>
          </Capital>
        </InfoBlock>
      </Card>
  );
};
