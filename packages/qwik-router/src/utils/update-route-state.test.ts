import { generateNewUrlStateFromPath } from './generate-new-url-from-path';
import { updateRouteState } from './update-route-state';
import { urlToRouteState } from './url-to-route-state';

describe(updateRouteState.name, () => {
  it('Updates the routing state', () => {
    const url = new URL('https://test.com/test?test=1#hash');
    const state = urlToRouteState(url);
    const newState = generateNewUrlStateFromPath(state.origin, '/new-path?test=2#new-hash');
    updateRouteState(state, newState);
    expect(state).toStrictEqual({
      href: 'https://test.com/new-path?test=2#new-hash',
      pathname: '/new-path',
      search: '?test=2',
      hash: '#new-hash',
      query: {
        test: '2',
      },
      protocol: 'https:',
      origin: 'https://test.com',
      host: 'test.com',
      hostname: 'test.com',
      port: '',
    });
  });
});
