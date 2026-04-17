import { BrowserRouter } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Router } from "./Router";
import { LoadingProvider } from "./context/LoadingContext";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { initializeLoadingHandler } from "./services/api";
import { useLoading } from "./context/LoadingContext";
import { api } from "./services/api";

import "./global.css";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const { setLoading } = useLoading();
  const didWakeUpRef = useRef(false);

  useEffect(() => {
    initializeLoadingHandler(setLoading);
  }, [setLoading]);

  useEffect(() => {
    const wakeUpServer = async () => {
      if (didWakeUpRef.current) return;
      didWakeUpRef.current = true;

      try {
        setLoading(true, "Despertando a API...");
        await api.get("/ping");
      } catch (error) {
        console.warn(
          "A API pode estar em cold start ou demorando para responder.",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    wakeUpServer();
  }, [setLoading]);

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
  );
}
