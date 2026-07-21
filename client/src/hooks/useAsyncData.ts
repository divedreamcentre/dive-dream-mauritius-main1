import { useLayoutEffect, useRef, useState } from 'react';

export interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Generic data-fetching hook. Every domain hook (useDiveSafaris, useCourses,
// useHomepage, ...) is a thin wrapper around this, calling a services/*
// function as its fetcher. The loading/error shape is modeled now — even
// though today's fetchers resolve local content instantly — so nothing
// here needs to change when the fetcher starts hitting Strapi over the
// network instead.
export function useAsyncData<T>(fetcher: () => Promise<T>, deps: unknown[] = []): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useLayoutEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetcherRef.current()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, isLoading, error };
}

// Combines multiple useAsyncData() results (a page typically calls several
// hooks) into one { isLoading, error } pair, so a page only needs a single
// loading/error guard instead of one per hook.
export function combineAsyncStates(...states: AsyncDataState<unknown>[]): { isLoading: boolean; error: Error | null } {
  return {
    isLoading: states.some((state) => state.isLoading),
    error: states.find((state) => state.error)?.error ?? null,
  };
}
