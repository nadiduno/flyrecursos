import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { LoadingProvider } from './context/LoadingContext'
import { LoadingOverlay } from './components/LoadingOverlay'
import { initializeLoadingHandler } from './services/api'
import { useLoading } from './context/LoadingContext'

import './global.css';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const { setLoading } = useLoading();
  
  // Inicializar o handler de loading na API
  initializeLoadingHandler(setLoading);

  return (
    <>
      <LoadingOverlay />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </BrowserRouter>
  )
}
