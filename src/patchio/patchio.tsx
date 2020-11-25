import React, { useMemo, useState } from 'react';
import Patch from '../patch';

import styles from './styles.module.scss';

interface PatchioProps {
  className?: string,
}

const Patchio = ({ className }: PatchioProps) => {
  const [patchData] = useState({
    1: {
      name: 'Multiply',
      x: 0,
      y: 0,
    },
  });

  const patches = useMemo(() => Object
    .entries(patchData).map(([key, { name, x, y }]) => (
      <Patch
        key={key}
        name={name}
        x={x}
        y={y}
      />
    )),
  [patchData]);

  return (
    <div className={[styles.patchio, className].join(' ')}>
      {patches}
    </div>
  );
};

export default Patchio;
