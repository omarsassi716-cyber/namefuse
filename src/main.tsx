import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initAnalyticsQueue } from './lib/analytics';

// Initialize analytics queue and set Consent Mode v2 defaults
initAnalyticsQueue();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
