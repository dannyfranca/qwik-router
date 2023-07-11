import { createContextId } from '@builder.io/qwik';

import type { RouteNavigate, RouteParams, RouteState } from './types';

export const RouteStoreContext = createContextId<RouteState>('com.dannyfranca.route.store');

export const RouteNavigateContext = createContextId<RouteNavigate>('com.dannyfranca.route.navigate');

export const RouteParamsContext = createContextId<RouteParams>('com.dannyfranca.route.params');
