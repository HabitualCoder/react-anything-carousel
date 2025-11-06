import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useMemo
} from 'react';
import type { CSSProperties, KeyboardEvent, ReactElement, ReactNode } from 'react';
import { useCarousel } from '../hooks/useCarousel';
import { getNavigationAction } from '../utils/keyboard';
import { CarouselItem } from './CarouselItem';
import type { CarouselItemProps, CarouselProps } from '../types';

const BASE_CLASS = 'rac-carousel';
const VIEWPORT_CLASS = `${BASE_CLASS}__viewport`;
const TRACK_CLASS = `${BASE_CLASS}__track`;
const CONTROLS_CLASS = `${BASE_CLASS}__controls`;
const INDICATORS_CLASS = `${BASE_CLASS}__indicators`;

function mergeClassNames(...values: Array<string | undefined | false | null>): string {
  return values.filter(Boolean).join(' ');
}

function isCarouselItemElement(
  child: ReactNode
): child is ReactElement<CarouselItemProps> {
  return (
    isValidElement(child) &&
    typeof child.type === 'function' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((child.type as any).displayName === 'CarouselItem' ||
      (child.type as any).name === 'CarouselItem')
  );
}

export function Carousel({
  children,
  className,
  visibleSlides: visibleSlidesProp = 1,
  gap: gapProp = 16,
  loop = false,
  autoPlay = false,
  autoPlayInterval,
  initialIndex = 0,
  ariaLabel,
  ariaLive = 'polite',
  showArrows = true,
  showIndicators = true,
  onSlideChange,
  ...rest
}: CarouselProps): ReactElement {
  const items = useMemo<ReactNode[]>(() => Children.toArray(children), [children]);
  const itemCount = items.length;
  const visibleSlides = Math.max(1, visibleSlidesProp);
  const gap = Math.max(0, gapProp);

  const carouselId = useId();
  const trackId = `${carouselId}-track`;

  const {
    activeIndex,
    canGoNext,
    canGoPrev,
    goTo,
    next,
    prev,
    pause,
    resume,
    slideCount,
    visibleRange
  } = useCarousel({
    itemCount,
    visibleSlides,
    loop,
    initialIndex,
    autoPlay,
    autoPlayInterval,
    onSlideChange
  });

  const trackStyle = useMemo(() => {
    const offset = visibleSlides > 0 ? (100 / visibleSlides) * activeIndex : 0;
    return {
      transform: `translateX(-${offset}%)`,
      '--rac-visible': String(visibleSlides),
      '--rac-gap': `${gap}px`
    } as CSSProperties;
  }, [activeIndex, visibleSlides, gap]);

  const decoratedChildren = useMemo<ReactElement[]>(() => {
    return items.map((child: ReactNode, index: number): ReactElement => {
      const isActive = index >= visibleRange[0] && index <= visibleRange[1];

      if (isCarouselItemElement(child)) {
        return cloneElement(child, {
          key: child.key ?? index,
          slideIndex: index,
          slideCount,
          visibleSlides,
          isActive
        });
      }

      return (
        <CarouselItem
          key={index}
          slideIndex={index}
          slideCount={slideCount}
          visibleSlides={visibleSlides}
          isActive={isActive}
        >
          {child}
        </CarouselItem>
      );
    });
  }, [items, slideCount, visibleSlides, visibleRange]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const action = getNavigationAction(event.key);

      if (!action) {
        return;
      }

      event.preventDefault();

      switch (action) {
        case 'prev':
          prev();
          break;
        case 'next':
          next();
          break;
        case 'first':
          goTo(0);
          break;
        case 'last':
          goTo(Math.max(slideCount - visibleSlides, 0));
          break;
      }
    },
    [goTo, next, prev, slideCount, visibleSlides]
  );

  const containerClass = mergeClassNames(BASE_CLASS, className);

  const pageCount = slideCount > 0 ? Math.max(Math.ceil(slideCount / visibleSlides), 1) : 0;

  return (
    <div
      {...rest}
      className={containerClass}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div className={VIEWPORT_CLASS}>
        <div
          id={trackId}
          className={TRACK_CLASS}
          style={trackStyle}
          onKeyDown={handleKeyDown}
          role="list"
          aria-live={ariaLive}
          aria-atomic="false"
          tabIndex={0}
        >
          {decoratedChildren}
        </div>
      </div>

      {showArrows && slideCount > visibleSlides ? (
        <div className={CONTROLS_CLASS} aria-label="Carousel navigation">
          <button
            type="button"
            className={`${CONTROLS_CLASS}-button ${CONTROLS_CLASS}-button--prev`}
            onClick={prev}
            disabled={!canGoPrev}
            aria-controls={trackId}
            aria-label="Previous slide"
          >
            {
              '<'
            }
          </button>
          <button
            type="button"
            className={`${CONTROLS_CLASS}-button ${CONTROLS_CLASS}-button--next`}
            onClick={next}
            disabled={!canGoNext}
            aria-controls={trackId}
            aria-label="Next slide"
          >
            {
              '>'
            }
          </button>
        </div>
      ) : null}

  {showIndicators && pageCount > 1 ? (
        <div className={INDICATORS_CLASS} role="tablist" aria-label="Carousel pagination">
          {Array.from({ length: pageCount }).map((_, pageIndex) => {
            const targetIndex = pageIndex * visibleSlides;
            const isCurrent =
              activeIndex >= targetIndex && activeIndex < targetIndex + visibleSlides;

            return (
              <button
                key={pageIndex}
                type="button"
                role="tab"
                className={`${INDICATORS_CLASS}-dot`}
                aria-selected={isCurrent}
                aria-controls={trackId}
                onClick={() => goTo(targetIndex)}
                onFocus={pause}
                onBlur={resume}
              >
                <span className="sr-only">
                  {`Go to slide ${targetIndex + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
