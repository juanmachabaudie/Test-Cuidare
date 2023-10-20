import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import { ThemeConfig } from './config/theme.config.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeConfig>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeConfig>
  </React.StrictMode>,
)
