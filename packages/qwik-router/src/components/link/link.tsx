import { component$, Slot } from '@builder.io/qwik';

import { type LinkProps } from '../../types';
import { useNavigate, useRoute } from '../../routing';

/**
 * Link component that navigates to a new route.
 */
export const Link = component$((opts: LinkProps) => {
  const routeState = useRoute();
  const navigate = useNavigate();

  const { href, class: classProp, activeClassName, ...props } = opts;
  const isActive = routeState.pathname === href;

  return (
    <a
      {...props}
      preventdefault:click
      class={(isActive ? activeClassName ?? 'link--active' : '') + ' ' + (classProp ?? '')}
      href={href}
      onClick$={() => navigate(href)}
    >
      <Slot />
    </a>
  );
});
