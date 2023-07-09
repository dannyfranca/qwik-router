# qwik-router

A SPA-like router for Qwik.

## Why?

Many Qwik native solutions, like routing, are very attached to Qwik City, which is great for most use cases. But sometimes, more than a file-based routing is needed.

Possible use cases are:

- Micro-frontends with Qwik, where you need to load different apps on the same page
- When you need a component-based routing with customized rules.
- When you need multiple routers on the same page.

Thinking of that, I created this router to be used with Qwik based on similar projects like vue-router and react-router.

This follows Qwik principles and is targeted for flexibility. If you don't have unique routing needs, you should use Qwik City.

This component has been used in production in a few projects but is still in beta.

I'll add more documentation and examples in the next few days.

## See a Working Example

```bash
git clone https://github.com/dannyfranca/qwik-router.git
pnpm i
pnpm run dev
```

## Initiating the router

To initiate the router, import the `initRouter` and execute in the Root component giving a string URL as input.

This will create a [Qwik context](https://qwik.builder.io/docs/components/context/) that will be changed every time the app navigates using the [`navigateTo`](./src/navigate-to.ts), the [`Link`](#the-link-component) component or the `window` object `popstate` event.

```typescript
import { initRouter } from '@aferry/qwik-router';

const Root = component$((props: { url: string }) => {
  initRouter(props.url);

  return <Child />;
});
```

## Reacting to Route Changes

The route state is a reactive [Qwik store](https://qwik.builder.io/docs/components/state/#usestore) with the interface [`RouteState`](./src/types.ts#RouteState) shared with a [Qwik context](https://qwik.builder.io/docs/components/context/).

Import the `useRoute` and set up a [lifecycle task](https://qwik.builder.io/docs/components/lifecycle/).

```typescript
import { useVisibleTask$, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { useRoute } from '@aferry/qwik-router';

const App = component$(() => {
  const routeState = useRoute();

  useVisibleTask$(({ track }) => {
    track(() => routeState.pathname);
    track(() => routeState.search);
    // react to pathname and search changes only when component becomes visible on the browser.
  }, {
    strategy: 'intersection-observer'
  });

  useTask$(({ track }) => {
    track(() => routeState);
    if (isServer) {
      // execute some code before components render on the server
    } else {
      // react to any changes on the browser
    }
  });

  return <Child />;
});
```

## Navigating

### The `useNavigate` Hook

This hook creates a navigation function.

```typescript
import { $, useOnWindow } from '@builder.io/qwik';
import { useNavigate } from '@aferry/qwik-router';

const App = component$(() => {
  const nav = useNavigate();

  return <Child onClick$={() => {
    nav('/new-path?param=value#new-hash')
  }} />;
});
```

### The `Link` Component

Use the Link component like an anchor tag. It uses the `useNavigate` hook under the hood to navigate.

You can add an optional `activeClassName` prop to config the class that will be added when the link matches the active path.

```typescript
import { $, useOnWindow } from '@builder.io/qwik';
import { Link } from '@aferry/qwik-router';

const NewPathNav = component$(() => {
  return <Link activeClassName="active" href="/new-path">Go to New Path</Link>;
});
```

## Component Routing

Inspired by the API of `react-router` and `vue-router`, the component routing uses the same underlying engine to identify the router and route to a configured component.

All you have to do is create a route config file and serve the `Router` component with the `routes` properties.

It is important to attribute the Component function to the component prop, not the JSX instance.

```typescript
// routes.ts
import { RouterConfig } from '@aferry/qwik-router';
import { RouteComponent1 } from './components/RouteComponent1';
import { RouteComponent2 } from './components/RouteComponent2';
import { RouteComponent3 } from './components/RouteComponent3';

const routes: RouterConfig = [
  {
    path: '/:lang/route-1',
    component: RouteComponent1,
  },
  {
    path: '/:lang/route-2',
    component: RouteComponent2,
  },
  {
    path: '/:lang/route-3',
    component: <RouteComponent3 />, // Wrong
  },
];
```

The Router component has an optional `defaultComponent` property to be used when no path is matched.

```typescript
// App.tsx
import { $, useOnWindow } from '@builder.io/qwik';
import { initRouter, Router } from '@aferry/qwik-router';
import { routes } from './routes.ts';
import { DefaultRouteComponent } from './components/DefaultRoute';

const App = component$((props: { url: string }) => {
  initRouter(props.url);

  return <Router routes={routes} defaultComponent={DefaultRouteComponent} />;
});
```

## How It Works

All the routing is about changing the route state and reacting to it.

While navigating by the Qwik Router, a `history.pushState` is executed with a state of type [`MutableRouteState`](./src/types.ts#MutableRouteState).

A listener is set to react to the `popstate` event and receive the state of type [`MutableRouteState`](./src/types.ts#MutableRouteState) to update the reactive route state.

