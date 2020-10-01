import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { themeReducer } from './reducers/themeReducer';
import { App } from './App';

const store = createStore(themeReducer);

const Index = () => {
  return (
    <App />
  );
};

// Render the Root element into the DOM
ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root'),
);
