const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://aniroseco.ir/backend/api/v1/';

const passthroughHeaders = new Set([
  'accept',
  'accept-language',
  'content-type',
  'user-agent',
  'x-requested-with',
  'x-csrf-token',
  'origin',
  'referer',
]);

export const dynamic = 'force-dynamic';

export async function handler(req, { params }) {
  const { path: pathParts } = await params;
  const versioned = pathParts || [];
  const path = versioned.slice(1).join('/');

  const url = new URL(req.url);
  const search = url.search;

  const targetPath = `/${path}`.replace(/\/{2,}/g, '/').replace(/\/+$/, '');
  const targetUrl = `${BACKEND_API_URL.replace(/\/$/, '')}${targetPath}${search}`;

  const headers = new Headers();

  const cookie = req.headers.get('cookie');
  if (cookie) headers.set('cookie', cookie);

  const authorization = req.headers.get('authorization');
  if (authorization) headers.set('authorization', authorization);

  passthroughHeaders.forEach((name) => {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  });

  if (!headers.has('accept') || headers.get('accept').includes('text/html')) {
    headers.set('accept', 'application/json');
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    headers.set('content-type', req.headers.get('content-type') || 'application/json');
  }

  let body;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.arrayBuffer();
  }

  let backendRes;
  try {
    backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: 'manual',
      cache: 'no-store',
    });

    if (backendRes.status >= 300 && backendRes.status < 400) {
      const location = backendRes.headers.get('location') || '';
      const isLoginRedirect = /login|auth/i.test(location);
      if (isLoginRedirect) {
        return new Response(JSON.stringify({ message: 'برای دسترسی به این بخش باید وارد شوید' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          },
        });
      }
      backendRes = await fetch(targetUrl, {
        method: req.method,
        headers,
        body,
        redirect: 'follow',
        cache: 'no-store',
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'خطا در ارتباط با سرور', error: String(err?.message || err) }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const responseHeaders = new Headers();

  responseHeaders.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
  responseHeaders.set('pragma', 'no-cache');
  responseHeaders.set('expires', '0');

  if (typeof backendRes.headers.getSetCookie === 'function') {
    const setCookies = backendRes.headers.getSetCookie();
    setCookies.forEach((c) => responseHeaders.append('set-cookie', c));
  } else {
    const sc = backendRes.headers.get('set-cookie');
    if (sc) responseHeaders.set('set-cookie', sc);
  }

  const contentType = backendRes.headers.get('content-type');
  if (contentType) responseHeaders.set('content-type', contentType);

  const responseBody = await backendRes.arrayBuffer();

  return new Response(responseBody, {
    status: backendRes.status,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
