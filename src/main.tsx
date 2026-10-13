import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error shields to prevent Google Maps / third-party iframe errors from bubbling
if (typeof window !== 'undefined') {
  (window as any).gm_authFailure = () => {
    (window as any).__gmp_auth_failed = true;
  };

  const origError = console.error;
  console.error = (...args: unknown[]) => {
    const serialized = args
      .map((a) => {
        try {
          return typeof a === 'object' ? JSON.stringify(a) : String(a);
        } catch {
          return String(a);
        }
      })
      .join(' ');

    if (
      serialized.includes('InvalidKeyMapError') ||
      serialized.includes('Google Maps JavaScript API error') ||
      serialized.includes('Script error') ||
      serialized.includes('ErrorInfo') ||
      serialized.includes('API_KEY_INVALID') ||
      serialized.includes('google.rpc')
    ) {
      return;
    }
    origError.apply(console, args);
  };

  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const serialized = args
      .map((a) => {
        try {
          return typeof a === 'object' ? JSON.stringify(a) : String(a);
        } catch {
          return String(a);
        }
      })
      .join(' ');

    if (
      serialized.includes('InvalidKeyMapError') ||
      serialized.includes('Google Maps') ||
      serialized.includes('ErrorInfo') ||
      serialized.includes('Script error') ||
      serialized.includes('API_KEY_INVALID')
    ) {
      return;
    }
    origWarn.apply(console, args);
  };

  window.addEventListener(
    'error',
    (event) => {
      const msg = String(event.message || event.error || '');
      if (
        msg.includes('InvalidKeyMapError') ||
        msg.includes('Google Maps') ||
        msg.includes('Script error') ||
        msg.includes('ErrorInfo') ||
        (event.filename && event.filename.includes('maps.googleapis.com'))
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return true;
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = String(event.reason?.message || event.reason || '');
      if (
        reason.includes('InvalidKeyMapError') ||
        reason.includes('Google Maps') ||
        reason.includes('Script error') ||
        reason.includes('ErrorInfo') ||
        reason.includes('gm_authFailure')
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
