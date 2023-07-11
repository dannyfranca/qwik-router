// @vitest-environment node
import { createDOM } from '@builder.io/qwik/testing';
import { component$ } from '@builder.io/qwik';

import { initRouter } from './routing';
import { useNavigate, useRoute } from 'components/link/link';

const StubNav = component$(() => {
  const nav = useNavigate();
  return (
    <div class="navigate" onClick$={() => nav('/new-path')}>
      navigate
    </div>
  );
});

const StubChild = component$(() => {
  const routeState = useRoute();
  return (
    <>
      <div class="stub-path">{routeState.pathname}</div>
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
  it('Render initial path', async () => {
    const url = new URL('https://test.com/path?test=1#hash');
    const { screen, render } = await createDOM();

    await render(<StubRoot url={url.toString()} />);

    const pathEl = screen.querySelector('.stub-path');

    expect(pathEl!.textContent).toBe('/path');
  });

  it('Changes rendering after navigation', async () => {
    const url = new URL('https://test.com/new-path?test=1#hash');
    const { screen, render } = await createDOM();

    await render(<StubRoot url={url.toString()} />);

    const pathEl = screen.querySelector('.stub-path');

    expect(pathEl!.textContent).toBe('/new-path');
  });
});
