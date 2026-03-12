import './i18n'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { LocaleProvider } from './contexts/LocaleContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
