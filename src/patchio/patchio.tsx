import React from 'react';

import styles from './styles.module.scss';

interface PatchioProps {
  className?: string,
}

const Patchio = ({ className } : PatchioProps) => {
  return (
    <div className={[styles.patchio, className].join(' ')}>
      Yo!
    </div>
  );
}

export default Patchio;
