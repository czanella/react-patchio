import React from 'react';

import styles from './styles.module.scss';

interface PatchProps {
  className?: string,
  name: string,
}

const Patch = ({ className, name } : PatchProps) => {
  return (
    <div className={[styles.patch, className].join(' ')}>
      <span className={styles.title}>
        {name}
      </span>
    </div>
  );
};

export default Patch;
