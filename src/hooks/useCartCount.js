'use client'
import { useState, useEffect, useCallback } from 'react';
import { fetchCartCount } from '../api/services/cart.js';
import { subscribeCartUpdated } from '../utils/cartEvents.js';

export const useCartCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const c = await fetchCartCount();
      setCount(c || 0);
    } catch {
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    const unsubscribe = subscribeCartUpdated(refresh);
    return unsubscribe;
  }, [refresh]);

  return { count, loading, refresh };
};
