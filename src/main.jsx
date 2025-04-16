import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/Context.jsx'
import AiMentor from './components/AiMentor.jsx'

createRoot(document.getElementById('root')).render(
    <ContextProvider>
 <BrowserRouter>
 <App />
 <AiMentor/>
 </BrowserRouter>
 </ContextProvider>
    
  
)
