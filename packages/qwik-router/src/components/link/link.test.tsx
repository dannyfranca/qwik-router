// @vitest-environment node
console.debug = () => {}; // Qwik does not have away to turn off debug logging, so we mock it out.
import { Window } from 'happy-dom';
(global as any).window = new Window({
  innerWidth: 1024,
  innerHeight: 768,
  url: 'http://localhost:8080',
});
import { createDOM } from '@builder.io/qwik/testing';
import { component$ } from '@builder.io/qwik';

import { initRouter, useRoute } from '../../routing';
import { Link } from './link';

const url = new URL('https://test.com/path?test=1#hash');

const StubChild = component$(() => {
  const routeState = useRoute();
  return <div class="stub-path">{routeState.pathname}</div>;
});

const StubRoot = component$(({ url }: { url: string }) => {
  initRouter(url);

  return (
    <>
      <Link class="navigate" href="/new-path">
        navigate
      </Link>
      <StubChild />
    </>
  );
});

describe(Link.name, () => {
  it('Changes rendering after navigation', async () => {
    const { screen, render, userEvent } = await createDOM();

    await render(<StubRoot url={url.toString()} />);

    const pathEl = screen.querySelector('.stub-path');

    expect(pathEl!.textContent).toBe('/path');

    await userEvent('.navigate', 'click');

    expect(pathEl!.textContent).toBe('/new-path');
  });

  it('Has active--link class', async () => {
    const ActiveLink = component$(() => {
      initRouter('https://test.com/new-path?test=1#hash');

      return (
        <Link activeClassName="active" href="/new-path">
          navigate
        </Link>
      );
    });

    const { screen, render } = await createDOM();

    await render(<ActiveLink />);

    const linkEl = screen.querySelector('.active');

    expect(linkEl).toBeTruthy();
  });
});
