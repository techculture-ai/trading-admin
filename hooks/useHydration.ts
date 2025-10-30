'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if the component has mounted on the client side
 * Useful for preventing hydration mismatches
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

/**
 * Hook to safely access browser-only APIs
 * Returns undefined during SSR and the actual value on the client
 */
export function useBrowserOnly<T>(getValue: () => T): T | undefined {
  const hasMounted = useHasMounted();
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (hasMounted) {
      setValue(getValue());
    }
  }, [hasMounted, getValue]);

  return value;
}

/**
 * Hook for safely using localStorage with SSR
 */
export function useLocalStorage(key: string, initialValue: string = '') {
  const hasMounted = useHasMounted();
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(stored);
      }
    }
  }, [hasMounted, key]);

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, newValue);
    }
  };

  return [value, setStoredValue] as const;
}