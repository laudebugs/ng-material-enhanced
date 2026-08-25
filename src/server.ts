import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

const angularApp = new AngularAppEngine();

interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export async function fetch(
  request: Request,
  env: Env,
  _ctx: unknown,
): Promise<Response> {
  const response = await angularApp.handle(request);
  if (response) {
    return response;
  }
  if (env?.ASSETS) {
    return env.ASSETS.fetch(request);
  }
  return new Response('Not Found', { status: 404 });
}

export default {
  fetch,
};

/**
 * Request handler used by the Angular CLI (for dev-server and during build)
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  const res = await angularApp.handle(req);
  return res ?? new Response('Not Found', { status: 404 });
});

