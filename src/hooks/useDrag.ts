import {
  MouseEvent as ReactMouseEvent, useCallback, useEffect, useState,
} from 'react';
import type IPosition from '../interfaces/IPosition';

interface DragCallback {
  (initialX: number, initialY: number, deltaX: number, deltaY: number): void,
}

interface DragEvent {
  (e: ReactMouseEvent): void,
}

interface DragPosition extends IPosition {
  initialX: number,
  initialY: number,
}

function useDrag(dragCallback: DragCallback): DragEvent {
  const [dragPosition, setDragPosition] = useState<DragPosition | null>(null);

  const onDragStart = useCallback<DragEvent>((e: ReactMouseEvent): void => {
    const { x, y } = (e.target as HTMLElement).getBoundingClientRect();
    setDragPosition({
      x: e.screenX,
      y: e.screenY,
      initialX: x,
      initialY: y,
    });
  }, [setDragPosition]);

  useEffect(() => {
    if (dragPosition) {
      const onDragMove = (e: MouseEvent): void => dragCallback(
        dragPosition.initialX,
        dragPosition.initialY,
        e.screenX - dragPosition.x,
        e.screenY - dragPosition.y,
      );
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
