import { useState, useEffect } from "react";

/**
 * 防抖 Hook
 * 延迟更新值，避免频繁操作
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 防抖回调 Hook
 * 防抖执行回调函数
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
): T {
  const [debounceTimer, setDebounceTimer] = useState<number>();

  const debouncedCallback = ((...args: Parameters<T>) => {
    clearTimeout(debounceTimer);
    const newTimer = window.setTimeout(() => {
      callback(...args);
    }, delay);
    setDebounceTimer(newTimer);
  }) as T;

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}
