import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useTheme } from '../../../context/ThemeContext';
import BackArrowDarkTheme from '../../../assets/BackArrowDarkTheme.svg';
import BackArrowLightTheme from '../../../assets/BackArrowLightTheme.svg';

const CountryPageBlock = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;

const LinkBack = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  width: 100px;
  text-decoration: none;
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.29);
  border-radius: 2px;
  font-size: 14px;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  padding: 10px 20px;
  margin: 40px 0 65px 30px;
  white-space: nowrap;
`;

const LinkImage = styled.img`
  margin-right: 10px;
`;

const CountryItem = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    align-items: start;
  }
`;

const FlagBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: auto;
    padding: 40px 10%;  
  }
`;

const FlagImage = styled.img`
  width: 320px;
  height: 230px;
  object-fit: contain;

  @media (min-width: 768px) {
    width: 450px;
    height: 300px;
  }

  @media (min-width: 1024px) {
    width: 100%;

  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

const ListBlock = styled.div`
    @media (min-width: 768px) {
      display: flex;
      justify-content: space-around;
    }
    @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 450px;
  }
`;

const CountryName = styled.h5`
  font-size: 22px;
  font-weight: 800;
  padding-top: 35px;

  @media (min-width: 768px) {
    font-size: 22px;
    padding-top: 25px;
    padding-left: 40px;
  }

  @media (min-width: 1024px) {
    padding-top: 0;
    padding-left: 0;
  }
`;

const MainInfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const MainInfoItem = styled.li`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  padding-bottom: 15px;
`;

const MainInfoItemData = styled.span`
  font-weight: 300;
`;

const AdditionalInfoList = styled.ul`
  margin: 30px 0 0 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
      margin: 0;
  }
`;

const AdditionalInfoItem = styled.li`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  padding-bottom: 15px;
`;

const AdditionalInfoItemData = styled.span`
  font-weight: 300;
`;

const BorderBlock = styled.div`
  width: 250px;

  @media (min-width: 1024px) {
    width: 450px;
    margin-top: 60px;
  }
`;

const BorderCountries = styled.h5`
  font-size: 16px;
  color: ${(props) =>
  props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
    
  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

const BorderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0 0 20px 0;
  list-style: none;
`;

const BorderItem = styled.li`
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)'};
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  border-radius: 2px;
  padding: 5px 30px;
  margin-right: 10px;
  margin-top: 15px;
  white-space: nowrap;
`;

const BorderLink = styled(Link)`
  color: ${(props) =>
    props.theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'};
  text-decoration: none;
`;

export const CountryPage = ({ match }) => {
  const [country, setCountry] = useState([]);
  const [border, setBorder] = useState([]);
  const [hasError, setHasError] = useState(false);

  const theme = useTheme();

  const {
    params: { name },
  } = match;

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then((res) => {
        setCountry(res.data[0]);
      })
      .catch(() => setHasError(true));
  }, [match]);

  useEffect(() => {
    const responses = country.borders?.map(async (country) => {
      const name = await axios
        .get(`https://restcountries.eu/rest/v2/alpha/${country}`)
        .then((res) => {
          return res.data.name;
        });
      return name;
    });

    if (responses !== undefined) {
      Promise.all(responses).then((res) => {
        return setBorder(res);
      });
    }
  }, [country]);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const populationWithCommas = numberWithCommas(country.population);

  return (
    <>
      {hasError ? (
        <div>Error!</div>
      ) : (
        <CountryPageBlock>
          <LinkBack to="/">
            <LinkImage
              src={
                theme.  mode === 'dark' ? BackArrowDarkTheme : BackArrowLightTheme
              }
            />
            Back
          </LinkBack>
          <CountryItem>
          <FlagBlock>
            <FlagImage src={country.flag} alt={country.name} />
          </FlagBlock>
          <InfoBlock>
              <CountryName>{country.name}</CountryName>
            <ListBlock>
            <MainInfoList>
              <MainInfoItem>
                Native Name:{' '}
                <MainInfoItemData>{country.nativeName}</MainInfoItemData>
              </MainInfoItem>
              <MainInfoItem>
                Population:{' '}
                <MainInfoItemData>{populationWithCommas}</MainInfoItemData>
              </MainInfoItem>
              <MainInfoItem>
                Region: <MainInfoItemData>{country.region}</MainInfoItemData>
              </MainInfoItem>
              <MainInfoItem>
                Sub Region:{' '}
                <MainInfoItemData>{country.subregion}</MainInfoItemData>
              </MainInfoItem>
              <MainInfoItem>
                Capital: <MainInfoItemData>{country.capital}</MainInfoItemData>
              </MainInfoItem>
            </MainInfoList>
            <AdditionalInfoList>
              <AdditionalInfoItem>
                Top Level Domain:
                {country.topLevelDomain &&
                  country.topLevelDomain.map((dm) => (
                    <AdditionalInfoItemData key={dm}>
                      {' '}
                      {dm}
                    </AdditionalInfoItemData>
                  ))}
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                Currencies:
                {country.currencies &&
                  country.currencies.map((cur) => (
                    <AdditionalInfoItemData key={cur}>
                      {' '}
                      {cur.name}
                    </AdditionalInfoItemData>
                  ))}
              </AdditionalInfoItem>
              <AdditionalInfoItem>
                Languages:
                {country.languages &&
                  country.languages.map((lan) => (
                    <AdditionalInfoItemData key={lan.name}>
                      {' '}
                      {lan.name}
                    </AdditionalInfoItemData>
                  ))}
              </AdditionalInfoItem>
                </AdditionalInfoList>
            <BorderBlock>
            <BorderCountries>Border Countries:</BorderCountries>
              <BorderList>
                {border &&
                  border.map((br) => {
                    const name = br.toLowerCase().trim();
                    return (
                      <BorderItem key={br}>
                        <BorderLink to={`/country/${name}`}>{br}</BorderLink>
                      </BorderItem>
                    );
                  })}
              </BorderList>      
            </BorderBlock>              
            </ListBlock>
              </InfoBlock>
                          
          </CountryItem>
        </CountryPageBlock>
      )}
    </>
  );
};
