<p align="center">
  <img width="600" src="./assets/qwik-router.png" alt="Qwik Router">
</p>
<h1 align="center" dir="auto">A SPA-like router for Qwik</h1>
<p align="center" dir="auto">
<a href="https://npmjs.com/package/qwik-router" target="_blank">
    <img src="https://img.shields.io/npm/dt/qwik-router.svg?style=flat-square&logo=npm" />
</a>
<a href="https://npmjs.com/package/qwik-router" target="_blank">
    <img src="https://img.shields.io/npm/v/qwik-router/latest.svg?style=flat-square&logo=npm" />
</a>
<a href="https://www.codacy.com/manual/qwik-router" target="_blank">
    <img src="https://img.shields.io/codacy/grade/addca1007fb044c3a994c7e0ec504092?style=flat-square&logo=codacy" />
</a>
<a href="https://opensource.org/licenses/MIT" target="_blank">
  <img src="https://camo.githubusercontent.com/fd551ba4b042d89480347a0e74e31af63b356b2cac1116c7b80038f41b04a581/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d677265656e2e737667" alt="MIT" data-canonical-src="https://img.shields.io/badge/License-MIT-green.svg" style="max-width: 100%;">
</a>
</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Why?](#why)
- [See a Working Example](#see-a-working-example)
- [Installing in your Project](#installing-in-your-project)
- [Initiating the router](#initiating-the-router)
- [Reacting to Route Changes](#reacting-to-route-changes)
- [Navigating](#navigating)
  - [The `useNavigate` Hook](#the-usenavigate-hook)
  - [The `Link` Component](#the-link-component)
- [Component Routing](#component-routing)
  - [Matching Patterns](#matching-patterns)
  - [Multiple Routers and URL Parameters](#multiple-routers-and-url-parameters)
- [Roadmap](#roadmap)
- [⭐ Give us a Star ⭐](https://github.com/dannyfranca/qwik-router)
- [Contributing](#contributing)
- [Code Of Conduct](#code-of-conduct)
- [Related Links](#related-links)
- [License](#license)

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
```

```bash
pnpm i
```

```bash
pnpm nx run qwik-router:serve
```

## Installing in your Project
  
```bash
pnpm i qwik-router
```

or

```bash
yarn add qwik-router
```

or

```bash
npm i qwik-router
```

## Initiating the router

To initiate the router, import the `initRouter` and execute in the Root component giving a string URL as input.

This will create a [Qwik context](https://qwik.builder.io/docs/components/context/) that will be changed every time the app navigates using the [`navigateTo`](./src/navigate-to.ts), the [`Link`](#the-link-component) component or the `window` object `popstate` event.

```typescript
// root.tsx
import { component$ } from "@builder.io/qwik";
import { initRouter } from "qwik-router";

export default component$((props: { url: string }) => {
  initRouter(props.url);

  return <Child />;
});
```

## Reacting to Route Changes

The route state is a reactive [Qwik store](https://qwik.builder.io/docs/components/state/#usestore) with the interface [`RouteState`](./src/types.ts#RouteState) shared with a [Qwik context](https://qwik.builder.io/docs/components/context/).

Import the `useRoute` and/or `useParams` and set up a [lifecycle task](https://qwik.builder.io/docs/components/lifecycle/).

⚠️ **Warning**:

The `useParams` hooks only works under a [`Router`](#component-routing) component.

```typescript
import { useVisibleTask$, useTask$, component$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { useRoute, useParams } from "qwik-router";

export default component$(() => {
  const routeState = useRoute();
  const paramsState = useParams(); // only works under a Router component

  useVisibleTask$(
    ({ track }) => {
      track(() => routeState.pathname);
      track(() => routeState.search);
      // react to pathname and search changes only when component becomes visible on the browser.
    },
    {
      strategy: "intersection-observer",
    }
  );

  useTask$(({ track }) => {
    track(() => paramsState);
    // react to any changes on the path parameters
  });

  useTask$(({ track }) => {
    track(() => paramsState.id);
    // react to any changes on the :id path parameters
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

The `initRouter` also returns a router reactive state, just like `useRouter`.

Notice the route state is based on the native [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL). It has **full interface compatibility** with the native URL, but it is **not an instance** of URL.

```typescript
// root.tsx
import { component$ } from "@builder.io/qwik";
import { initRouter } from "qwik-router";

// notice that initRouter can only be executed under an optimized component. A.K.A `component$`
export default component$((props: { url: string }) => {
  const router = initRouter(props.url);
  router.hash; // #hash
  router.pathname; // /path
  router.search; // ?query=string
  router.query; // { query: 'string' }
  router.host; // host:port
  router.origin; // http://host:port
  router.protocol; // http:
  router.port; // port
  router.href; // http://host:port/path?query=string#hash

  return <Child />;
});
```

## Navigating

### The `useNavigate` Hook

This hook creates a navigation function.

```typescript
import { component$ } from '@builder.io/qwik';
import { useNavigate } from 'qwik-router';

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
import { component$ } from '@builder.io/qwik';
import { Link } from 'qwik-router';

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
import { RouterConfig } from 'qwik-router';
import { RouteComponent1 } from './components/RouteComponent1';
import { RouteComponent2 } from './components/RouteComponent2';
import { RouteComponent3 } from './components/RouteComponent3';

const routes: RouterConfig = [
  {
    path: '/:lang?/route-1', // Optional lang parameter. Matches /route-1 and /en/route-1
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
import { component$ } from "@builder.io/qwik";
import { initRouter, Router } from 'qwik-router';
import { routes } from './routes.ts';
import { DefaultRouteComponent } from './components/DefaultRoute';

const App = component$((props: { url: string }) => {
  initRouter(props.url);

  return <Router routes={routes} defaultComponent={DefaultRouteComponent} />;
});
```

### Matching Patterns

To check all possible advanced matching patterns, check the <a href="https://github.com/pillarjs/path-to-regexp" target="_blank">path-to-regexp</a> documentation.

### Multiple Routers and URL Parameters

The router supports URL parameters. You can access them in the component with the `useParams` hook.

The reason not to use the `useRoute` hook is because you can use multiple Route components, leading to different param states.

The `Router` initializes the param state as a [Context](https://qwik.builder.io/docs/components/context/), so it can be accessed by any component under it using the `useParams` hook.

```typescript
// root.tsx
import { component$ } from "@builder.io/qwik";
import {
  type RouterConfig,
  initRouter,
  useParams,
  useRoute,
  Router,
} from "qwik-router";

const DynamicRoute = component$(() => {
  const route = useRoute();
  const params = useParams(); // { language: 'en', page: 'home' }
  return <div>I am DynamicRoute</div>;
});

const Route1 = component$(() => {
  const route = useRoute();
  const params = useParams(); // { lang: 'en' }
  return <div>I am Route 1</div>;
});

const Route2 = component$(() => {
  const route = useRoute();
  const params = useParams(); // { lang: 'en' }
  return <div>I am Route 2</div>;
});

const routeConf1: RouterConfig = [
  {
    path: "/:language/:page",
    // /en/home -> useParams() will return { language: 'en', page: 'home' }
    component: DynamicRoute,
  },
];

const routeConf2: RouterConfig = [
  {
    path: "/:lang/route-1",
    // /en/route-1 -> useParams() will return { lang: 'en' }
    component: Route1,
  },
  {
    path: "/:lang/route-2",
    // /en/route-2 -> useParams() will return { lang: 'en' }
    component: Route2,
  },
];

export default component$((props: { url: string }) => {
  initRouter(props.url);

  return (
    <>
      <Router routes={routeConf1} />
      <Router routes={routeConf2} />
    </>
  );
});

```

## Roadmap

- [x] Dynamic Route Matching
- [x] Params in URL
- [x] Advanced Matching Patterns
- [x] Router Component
- [x] Link Component
- [x] Programmatic Navigation
- [x] Route State Compatible with native URL
- [ ] Navigating State
- [ ] Properties to Routes
- [ ] Scroll Behavior
- [ ] Transition Animations
- [ ] Navigation Guards
- [ ] Route Meta Fields
- [ ] Named Routes
- [ ] Named Views
- [ ] Passing Props to Routes
- [ ] Nested Routes
- [ ] Different History Modes
- [ ] more...

## ⭐ Give us a Star ⭐

It was quite a challenge to build this project, and we are very proud of it. We hope you enjoy it too.

If this project generated value for you, please give us a star on [GitHub](https://github.com/dannyfranca/qwik-router). It helps the project be discovered by other people.

## Contributing

Want to contribute? 😀

Please read and follow our [Contributing Guidelines](CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

## Code Of Conduct

Be kind to each other and please read our [code of conduct](CODE_OF_CONDUCT.md).

## Related Links

  - [Qwik Docs](https://qwik.builder.io/)
  - [Qwik Discord](https://qwik.builder.io/chat)
  - [Qwik GitHub](https://github.com/BuilderIO/qwik)
  - [@QwikDev](https://twitter.com/QwikDev)

## License

MIT
