# react-anything-carousel

A headless-first React carousel that lets you render any custom content while keeping accessibility and performance top-of-mind.

## Features

- 🎯 **Content-agnostic**: render cards, images, or any custom markup.
- ♿ **Accessible**: keyboard interactions, ARIA roles, and focus management included.
- 🧱 **Composable API**: hook + components so you can opt-in to the parts you need.
- ⚙️ **TypeScript ready**: first-class types for props, events, and public APIs.
- 🧪 **Tested**: unit tests covering critical interactions.

## Getting Started

```bash
npm install react-anything-carousel
```

```tsx
import 'react-anything-carousel/styles';
import { Carousel, CarouselItem } from 'react-anything-carousel';

function ProductCarousel({ items }: { items: Product[] }) {
  return (
    <Carousel visibleSlides={3} gap={16} autoPlayInterval={8000}>
      {items.map((item) => (
        <CarouselItem key={item.id} ariaLabel={item.title}>
          <ProductCard product={item} />
        </CarouselItem>
      ))}
    </Carousel>
  );
}
```

## Props

| Component | Prop | Type | Description |
| --- | --- | --- | --- |
| `Carousel` | `visibleSlides` | `number` | Amount of items shown at once. Defaults to `1`. |
|  | `autoPlay` | `boolean` | Enables automatic slide rotation. |
|  | `autoPlayInterval` | `number` | Interval (ms) between auto rotations. |
|  | `loop` | `boolean` | Wraps around when reaching the ends. |
|  | `gap` | `number` | Gap (px) between items. |
| `CarouselItem` | `ariaLabel` | `string` | Accessible label announced for pagination dots. |

More props and APIs are documented inline with the source until the first public release.

## Development

```bash
npm install
npm run dev         # Storybook-style playground using Vite library mode
npm run test        # Execute unit tests with Vitest
npm run lint        # Lint the project with ESLint
npm run build       # Build the library bundle + type declarations
npm run demo:dev    # Launch the demo site
```

## Demo

The `demo` folder contains a Vite-powered showcase that will be deployed to Vercel.

## Release Process

1. Commit your changes and update `CHANGELOG.md` as needed.
2. Run `npm run test` and `npm run build` to ensure quality.
3. Execute `npm run release` to run the automated release helper.
4. Publish the package manually with `npm publish`.

## Roadmap

- [ ] Improve momentum and touch support.
- [ ] Add SSR-friendly virtualization helpers.
- [ ] Provide design tokens for default themes.
- [ ] Expand documentation with recipes and real-world examples.

---

© 2025 HabitualCoder. Released under the MIT License.
