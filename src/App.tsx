import React from 'react';
import Patchio from './patchio';

import styles from './App.module.scss';

const App = () => (
  <div className={styles.app}>
    <Patchio className={styles.patchio} />
  </div>
);

export default App;
