import React, { Suspense, lazy } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { Header } from './components/Header';
import Spinner from './assets/001-loading.svg';
import './styles/app.scss';
const CountryList = lazy(() => import('./components/CountryList'));

export const App = () => {
  return (
    <ThemeContext>
      <Header />
      <div className="hero">
        <Suspense
          fallback={
            <img
              className="spinner"
              src={Spinner}
              alt="loading, wait a moment"
            />
          }
        >
          <CountryList />
        </Suspense>
      </div>
    </ThemeContext>
  );
};
