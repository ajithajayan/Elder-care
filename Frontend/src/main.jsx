import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <MaterialTailwindControllerProvider>
      <App />
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
