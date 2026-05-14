import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Toast notifications container */}
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#1a1a2e',
          color: '#e2e8f0',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          fontSize: '14px',
          backdropFilter: 'blur(20px)',
        },
        success: {
          iconTheme: { primary: '#10b981', secondary: '#1a1a2e' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#1a1a2e' },
        },
      }}
    />
    <App />
  </StrictMode>,
)
