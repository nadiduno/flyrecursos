import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Importações dinâmicas para lazy loading
const Login = React.lazy(() => import("./pages/Login"));
const LessonsPage = React.lazy(() => import("./pages/LessonsPage"));
const DashboardAdmin = React.lazy(() => import("./pages/DashboardAdmin"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));

import { ProtectedRoute } from "./ProtectedRoute";

export function Router() {
  return (
    <Suspense fallback={<div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "ALUNO"]} />}>
          <Route path="/aulas" element={<LessonsPage />} />
        </Route>
        <Route path="/naoautorizado" element={<Unauthorized />} />
      </Routes>
    </Suspense>
  );
}