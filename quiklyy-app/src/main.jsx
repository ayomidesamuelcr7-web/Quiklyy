import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { registerSW } from 'virtual:pwa-register'

// Register the PWA Service Worker for offline caching and instant updates
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position="top-center" />
  </StrictMode>,
)
