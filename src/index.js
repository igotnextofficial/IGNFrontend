import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/scss/defaults.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootComponent from './components/generic/RootComponent';
import { Elements } from '@stripe/react-stripe-js';
import * as Sentry from "@sentry/react";
import { loadStripe } from '@stripe/stripe-js';
import AppErrorFallback from './components/common/AppErrorFallback';

const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

const parseRate = (value, defaultValue) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : defaultValue;
};

const tracesSampleRate = parseRate(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE, 0.1);
const replaysSessionSampleRate = parseRate(process.env.REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE, 0.0);
const replaysErrorSampleRate = parseRate(process.env.REACT_APP_SENTRY_REPLAYS_ERROR_SAMPLE_RATE, 1.0);

if (sentryDsn) {
  const integrations = [Sentry.browserTracingIntegration()];

  if (replaysSessionSampleRate > 0 || replaysErrorSampleRate > 0) {
    integrations.push(
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: true
      })
    );
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: process.env.REACT_APP_ENVIRONMENT,
    sendDefaultPii: false,
    integrations,
    tracesSampleRate,
    replaysSessionSampleRate,
    replaysOnErrorSampleRate: replaysErrorSampleRate,
    beforeSend(event) {
      if (event.request?.headers) {
        const { Authorization, authorization, Cookie, cookie, ...safeHeaders } = event.request.headers;
        event.request.headers = safeHeaders;
      }

      if (event.request?.cookies) {
        event.request.cookies = undefined;
      }

      return event;
    }
  });
} else {
  // eslint-disable-next-line no-console
  console.warn("Sentry DSN is not configured. Error monitoring is disabled.");
}

const container =  document.getElementById('root');

const stripePromise = loadStripe(process.env.  REACT_APP_STRIPE_API_PUBLISHABLE_KEY);

const ROOT = createRoot(container);

ROOT.render(

  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Sentry.ErrorBoundary fallback={<AppErrorFallback />}>
        <RootComponent>
          <App />
        </RootComponent>
      </Sentry.ErrorBoundary>
    </Elements>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
