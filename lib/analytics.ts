// lib/analytics.ts
import posthog from "posthog-js";

declare global {
  interface Window {
    __posthog_initialized?: boolean;
  }
}

export function initPosthog() {
  if (typeof window !== "undefined" && !window.__posthog_initialized) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
    window.__posthog_initialized = true;
  }
}

export { posthog };
