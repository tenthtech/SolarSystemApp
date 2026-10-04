import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { DemoDataProvider } from './features/demo-data/DemoDataContext'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DemoDataProvider>
        <App />
      </DemoDataProvider>
    </BrowserRouter>
  </StrictMode>,
)
