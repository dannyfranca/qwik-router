/**
 * Returns the window object if in a browser.
 * @returns The window object or undefined if not in a browser
 */
export const getWindow = (): Window | undefined => {
  if (typeof window !== 'undefined') return window;
};

/**
 * Returns the browser history object.
 * @returns The history object or undefined if not in a browser
 */
export const getHistory = (): History | undefined => getWindow()?.history;
