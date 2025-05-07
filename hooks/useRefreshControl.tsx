import { useCallback, useState } from "react";

export function useRefreshControl(refreshFn?: () => Promise<void> | void, delay: number = 2000) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    if (refreshFn) {
      await Promise.resolve(refreshFn()); // handles both sync and async
    }

    setTimeout(() => {
      setRefreshing(false);
    }, delay);
  }, [refreshFn, delay]);

  return { refreshing, onRefresh };
}
