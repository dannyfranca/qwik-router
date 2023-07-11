import { $, useOnWindow } from '@builder.io/qwik';

import type { MutableRouteState, RouteState } from './types';
import { updateRouteState } from './utils/update-route-state';

/**
 * Listen to route changes by listening to the `popstate` and updates the route state.
 * @param routeState The route state to update.
 * @returns A function to stop listening to route changes.
 */
export function listenToRouteChanges(routeState: RouteState) {
  useOnWindow(
    'popstate',
    $((e: Event) => {
      const newState = (e as PopStateEvent).state as MutableRouteState;
      updateRouteState(routeState, newState);
    })
  );
}
