import { useState, useEffect } from 'react';

export const useLocalState = <T>(key: string, initial: T) => {
  const isLocalStorageAvailable =
    typeof window !== 'undefined' && window.localStorage;

  const getSavedValue = () => {
    const saved = window.localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  };

  const [value, setValue] = useState<T>(
    () => (isLocalStorageAvailable && getSavedValue()) || initial
  );

  useEffect(() => {
    isLocalStorageAvailable &&
      window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue] as [typeof value, typeof setValue];
};
