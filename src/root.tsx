import { component$ } from "@builder.io/qwik";
import { initRouter, useParams, useRoute } from "./routing";
import type { RouterConfig } from "./types";
import { Router } from "./components/router/router";
import { Link } from "./components/link/link";

const DefaultComponent = component$(() => {
  return <div>Default Component</div>;
});

const Route1 = component$(() => {
  const route = useRoute();
  const params = useParams();
  return (
    <div>
      I am Route 1<br />
      Lang: {params.lang}
      <br />
      Pathname: {route.pathname}
    </div>
  );
});

const Route2 = component$(() => {
  const route = useRoute();
  const params = useParams();
  return (
    <div>
      I am Route 2<br />
      Lang: {params.lang}
      <br />
      Hostname: {route.url}
    </div>
  );
});

const routeConf1: RouterConfig = [
  {
    path: "/:lang/route-1",
    component: Route1,
  },
];

const routeConf2: RouterConfig = [
  {
    path: "/:lang/route-1",
    component: Route1,
  },
  {
    path: "/:lang/route-2",
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
  initRouter(url);
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Router App</title>
      </head>
      <body>
        <div>
          <Link class="link-1" href="/">
            Home
          </Link>
          <br />
          <Link class="link-1" href="en/route-1">
            Route 1
          </Link>
          <br />
          <Link class="link-1" href="en/route-2">
            Route 2
          </Link>
        </div>
        <hr />
        <Router routes={routeConf1} defaultComponent={DefaultComponent} />
        <hr />
        <Router routes={routeConf2} />
      </body>
    </>
  );
});
