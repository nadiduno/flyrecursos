import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Ex: ['ADMIN', 'ALUNO']
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = "/",
}) => {
  const { isAuthenticated, isAdmin } = useAuth(); // Pega o estado de autenticação e se é admin
  console.log("Usuario Auth");
  console.log("Auntenticado", isAuthenticated);
  console.log("Admin", isAdmin);
  console.log("Role", allowedRoles);

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    console.log("Usuario NAO Auth");
    return <Navigate to={redirectPath} replace />;
  }
  if (allowedRoles) {
    // Se allowedRoles for fornecido, verifica se o usuário tem a role necessária
    const userRole = isAdmin ? "ADMIN" : "ALUNO";
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  // Se estiver autenticado e tiver a role correta (se especificada), renderiza o componente filho
  return <Outlet />;
};
