// @vitest-environment node
console.debug = () => {}; // Qwik does not have away to turn off debug logging, so we mock it out.
import { Window } from "happy-dom";
(global as any).window = new Window({
  innerWidth: 1024,
  innerHeight: 768,
  url: "http://localhost:8080",
});
import * as qwikBuild from "@builder.io/qwik/build";
import { createDOM } from "@builder.io/qwik/testing";
import { component$ } from "@builder.io/qwik";

import type { RouterConfig } from "packages/qwik-router/src/types";
import {
  Link,
  Router,
  initRouter,
  useParams,
} from "packages/qwik-router/src/index";

const isBrowserMock = vi.fn(() => true);
vi.spyOn(qwikBuild, "isBrowser", "get").mockImplementation(isBrowserMock);

const Route1 = component$(() => {
  const params = useParams();
  return <div class="route-1">{params.lang}</div>;
});

const Route2 = component$(() => {
  const params = useParams();
  return <div class="route-2">{params.lang}</div>;
});

const DefaultRoute = component$(() => {
  return <div class="route-default">Default Route</div>;
});

const routes: RouterConfig = [
  {
    path: "/:lang/route-1",
    component: Route1,
  },
  {
    path: "/:lang/route-2",
    component: Route2,
  },
];

const StubRoot = component$(
  ({ url, defaultRoute }: { url: string; defaultRoute?: any }) => {
    initRouter(url);

    return (
      <>
        <Link class="link-1" href="/route-1">
          Route 1
        </Link>
        <Link class="link-2" href="/route-2">
          Route 2
        </Link>
        <Link class="link-3" href="/route-3">
          Route 3
        </Link>
        <Router routes={routes} defaultComponent={defaultRoute} />
      </>
    );
  }
);

describe(Router.name, () => {
  it("Renders default component", async () => {
    const { screen, render } = await createDOM();

    await render(
      <StubRoot url="https://test.com" defaultRoute={DefaultRoute} />
    );

    expect(screen.querySelector(".route-default")).toBeTruthy();
    expect(screen.querySelector(".route-1")).not.toBeTruthy();
    expect(screen.querySelector(".route-2")).not.toBeTruthy();
  });

  it("Renders no component", async () => {
    const { screen, render } = await createDOM();

    await render(<StubRoot url="https://test.com" />);

    expect(screen.querySelector(".route-default")).not.toBeTruthy();
    expect(screen.querySelector(".route-1")).not.toBeTruthy();
    expect(screen.querySelector(".route-2")).not.toBeTruthy();
  });

  it("Renders components based on navigation", async () => {
    const { screen, render } = await createDOM();

    await render(<StubRoot url="https://test.com/en/route-1" />);

    expect(screen.querySelector(".route-default")).not.toBeTruthy();
    expect(screen.querySelector(".route-1")).toBeTruthy();
    expect(screen.querySelector(".route-2")).not.toBeTruthy();
    expect(screen.querySelector(".route-1")!.textContent).toBe("en");
  });
});
