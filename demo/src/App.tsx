import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { DemoShowcase } from './components/DemoShowcase';
import type { DemoItem } from './components/DemoShowcase';
import './app.css';

const heroItems: DemoItem[] = [
  {
    id: 'mountain',
    title: 'Mountain Escape',
    description: 'Experience tranquil hikes through misty alpine forests.',
    media: <span className="demo-chip">Outdoors</span>
  },
  {
    id: 'city',
    title: 'City Lights',
    description: 'Discover vibrant nightlife and hidden cafes across the city.',
    media: <span className="demo-chip">Urban</span>
  },
  {
    id: 'ocean',
    title: 'Ocean Breeze',
    description: 'Unwind with sunset kayak trips and seaside dining.',
    media: <span className="demo-chip">Water</span>
  }
];

const cardPalette = ['#f97316', '#22d3ee', '#a855f7', '#4ade80'];

function buildProductItems(): DemoItem[] {
  return Array.from({ length: 8 }).map((_, index) => ({
    id: `product-${index + 1}`,
    title: `Starter Kit #${index + 1}`,
    description: 'Everything you need to get started in one curated bundle.',
    media: (
      <div
        className="demo-swatch"
        style={{ background: cardPalette[index % cardPalette.length] }}
      />
    )
  }));
}

const contentItems: DemoItem[] = [
  {
    id: 'react-hooks',
    title: 'React Hooks Deep Dive',
    description: 'Understand custom hooks, reducers, and architectural patterns.',
    media: <span className="demo-chip demo-chip--accent">Workshop</span>
  },
  {
    id: 'testing-library',
    title: 'Testing Library Recipes',
    description: 'Level up your testing strategy with accessible queries and async flows.',
    media: <span className="demo-chip demo-chip--accent">Article</span>
  },
  {
    id: 'design-tokens',
    title: 'Design Tokens in Practice',
    description: 'Bridge design and engineering with scale-ready token systems.',
    media: <span className="demo-chip demo-chip--accent">Video</span>
  },
  {
    id: 'micro-frontends',
    title: 'Micro Frontends that Work',
    description: 'Learn integration patterns that keep teams autonomous and aligned.',
    media: <span className="demo-chip demo-chip--accent">Podcast</span>
  }
];

export default function App(): ReactElement {
  const productItems = useMemo(buildProductItems, []);

  return (
    <main className="demo-layout">
      <header className="demo-hero">
        <h1>react-anything-carousel</h1>
        <p>
          Drop any content into a fully accessible carousel that adapts to your layout,
          data, and design system.
        </p>
      </header>

      <DemoShowcase
        title="Featured Destinations"
        subtitle="Mix and match your own custom card components."
        items={heroItems}
        visibleSlides={1}
      />

      <DemoShowcase
        title="Product Bundles"
        subtitle="Use responsive breakpoints to show more slides on larger screens."
        items={productItems}
        visibleSlides={3}
      />

      <DemoShowcase
        title="Fresh Resources"
        subtitle="Combine media, badges, and call-to-actions."
        items={contentItems}
        visibleSlides={2}
      />
    </main>
  );
}
