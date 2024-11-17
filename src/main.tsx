import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import MiniKitProvider from './minikit-provider.tsx';
import { AppProviders } from './backend/provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MiniKitProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </MiniKitProvider>
  </StrictMode>
);
