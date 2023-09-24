import { component$, useContextProvider, useStore, useTask$ } from '@builder.io/qwik';

import { type RouteParams, type RouterProps } from '../../types';
import { getMatchingConfig } from './get-matching-config';
import { useRoute } from '../../routing';
import { RouteParamsContext } from '../../contexts';

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
    useTask$(() => {
      Object.assign(paramsStore, matchingResults.params);
    });
    Comp = matchingResults.route.component;
    return <Comp />;
  }

  Comp = props.defaultComponent;

  return Comp ? <Comp /> : <></>;
});
