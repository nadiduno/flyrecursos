import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Ex: ['ADMIN', 'ALUNO']
  redirectPath?: string;
  authorities?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = "/",
}) => {
  const { isAuthenticated, isAdmin} = useAuth();

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to={redirectPath} replace />;
  }
  if (allowedRoles) {
    // Se allowedRoles for fornecido, verifica se o usuário tem a role necessária
    const userRole = isAdmin ? "ADMIN" : "ALUNO";
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/naoautorizado" replace />;
    }
  }

  // Se estiver autenticado e tiver a role correta (se especificada), renderiza o componente filho
  return <Outlet />;
};
