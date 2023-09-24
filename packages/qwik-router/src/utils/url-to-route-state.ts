import type { RouteState } from '../types';
import { urlToMutableRouteState } from './url-to-mutable-route-state';

/**
 * Convert a URL object to a routing state. This is useful to generate the initial routing state.
 * @param url The URL object to convert to a routing state
 * @returns A new routing state
 */
export const urlToRouteState = (url: URL): RouteState => ({
  origin: url.origin,
  host: url.host,
  hostname: url.hostname,
  port: url.port,
  protocol: url.protocol,
  username: '',
  password: '',
  searchParams: url.searchParams,
  toString: url.toString,
  toJSON: url.toJSON,
  ...urlToMutableRouteState(url),
});
