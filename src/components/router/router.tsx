import { component$, useContextProvider, useStore } from '@builder.io/qwik';

import { useRoute } from '@/routing';
import type { RouteParams, RouterProps } from '@/types';
import { RouteParamsContext } from '@/contexts';
import { getMatchingConfig } from './get-matching-config';

/**
 * Router component that renders a component based on the current path.
 */
export const Router = component$((props: RouterProps) => {
  const routeState = useRoute();
  const paramsStore = useStore<RouteParams>({});
  useContextProvider(RouteParamsContext, paramsStore);

  let Comp: any;
  const matchingResults = getMatchingConfig(routeState.pathname, props.routes);

  if (matchingResults) {
    Object.assign(paramsStore, matchingResults.params);
    Comp = matchingResults.route.component;
    return <Comp />;
  }

  Comp = props.defaultComponent;

  return Comp ? <Comp /> : <></>;
});
