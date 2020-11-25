import React from 'react';

import styles from './styles.module.scss';

interface PatchProps {
  className?: string,
  name: string,
  x: number,
  y: number,
}

const Patch = ({
  className, name, x, y,
} : PatchProps) => {
  const style = { left: `${x}px`, top: `${y}px` };
  return (
    <div
      className={[styles.patch, className].join(' ')}
      style={style}
    >
      <span className={styles.title}>
        {name}
      </span>
    </div>
  );
};

export default Patch;
