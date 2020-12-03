import React, { ReactElement } from 'react';
import useDrag from '../hooks/useDrag';
import type IPosition from '../interfaces/IPosition';

import styles from './styles.module.scss';

interface PatchProps extends IPosition {
  className?: string,
  name: string,
  onDrag(patchId: string, x: number, y: number): void,
  order: number,
  patchId: string,
}

const Patch = ({
  className, name, onDrag, order, patchId, x, y,
}: PatchProps): ReactElement => {
  const style = { transform: `translate(${x}px, ${y}px` };

  const onDragStart = useDrag(
    (initialX: number, initialY: number, deltaX: number, deltaY: number) => {
      onDrag(patchId, initialX + deltaX, initialY + deltaY);
    },
  );

  return (
    <div
      className={[styles.patch, className].join(' ')}
      onMouseDown={onDragStart}
      role="button"
      style={style}
      tabIndex={order}
    >
      <span className={styles.title}>
        {name}
      </span>
    </div>
  );
};

export default Patch;
