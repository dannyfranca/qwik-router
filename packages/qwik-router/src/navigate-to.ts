import { isBrowser } from '@builder.io/qwik/build';

import type { RouteState } from './types';
import { generateNewUrlStateFromPath } from './utils/generate-new-url-from-path';
import { getWindow } from './utils/get-window';
import { updateRouteState } from './utils/update-route-state';

/**
 * Navigate to a new path by pushing a new state to the history object. It updates the route state.
 */
export function navigateTo(routeState: RouteState, path: string): void {
  if (isBrowser) {
    const newState = generateNewUrlStateFromPath(routeState, path);
    getWindow()?.history?.pushState(newState, path, path);
    updateRouteState(routeState, newState);
  }
}
