export type CarouselNavigationAction = 'prev' | 'next' | 'first' | 'last' | null;

const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_HOME = 'Home';
const KEY_END = 'End';

export function getNavigationAction(key: string): CarouselNavigationAction {
  switch (key) {
    case KEY_LEFT:
      return 'prev';
    case KEY_RIGHT:
      return 'next';
    case KEY_HOME:
      return 'first';
    case KEY_END:
      return 'last';
    default:
      return null;
  }
}

export function isNavigationKey(key: string): boolean {
  return [KEY_LEFT, KEY_RIGHT, KEY_HOME, KEY_END].includes(key);
}
