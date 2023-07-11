import { urlToMutableRouteState } from "./url-to-mutable-route-state";

describe(urlToMutableRouteState.name, () => {
  it("Returns the mutable routing state", () => {
    const url = new URL("https://test.com/test?test=1#hash");
    const state = urlToMutableRouteState(url);
    expect(state).toStrictEqual({
      href: "https://test.com/test?test=1#hash",
      pathname: "/test",
      search: "?test=1",
      hash: "#hash",
      query: {
        test: "1",
      },
    });
  });
});
