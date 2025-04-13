import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import './global.css';
import { AuthProvider } from './context/AuthContext';


export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
       
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}
