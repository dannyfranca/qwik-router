/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default function (opts: RenderToStreamOptions) {
  const req = (opts.stream as any).req;
  const url = new URL(req.originalUrl, `http://${req.headers['host']}`);
  return renderToStream(<Root url={url.toString()} />, {
    manifest,
    ...opts,
  });
}
