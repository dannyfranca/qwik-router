import { match } from "path-to-regexp";
import type {
  RouteParams,
  RouterConfig,
  RouterConfigItem,
} from "packages/qwik-router/src/types";

/**
 * Get the matching route config for a given pathname and the path params values.
 * @param pathname The pathname to match against the route config.
 * @param config The route config to match against.
 * @returns The matching route config and the path params values.
 */
export const getMatchingConfig = (
  pathname: string,
  config: RouterConfig
): { route: RouterConfigItem; params: RouteParams } | null => {
  for (const route of config) {
    const matchFn = match(route.path, { decode: decodeURIComponent });
    const matchResult = matchFn(pathname);

    if (matchResult) {
      return { route, params: matchResult.params as RouteParams };
    }
  }

  return null;
};
