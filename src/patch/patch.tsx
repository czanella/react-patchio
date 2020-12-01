import React, { useCallback, useEffect, useState } from 'react';
import type IPosition from '../interfaces/IPosition';

import styles from './styles.module.scss';

interface PatchProps extends IPosition {
  className?: string,
  name: string,
  // eslint-disable-next-line no-unused-vars
  onDrag(patchId: string, x: number, y: number): void,
  order: number,
  patchId: string,
}

interface DragPosition extends IPosition {
  initialX: number,
  initialY: number,
}

const Patch = ({
  className, name, onDrag = () => {}, order, patchId, x, y,
} : PatchProps) => {
  const style = { transform: `translate(${x}px, ${y}px` };
  const [dragPosition, setDragPosition] = useState<DragPosition | null>(null);

  const onDragStart = useCallback((e : React.MouseEvent) => {
    setDragPosition({
      x: e.screenX,
      y: e.screenY,
      initialX: x,
      initialY: y,
    });
  }, [setDragPosition, x, y]);

  useEffect(() => {
    if (dragPosition) {
      const onDragMove = (e : MouseEvent) => onDrag(patchId,
        e.screenX - dragPosition.x + dragPosition.initialX,
        e.screenY - dragPosition.y + dragPosition.initialY);
      const onDragEnd = () => window.removeEventListener('mousemove', onDragMove);

      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);

      return () => {
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
      };
    }

    return undefined;
  }, [dragPosition]);

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
