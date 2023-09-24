import { urlToRouteState } from './url-to-route-state';

describe(urlToRouteState.name, () => {
  it('Returns the mutable routing state', () => {
    const url = new URL('https://test.com:9000/test?test=1#hash');
    const state = urlToRouteState(url);
    expect(state).toStrictEqual({
      href: 'https://test.com:9000/test?test=1#hash',
      pathname: '/test',
      search: '?test=1',
      hash: '#hash',
      query: {
        test: '1',
      },
      protocol: 'https:',
      origin: 'https://test.com:9000',
      host: 'test.com:9000',
      hostname: 'test.com',
      port: '9000',
      username: '',
      password: '',
      searchParams: url.searchParams,
      toJSON: expect.any(Function),
      toString: expect.any(Function),
    } as URL);
  });
});
