import { isBrowser } from '@builder.io/qwik/build';

/**
 * Returns the window object if in a browser.
 * @returns The window object or undefined if not in a browser
 */
export const getWindow = (): Window | undefined => {
  if (isBrowser) return window;
};
