import { $, useContext, useContextProvider, useStore } from "@builder.io/qwik";

import type { RouteNavigate, RouteState } from "./types";
import { urlToRouteState } from "./utils/url-to-route-state";
import { listenToRouteChanges } from "./listen-to-route-changes";
import {
  RouteNavigateContext,
  RouteParamsContext,
  RouteStoreContext,
} from "./contexts";
import { navigateTo } from "./navigate-to";

export const initRouter = (strUrl: string) => {
  const url = new URL(strUrl);

  const routeStore = useStore<RouteState>(urlToRouteState(url));
  const goTo: RouteNavigate = $(async (path) => navigateTo(routeStore, path));

  useContextProvider(RouteStoreContext, routeStore);
  useContextProvider(RouteNavigateContext, goTo);

  listenToRouteChanges(routeStore);

  return routeStore;
};

/**
 * A helper hook that returns the current route state.
 * @returns the current route state.
 */
export const useRoute = () => useContext(RouteStoreContext);

/**
 * A helper hook that returns the current route path params.
 * @returns the current route path params.
 */
export const useParams = () => useContext(RouteParamsContext);

/**
 * A helper hook that generates a function to navigate to a new path.
 * @returns a function that can be used to navigate to a new path.
 */
export const useNavigate = () => useContext(RouteNavigateContext);
