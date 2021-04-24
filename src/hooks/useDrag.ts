import { useCallback, useEffect, useState } from 'react';
import type IPosition from '../interfaces/IPosition';

interface DragCallback {
  (delta: IPosition): void,
}

interface DragEvent {
  (e: React.MouseEvent): void,
}

function useDrag(dragCallback: DragCallback): DragEvent {
  const [dragPosition, setDragPosition] = useState<IPosition | null>(null);

  const onDragStart = useCallback<DragEvent>((e: React.MouseEvent): void => {
    setDragPosition({
      x: e.screenX,
      y: e.screenY,
    });
  }, [setDragPosition]);

  useEffect(() => {
    if (dragPosition) {
      const onDragMove = (e: MouseEvent): void => dragCallback({
        x: e.screenX - dragPosition.x,
        y: e.screenY - dragPosition.y,
      });
      const onDragEnd = (): void => window.removeEventListener('mousemove', onDragMove);

      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);

      return (): void => {
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
      };
    }

    return undefined;
  }, [dragPosition]);

  return onDragStart;
}

export default useDrag;
