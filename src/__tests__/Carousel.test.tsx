import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Carousel, CarouselItem } from '../index';
import type { CarouselProps } from '../types';

type RenderCarouselOptions = Partial<CarouselProps>;

function renderCarousel(options: RenderCarouselOptions = {}) {
  const slides = [1, 2, 3, 4].map((value) => (
    <CarouselItem key={value} ariaLabel={`Slide ${value}`}>
      <div data-testid={`slide-${value}`}>Slide {value}</div>
    </CarouselItem>
  ));

  return render(<Carousel {...options}>{slides}</Carousel>);
}

describe('Carousel', () => {
  it('renders the expected number of slides', () => {
    renderCarousel({ visibleSlides: 2 });

    const renderedSlides = screen.getAllByTestId(/^slide-/i);
    expect(renderedSlides).toHaveLength(4);
  });

  it('advances to the next slide when clicking the next button', () => {
    renderCarousel();

    const nextButton = screen.getByRole('button', { name: /next slide/i });
    fireEvent.click(nextButton);

    const activeSlide = screen.getByTestId('slide-2').parentElement;
    expect(activeSlide).toHaveAttribute('data-active', 'true');
  });

  it('disables navigation buttons at the ends when loop is false', () => {
    renderCarousel({ loop: false });

    const prevButton = screen.getByRole('button', { name: /previous slide/i });
    const nextButton = screen.getByRole('button', { name: /next slide/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it('supports keyboard navigation via arrow keys', () => {
    renderCarousel();

    const track = screen.getByRole('list');
    track.focus();

    fireEvent.keyDown(track, { key: 'ArrowRight' });
    const activeSlide = screen.getByTestId('slide-2').parentElement;
    expect(activeSlide).toHaveAttribute('data-active', 'true');

    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    const firstSlide = screen.getByTestId('slide-1').parentElement;
    expect(firstSlide).toHaveAttribute('data-active', 'true');
  });

  it('navigates to a specific page when clicking a pagination dot', () => {
    renderCarousel({ visibleSlides: 2 });

    const paginationDots = screen.getAllByRole('tab');
    fireEvent.click(paginationDots[1]);

    const activeSlide = screen.getByTestId('slide-3').parentElement;
    expect(activeSlide).toHaveAttribute('data-active', 'true');
  });
});
