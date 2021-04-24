import React, { useCallback, useState } from 'react';
import useDrag from '../hooks/useDrag';
import type IPosition from '../interfaces/IPosition';

import styles from './styles.module.scss';

interface PatchProps extends IPosition {
  className?: string,
  name: string,
  onDrag(patchId: string, delta: IPosition): void,
  order: number,
  patchId: string,
}

const Patch = ({
  className, name, onDrag, order, patchId, x, y,
}: PatchProps) => {
  const style = { transform: `translate(${x}px, ${y}px` };
  const [initialPosition, setInitialPosition] = useState<IPosition>({ x, y });

  const onDragStart = useDrag(
    (delta: IPosition) => onDrag(patchId, {
      x: initialPosition.x + delta.x,
      y: initialPosition.y + delta.y,
    }),
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setInitialPosition({ x, y });
    onDragStart(e);
  }, [setInitialPosition, onDragStart, x, y]);

  return (
    <div
      className={[styles.patch, className].join(' ')}
      onMouseDown={onMouseDown}
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
