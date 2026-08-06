import { cache } from 'react';

const SERVER_BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://aniroseco.ir/backend/api/v1/';

const REVALIDATE_SECONDS = 40;

async function fetchRaw(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 8000);
  const noStore = options.cache === 'no-store';
  try {
    const res = await fetch(
      `${SERVER_BASE_URL.replace(/\/$/, '')}/${String(path).replace(/^\//, '')}`,
      {
        ...options,
        signal: controller.signal,
        cache: noStore ? 'no-store' : 'force-cache',
        next: noStore ? undefined : { revalidate: options.revalidate ?? REVALIDATE_SECONDS },
      }
    );
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export const serverFetch = cache(async (path, options = {}) => {
  return fetchRaw(path, options);
});
