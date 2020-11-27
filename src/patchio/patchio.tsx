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
      x: 30,
      y: 20,
    },
  });

  const patches = useMemo(() => Object
    .entries(patchData).map(([key, { name, x, y }], i) => (
      <Patch
        key={key}
        name={name}
        order={i}
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
