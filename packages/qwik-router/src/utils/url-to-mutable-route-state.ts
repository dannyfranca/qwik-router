import type { MutableRouteState } from "../types";

/**
 * Convert a URL object to a mutable routing state. This is useful to generate the properties to mutate the routing store.
 * @param url The URL object to convert to a mutable routing state
 * @returns A new mutable routing state
 */
export const urlToMutableRouteState = (url: URL): MutableRouteState => ({
  href: url.toString(),
  pathname: url.pathname,
  hash: url.hash,
  search: url.search,
  query: Object.fromEntries(url.searchParams.entries()),
});
