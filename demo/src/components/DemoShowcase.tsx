import type { FC, ReactNode } from 'react';
import { Carousel, CarouselItem } from 'react-anything-carousel';
import 'react-anything-carousel/styles';

export interface DemoItem {
  id: string;
  title: string;
  description: string;
  media?: ReactNode;
}

export interface DemoShowcaseProps {
  title: string;
  subtitle?: string;
  items: DemoItem[];
  visibleSlides?: number;
}

export const DemoShowcase: FC<DemoShowcaseProps> = ({
  title,
  subtitle,
  items,
  visibleSlides = 3
}: DemoShowcaseProps) => (
  <section className="demo-showcase">
    <header className="demo-showcase__header">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>

    <Carousel
      className="demo-showcase__carousel"
      visibleSlides={visibleSlides}
      gap={20}
      loop
      ariaLabel={title}
      showIndicators
    >
  {items.map((item: DemoItem) => (
        <CarouselItem key={item.id} ariaLabel={item.title}>
          <article className="demo-card">
            {item.media ? <div className="demo-card__media">{item.media}</div> : null}
            <div className="demo-card__body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        </CarouselItem>
      ))}
    </Carousel>
  </section>
);
