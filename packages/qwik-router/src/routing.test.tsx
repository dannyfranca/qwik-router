// @vitest-environment node
import { createDOM } from '@builder.io/qwik/testing';
import { component$ } from '@builder.io/qwik';

import { initRouter, useNavigate, useRoute } from './routing';

const StubNav = component$(() => {
  const nav = useNavigate();
  return (
    <div class="navigate" onClick$={() => nav('/new-path?nqs=1#new-hash')}>
      navigate
    </div>
  );
});

const StubChild = component$(() => {
  const routeState = useRoute();
  return (
    <>
      <div class="stub-path">{routeState.pathname}</div>
      <div class="stub-hash">{routeState.hash}</div>
      <div class="stub-href">{routeState.href}</div>
      <div class="stub-origin">{routeState.origin}</div>
      <div class="stub-search">{routeState.search}</div>
      <div class="stub-query">{JSON.stringify(routeState.query)}</div>
      <div class="stub-search-params">{routeState.searchParams.toString()}</div>
      <div class="stub-to-string">{routeState.toString()}</div>
      <div class="stub-to-json">{routeState.toJSON()}</div>
    </>
  );
});

const StubRoot = component$(({ url }: { url: string }) => {
  initRouter(url);

  return (
    <>
      <StubNav />
      <StubChild />
    </>
  );
});

describe('Qwik context', () => {
  it('Changes rendering after navigation', async () => {
    const url = new URL('https://test.com/path?qs=1#hash');
    const { screen, render, userEvent } = await createDOM();

    await render(<StubRoot url={url.toString()} />);

    const pathEl = screen.querySelector('.stub-path');
    const hashEl = screen.querySelector('.stub-hash');
    const hrefEl = screen.querySelector('.stub-href');
    const originEl = screen.querySelector('.stub-origin');
    const searchEl = screen.querySelector('.stub-search');
    const queryEl = screen.querySelector('.stub-query');
    const searchParamsEl = screen.querySelector('.stub-search-params');
    const toStringEl = screen.querySelector('.stub-to-string');
    const toJSONEl = screen.querySelector('.stub-to-json');

    expect(pathEl!.textContent).toBe('/path');
    expect(hashEl!.textContent).toBe('#hash');
    expect(hrefEl!.textContent).toBe('https://test.com/path?qs=1#hash');
    expect(originEl!.textContent).toBe('https://test.com');
    expect(searchEl!.textContent).toBe('?qs=1');
    expect(queryEl!.textContent).toBe('{"qs":"1"}');
    expect(searchParamsEl!.textContent).toBe('qs=1');
    expect(toStringEl!.textContent).toBe('https://test.com/path?qs=1#hash');
    expect(toJSONEl!.textContent).toBe('https://test.com/path?qs=1#hash');

    await userEvent('.navigate', 'click');

    expect(pathEl!.textContent).toBe('/new-path');
    expect(hashEl!.textContent).toBe('#new-hash');
    expect(hrefEl!.textContent).toBe('https://test.com/new-path?nqs=1#new-hash');
    expect(originEl!.textContent).toBe('https://test.com');
    expect(searchEl!.textContent).toBe('?nqs=1');
    expect(queryEl!.textContent).toBe('{"nqs":"1"}');
    expect(searchParamsEl!.textContent).toBe('nqs=1');
    expect(toStringEl!.textContent).toBe('https://test.com/new-path?nqs=1#new-hash');
    expect(toJSONEl!.textContent).toBe('https://test.com/new-path?nqs=1#new-hash');
  });
});
