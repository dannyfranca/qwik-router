import type { MutableRouteState } from '../types';
import { urlToMutableRouteState } from './url-to-mutable-route-state';

/**
 * Generate a new mutable RouteState from a path. This is useful to generate the properties to mutate the route store.
 * @param routeState The current route state to be updated
 * @param location The location to generate the new route state from
 * @returns A new mutable route state
 */
export const generateNewUrlStateFromPath = (origin: string, location: string): MutableRouteState => {
  const url = new URL(location, origin);
  return urlToMutableRouteState(url);
};
