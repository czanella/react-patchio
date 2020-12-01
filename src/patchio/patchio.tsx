import React, { useCallback, useMemo, useState } from 'react';
import Patch from '../patch';

import styles from './styles.module.scss';

interface PatchioProps {
  className?: string,
}

interface PatchData {
  [id: string]: {
    name: string,
    x: number,
    y: number,
  },
}

const Patchio = ({ className }: PatchioProps) => {
  const [patchData, setPatchData] = useState<PatchData>({
    1: {
      name: 'Multiply',
      x: 30,
      y: 20,
    },
  });

  const onPatchDrag = useCallback((patchId: string, x: number, y: number) => {
    if (!patchData[patchId]) {
      return;
    }

    setPatchData({
      ...patchData,
      [patchId]: {
        ...patchData[patchId],
        x,
        y,
      },
    });
  }, []);

  const patches = useMemo(() => Object
    .entries(patchData).map(([key, { name, x, y }], i) => (
      <Patch
        key={key}
        name={name}
        onDrag={onPatchDrag}
        order={i}
        patchId={key}
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
