import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { UseCarouselOptions, UseCarouselResult } from '../types';

const DEFAULT_INTERVAL = 6000;

export function useCarousel(options: UseCarouselOptions): UseCarouselResult {
  const {
    itemCount,
    visibleSlides,
    loop,
    initialIndex = 0,
    autoPlay = false,
    autoPlayInterval = DEFAULT_INTERVAL,
    onSlideChange
  } = options;

  const maxIndex = useMemo(() => Math.max(itemCount - visibleSlides, 0), [
    itemCount,
    visibleSlides
  ]);

  const normalize = useCallback(
    (index: number) => {
      if (itemCount === 0) {
        return 0;
      }

      if (loop) {
        const normalized = index % itemCount;
        return normalized < 0 ? normalized + itemCount : normalized;
      }

      return Math.min(Math.max(index, 0), maxIndex);
    },
    [itemCount, loop, maxIndex]
  );

  const [activeIndex, setActiveIndex] = useState<number>(() => normalize(initialIndex));
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
  setActiveIndex((prev: number) => normalize(prev));
  }, [normalize]);

  const updateIndex = useCallback(
    (getNext: (previous: number) => number) => {
  setActiveIndex((previous: number) => {
        const nextIndex = normalize(getNext(previous));
        if (nextIndex === previous) {
          return previous;
        }

        onSlideChange?.(nextIndex);
        return nextIndex;
      });
    },
    [normalize, onSlideChange]
  );

  const goTo = useCallback((index: number) => updateIndex(() => index), [updateIndex]);

  const next = useCallback(() => updateIndex((previous) => previous + 1), [updateIndex]);

  const prev = useCallback(() => updateIndex((previous) => previous - 1), [updateIndex]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (!autoPlay || itemCount <= visibleSlides || isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
  updateIndex((previous: number) => previous + 1);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, itemCount, visibleSlides, isPaused, updateIndex]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const visibleRange = useMemo((): [number, number] => {
    if (itemCount === 0) {
      return [0, 0];
    }

    const end = Math.min(activeIndex + visibleSlides - 1, itemCount - 1);
    return [activeIndex, end];
  }, [activeIndex, visibleSlides, itemCount]);

  return {
    activeIndex,
    canGoNext: loop || activeIndex < maxIndex,
    canGoPrev: loop || activeIndex > 0,
    goTo,
    next,
    prev,
    pause,
    resume,
    isPaused,
    slideCount: itemCount,
    visibleRange
  };
}
