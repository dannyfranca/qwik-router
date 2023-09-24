import { generateNewUrlStateFromPath } from './generate-new-url-from-path';
import { urlToRouteState } from './url-to-route-state';

describe(generateNewUrlStateFromPath.name, () => {
  it('Returns the new url state', () => {
    const url = new URL('https://test.com/test?test=1');
    const currentState = urlToRouteState(url);
    const newState = generateNewUrlStateFromPath(currentState.origin, '/new-path?test=2');
    expect(newState).toStrictEqual({
      href: 'https://test.com/new-path?test=2',
      pathname: '/new-path',
      search: '?test=2',
      hash: '',
      query: {
        test: '2',
      },
    });
  });
});
