import { CACHE_DURATION } from './config.js';

let cacheEnabled = true;
const cache = new Map();

export const configureCache = (enabled) => {
  cacheEnabled = enabled;
};

export const clearCache = () => {
  cache.clear();
};

const getCached = (key) => {
  if (!cacheEnabled) return null;
  const entry = cache.get(key);
  if (!entry) return null;
  return { ...entry };
};

const setCached = (key, data) => {
  if (!cacheEnabled) return;
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const fetchWithCache = async (key, fetcher, duration = CACHE_DURATION) => {
  const cached = getCached(key);

  if (cached) {
    const age = Date.now() - cached.timestamp;
    if (age < duration) {
      return cached.data;
    }
    fetcher()
      .then((freshData) => {
        setCached(key, freshData);
      })
      .catch(() => {});
    return cached.data;
  }

  const freshData = await fetcher();
  setCached(key, freshData);
  return freshData;
};

export const invalidateCache = (key) => {
  cache.delete(key);
};
