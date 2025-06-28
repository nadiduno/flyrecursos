import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Ex: ['ADMIN', 'ALUNO']
  redirectPath?: string;
  // authorities?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = "/",
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // const { isAuthenticated, isAdmin, userAuthorities, isLoading } = useAuth();
  
  // console.log(`[ProtectedRoute - ${window.location.pathname}]`);
  // console.log("  isLoading:", isLoading);
  // console.log("  isAuthenticated:", isAuthenticated);
  // console.log("  isAdmin:", isAdmin);
  // console.log("  userAuthorities:", userAuthorities); 
  // console.log("  allowedRoles para esta rota:", allowedRoles);

  if (isLoading) {
    return <div>Carregando autenticação...</div>;
  }

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to={redirectPath} replace />;
  }
  if (allowedRoles && allowedRoles.length > 0) {
    // Se allowedRoles for fornecido, verifica se o usuário tem a role necessária
    const userDeterminedRole = isAdmin ? "ADMIN" : "ALUNO";
    const isRoleAllowed = allowedRoles.includes(userDeterminedRole);
    if (!isRoleAllowed) {
      return <Navigate to="/naoautorizado" replace />;
    }
  } 
  // Se estiver autenticado e tiver a role correta (se especificada), renderiza o componente filho
  return <Outlet />;
};
