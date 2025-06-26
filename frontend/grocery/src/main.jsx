import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'; // <-- This will work if the file exists here
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)