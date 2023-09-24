import type { HTMLAttributes, QRL } from '@builder.io/qwik';

/**
 * The route store immutable properties.
 */
export interface ManagedRouteState {
  /**
   * A string containing the protocol scheme of the URL, including the final ':'.
   */
  readonly protocol: string;
  /**
   * Returns a string containing the origin of the URL, that is its scheme, its domain and its port.
   * @example `https://example.com:8080`.
   */
  readonly origin: string;
  /**
   * A string containing the domain (that is the hostname) followed by (if a port was specified) a ':' and the port of the URL.
   * @example `example.com:8080`.
   */
  readonly host: string;
  /**
   * A string containing the domain of the URL.
   * @example `example.com`.
   */
  readonly hostname: string;
  /**
   * A string containing the port number of the URL.
   * @example `8080`.
   */
  readonly port: string;
  /**
   * This is always an empty string to keep full compatibility with native URL interface.
   * For security reasons, the implementation of this interface removes the username/password section from the URL.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/username
   */
  readonly username: string;
  /**
   * This is always an empty string to keep full compatibility with native URL interface.
   * For security reasons, the implementation of this interface removes the username/password section from the URL.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/password
   */
  readonly password: string;
  /**
   * A native URLSearchParams object containing all the URL's parameters.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
   */
  readonly searchParams: URLSearchParams;
  /**
   * A method to correctly serialize the URL to string when the URL is used in a string context.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/toString
   */
  readonly toString: () => string;
  /**
   * A method to correctly serialize the URL when JSON.stringify is called on the URL.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/toJSON
   */
  readonly toJSON: () => string;
}

/**
 * The route store mutable properties.
 */
export interface MutableRouteState {
  /**
   * A stringifier that returns a string containing the whole URL.
   * @example `https://example.com:8080/en-gb/path/to/page?query=string#hash`
   */
  href: string;
  /**
   * The path of the URL.
   * @example `/en-gb/path/to/page`
   */
  pathname: string;
  /**
   * A string containing an initial '/' followed by the path of the URL, not including the query string or fragment.
   * @example `#hash`
   */
  hash: string;
  /**
   * A string indicating the URL's parameter string; if any parameters are provided, this string includes all of them, beginning with the leading ? character.
   * @example `?query=string`
   */
  search: string;
  /**
   * The query of the URL serialized from the URL params.
   * @example `{ query: 'string' }`
   */
  query: Record<string, string>;
}

/**
 * The route state is a combination of the immutable and mutable parts.
 */
export type RouteState = ManagedRouteState & MutableRouteState;

/**
 * The function that is used to navigate to a new URL.
 */
export type RouteNavigate = QRL<(location: string) => Promise<void>>;

/**
 * A helper type that extends the common HTML attributes to allow any other props to be passed to the component.
 */
export type ComponentProps<T extends Record<string, unknown>> = T & HTMLAttributes<HTMLElement>;

/**
 * The definition of a link component.
 */
export type LinkProps = ComponentProps<{
  /**
   * The URL to navigate to when the link is clicked.
   */
  href: string;
  /**
   * The class name to apply when the link is active.
   */
  activeClassName?: string;
}>;

/**
 * The definition of a single the route component.
 */
export type RouterConfigItem = {
  /**
   * The component to render when the route matches.
   */
  component: any;
  /**
   * The path to match against the URL.
   */
  path: string;
};

/**
 * The definition of the route components.
 */
export type RouterConfig = RouterConfigItem[];

/**
 * The definition of the route component.
 */
export type RouterProps = {
  routes: RouterConfig;
  /**
   * The component to render when no route matches.
   */
  defaultComponent?: any;
};

/**
 * Params extracted from the URL pathname.
 */
export type RouteParams = Record<string, string | undefined>;
