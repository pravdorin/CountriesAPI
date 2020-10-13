import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const Index = () => {
  return (
    <App />
  );
};

// Render the Root element into the DOM
ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
