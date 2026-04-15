import * as Sentry from "@sentry/nextjs";

export function captureError(
  error: unknown,
  context?: Record<string, unknown>
) {
  if (context) {
    Sentry.setContext("additional", context);
  }

  Sentry.captureException(error);
}

export function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info"
) {
  Sentry.captureMessage(message, level);
}
