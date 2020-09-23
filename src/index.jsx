import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss';

function Root() {
  return <h1 className={styles.red}>Hello, world.</h1>;
}

// Render the Root element into the DOM
ReactDOM.render(<Root />, document.getElementById('root'));
