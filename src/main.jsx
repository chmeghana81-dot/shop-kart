import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { store } from '@redux/store';
import App from './App';
import '@styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--toast-bg, #fff)',
              color: 'var(--toast-color, #111)',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#f97316', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
