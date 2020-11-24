import React from 'react';
import Patch from '../patch';

import styles from './styles.module.scss';

interface PatchioProps {
  className?: string,
}

const Patchio = ({ className } : PatchioProps) => {
  return (
    <div className={[styles.patchio, className].join(' ')}>
      <Patch name="Multiply" />
    </div>
  );
}

export default Patchio;
