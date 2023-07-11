import { navigateTo } from "packages/qwik-router/src/navigate-to";
import { urlToRouteState } from "packages/qwik-router/src/utils/url-to-route-state";

describe(navigateTo.name, () => {
  const url = new URL("https://test.com/path?test=1#hash");
  const pushStateSpy = vi.spyOn(window.history, "pushState");

  it("Does not navigate if not in browser", () => {
    const state = urlToRouteState(url);
    const toPath = "/new-path?test=2#new-hash";
    navigateTo(state, toPath);
    expect(pushStateSpy).not.toHaveBeenCalled();
    expect(state.pathname).toBe("/path");
  });
});
