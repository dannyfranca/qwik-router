import { navigateTo } from './navigate-to';
import { urlToRouteState } from './utils/url-to-route-state';

describe(navigateTo.name, () => {
  const url = new URL('https://test.com/path?test=1#hash');
  const pushStateSpy = vi.spyOn(window.history, 'pushState');

  it('navigates when navigateTo is called', () => {
    const state = urlToRouteState(url);
    const toPath = '/new-path?test=2#new-hash';
    navigateTo(state, toPath);
    expect(pushStateSpy).toHaveBeenCalled();
    expect(state.pathname).toBe('/new-path');
  });
});
