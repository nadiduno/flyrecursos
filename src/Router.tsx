import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { LessonsPage } from "./pages/LessonsPage";
import { DashboardAdmin } from "./pages/DashboardAdmin";

import { ProtectedRoute } from "./ProtectedRoute";
import { Unauthorized } from "./pages/Unauthorized ";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/dashboard" element={<DashboardAdmin />} />
      </Route>
       <Route element={<ProtectedRoute allowedRoles={["ADMIN", "ALUNO"]} />}>
        <Route path="/aulas" element={<LessonsPage />} />
      </Route>
      <Route path="/naoautorizado" element={<Unauthorized  />} />
    </Routes>
  );
}
