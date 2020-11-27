import React, { useCallback, useEffect, useState } from 'react';
import type IPosition from '../interfaces/IPosition';

import styles from './styles.module.scss';

interface PatchProps extends IPosition {
  className?: string,
  name: string,
  order: number,
}

const Patch = ({
  className, name, order, x, y,
} : PatchProps) => {
  const style = { transform: `translate(${x}px, ${y}px` };
  const [dragPosition, setDragPosition] = useState<IPosition | null>(null);

  const onDragStart = useCallback((e : React.MouseEvent) => {
    setDragPosition({ x: e.screenX, y: e.screenY });
  }, [setDragPosition]);

  useEffect(() => {
    if (dragPosition) {
      const onDragMove = (e : MouseEvent) => console.log({
        x: e.screenX - dragPosition.x,
        y: e.screenY - dragPosition.y,
      });
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
