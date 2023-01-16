import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
  return Sentry.init({
    dsn: "https://02bd765557a740b38e485cf793574b1b@o4504486763036672.ingest.sentry.io/4504486768017408",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.5,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
