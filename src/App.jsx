import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ThemeContext } from './context/ThemeContext';
import { Header } from './components/Header';
import { CountryPage } from './components/CountryList/CountryPage';
import Spinner from './assets/001-loading.svg';
import './styles/app.css';
const CountryList = lazy(() => import('./components/CountryList'));

const Hero = styled.div`
  position: relative;
  display: flex;
`;

const spinning = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerImage = styled.img`
  display: block;
  margin: 50vh auto;

  top: 50%;

  width: 100px;
  height: 100px;

  animation-name: ${spinning};
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export const App = () => {
  return (
    <ThemeContext>
      <Header />
      <Hero>
        <Suspense fallback={<SpinnerImage src={Spinner} />}>
          <Switch>
            <Route path="/" exact component={CountryList} />
            <Route path="/country/:name" exact component={CountryPage} />
          </Switch>
        </Suspense>
      </Hero>
    </ThemeContext>
  );
};
