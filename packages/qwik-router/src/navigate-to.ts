import type { RouteState } from './types';
import { generateNewUrlStateFromPath } from './utils/generate-new-url-from-path';
import { getHistory } from './utils/get-window';
import { updateRouteState } from './utils/update-route-state';

/**
 * Navigate to a new path by pushing a new state to the history object. It updates the route state.
 */
export function navigateTo(routeState: RouteState, path: string): void {
  const newState = generateNewUrlStateFromPath(routeState.origin, path);
  getHistory()?.pushState(newState, '', path);
  updateRouteState(routeState, newState);
}
