"use client";

import { useSyncExternalStore, useCallback } from "react";

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(): () => void {
  return () => {};
}

export function useIsIOS(): boolean {
  const getSnapshot = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const hasNoMSStream = !(window as Window & { MSStream?: unknown }).MSStream;
    return isAppleDevice && hasNoMSStream;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
