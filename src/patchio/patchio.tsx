import React, {
  ReactElement, useCallback, useMemo, useState,
} from 'react';
import Patch from '../patch';
import type IPosition from '../interfaces/IPosition';

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

const Patchio = ({ className }: PatchioProps): ReactElement => {
  const [patchData, setPatchData] = useState<PatchData>({
    1: {
      name: 'Multiply',
      x: 30,
      y: 20,
    },
  });

  const onPatchDrag = useCallback((patchId: string, delta: IPosition) => {
    if (!patchData[patchId]) {
      return;
    }

    setPatchData({
      ...patchData,
      [patchId]: {
        ...patchData[patchId],
        ...delta,
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
