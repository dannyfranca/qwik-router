import type { MutableRouteState, RouteState } from '../types';

/**
 * Update the routing state with the given properties.
 * @param routingState The current routing state to be updated
 * @param newRoutingProps The new properties to update the routing state with
 */
export const updateRouteState = (
  routingState: RouteState,
  newRoutingProps: MutableRouteState
) => {
  Object.assign(routingState, newRoutingProps);
};
