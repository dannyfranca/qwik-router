import { component$ } from '@builder.io/qwik';
import { initRouter, useParams } from './routing';
import type { RouterConfig } from './types';
import { Router } from './components/router/router';
import { Link } from './components/link/link';

const DefaultComponent = component$(() => {
  return <div>Default Component</div>;
});

const Route1 = component$(() => {
  const params = useParams();
  return (
    <div>
      I am Route 1<br />
      <br />
      <span>Route state:</span>
      <br />
      <span>lang: {params['lang']}</span>
      <br />
    </div>
  );
});

const Route2 = component$(() => {
  const params = useParams();
  return (
    <div>
      I am Route 2<br />
      <br />
      <span>Route state:</span>
      <br />
      <span>lang: {params['lang']}</span>
      <br />
    </div>
  );
});

const routeConf1: RouterConfig = [
  {
    path: '/:lang/route-1',
    component: Route1,
  },
];

const routeConf2: RouterConfig = [
  {
    path: '/:lang/route-1',
    component: Route1,
  },
  {
    path: '/:lang/route-2',
    component: Route2,
  },
];

interface RootProps {
  /**
   * URL of page request
   * */
  url: string;
}

export default component$<RootProps>(({ url }) => {
  const store = initRouter(url);
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Router App</title>
      </head>
      <body>
        <h2>Nav Bar</h2>
        <div>
          <Link class="link-1" href="/">
            Home
          </Link>
          <br />
          <Link class="link-1" href="/en/route-1#hash">
            Route 1
          </Link>
          <br />
          <Link class="link-1" href="/en/route-2?qs1=123&qs2=abc">
            Route 2
          </Link>
        </div>
        <hr />
        <div>
          <h2>Route State - Full interface compatibility with native URL</h2>
          <span>protocol: {store.protocol}</span>
          <br />
          <span>origin: {store.origin}</span>
          <br />
          <span>host: {store.host}</span>
          <br />
          <span>hostname: {store.hostname}</span>
          <br />
          <span>port: {store.port}</span>
          <br />
          <span>username(always empty): {store.username}</span>
          <br />
          <span>password(always empty): {store.password}</span>
          <br />
          <span>href: {store.href}</span>
          <br />
          <span>pathname: {store.pathname}</span>
          <br />
          <span>hash: {store.hash}</span>
          <br />
          <span>search: {store.search}</span>
          <br />
          <span>searchParams: {store.searchParams.toString()}</span>
          <br />
          <span>query: {JSON.stringify(store.query)}</span>
          <br />
          <span>toString(): {store.toString()}</span>
          <br />
          <span>toJSON(): {store.toJSON()}</span>
        </div>
        <hr />
        <h2>Router Components</h2>
        <h3>Router 1</h3>
        <Router routes={routeConf1} defaultComponent={DefaultComponent} />
        <hr />
        <h3>Router 2</h3>
        <Router routes={routeConf2} />
      </body>
    </>
  );
});
