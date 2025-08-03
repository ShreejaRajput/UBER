import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import CaptainContext from './context/CaptainContext.jsx'

import UserContextProvider from './context/userContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
    <UserContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </UserContextProvider>
    </CaptainContext>
  </StrictMode>
)
