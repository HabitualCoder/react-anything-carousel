import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import type { CarouselItemProps } from '../types';

function mergeClassNames(...values: Array<string | undefined | false | null>): string {
  return values.filter(Boolean).join(' ');
}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  (props: CarouselItemProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    className,
    children,
    ariaLabel,
    slideIndex,
    slideCount,
    visibleSlides,
    isActive,
    style,
    ...rest
  } = props;

    const mergedClass = mergeClassNames('rac-carousel__item', className);

    const ariaMetadata =
      slideIndex !== undefined && slideCount !== undefined
        ? {
            'aria-posinset': slideIndex + 1,
            'aria-setsize': slideCount
          }
        : {};

  return (
    <div
      {...rest}
      {...ariaMetadata}
      ref={ref}
      className={mergedClass}
      role="group"
      aria-roledescription="slide"
      aria-label={ariaLabel}
      data-active={isActive ? 'true' : undefined}
      data-visible-slides={visibleSlides}
      style={style}
    >
      {children}
    </div>
  );
}
);

CarouselItem.displayName = 'CarouselItem';
