# Source Overview

The `src` directory contains the public library code that ships with the `react-anything-carousel` package.

```
components/   React components exported by the library (Carousel, CarouselItem)
hooks/        Reusable hooks such as `useCarousel`
styles/       Default CSS reset and component styles
types/        Shared TypeScript definitions for the public API
utils/        Internal helpers (keyboard navigation, etc.)
```

Entry points:

- `index.ts` re-exports the public API surface.
- `styles.ts` bundles the default stylesheet for consumers who prefer importing via JS.

Tests live under `__tests__` and rely on Vitest with Testing Library to validate expected behaviour.
