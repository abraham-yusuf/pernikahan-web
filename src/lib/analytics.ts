"use client";

import { track } from "@vercel/analytics";

type EventPayload = Record<string, string | number | boolean | null | undefined>;

function scheduleTracking(task: () => void) {
  if (typeof window === "undefined") {
    return;
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(task, { timeout: 1000 });
    return;
  }

  setTimeout(task, 0);
}

export function trackEvent(name: string, payload?: EventPayload) {
  if (typeof window === "undefined") {
    return;
  }

  scheduleTracking(() => {
    void Promise.resolve()
      .then(() => track(name, payload))
      .catch(() => undefined);
  });
}
