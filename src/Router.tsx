import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import Login from "./pages/Login";
import { DashboardAdmin } from "./pages/DashboardAdmin";
import { ProtectedRoute } from "./ProtectedRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        console.log("É Admin")
        <Route path="/dashboard" element={<DashboardAdmin />} />
      </Route> */}
      <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/aulas" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
