import React, {
  ReactElement, useCallback, useMemo, useState,
} from 'react';
import Patch from '../patch';
import type IPosition from '../interfaces/IPosition';

import styles from './styles.module.scss';

interface PatchioProps {
  className?: string,
}

interface PatchClasses {
  [id: string]: {
    name: string,
  },
}

interface PatchData {
  [id: string]: {
    patchClass: string,
    x: number,
    y: number,
  },
}

const Patchio = ({ className }: PatchioProps): ReactElement => {
  const patchClasses: PatchClasses = {
    multiply: {
      name: 'Multiply',
    },
    add: {
      name: 'Add',
    },
  };

  const [patchData, setPatchData] = useState<PatchData>({
    1: {
      patchClass: 'multiply',
      x: 30,
      y: 20,
    },
    2: {
      patchClass: 'add',
      x: 90,
      y: 90,
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
  }, [patchData, setPatchData]);

  const patches = useMemo(() => Object
    .entries(patchData).map(([key, { patchClass, x, y }], i) => (
      <Patch
        key={key}
        name={patchClasses[patchClass].name}
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
