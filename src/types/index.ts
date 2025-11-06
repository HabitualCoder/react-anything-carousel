import type { HTMLAttributes, ReactNode } from 'react';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Carousel items to render. */
  children: ReactNode;
  /** How many slides are visible at once. */
  visibleSlides?: number;
  /** Gap between slides in pixels. */
  gap?: number;
  /** Wraps when navigating past the first or last slide. */
  loop?: boolean;
  /** Enables automatic slide rotation. */
  autoPlay?: boolean;
  /** Interval (ms) between automatic slide changes. */
  autoPlayInterval?: number;
  /** Starting slide index. */
  initialIndex?: number;
  /** Accessible label communicated to screen readers. */
  ariaLabel?: string;
  /** aria-live politeness setting for slide changes. */
  ariaLive?: 'off' | 'polite' | 'assertive';
  /** Toggle previous/next arrow buttons. */
  showArrows?: boolean;
  /** Toggle pagination indicators. */
  showIndicators?: boolean;
  /** Callback fired whenever the active slide changes. */
  onSlideChange?: (index: number) => void;
}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label used for pagination/dot buttons. */
  ariaLabel?: string;
  /** @internal */
  visibleSlides?: number;
  /** @internal */
  slideIndex?: number;
  /** @internal */
  slideCount?: number;
  /** @internal */
  isActive?: boolean;
}

export interface UseCarouselOptions {
  itemCount: number;
  visibleSlides: number;
  loop: boolean;
  initialIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
}

export interface UseCarouselResult {
  activeIndex: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  pause: () => void;
  resume: () => void;
  isPaused: boolean;
  slideCount: number;
  visibleRange: [number, number];
}
