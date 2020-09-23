import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const Index = () => (
  <App />
);

// Render the Root element into the DOM
ReactDOM.render(<Index />, document.getElementById('root'));
