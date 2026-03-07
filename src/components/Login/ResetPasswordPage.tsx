import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toastCustomError } from "../ToastCustom";
import { ResetPasswordForm } from "./ResetPasswordForm";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    // Se não houver token na URL, redirecione para a página de login
    if (!token) {
      toastCustomError("Erro", "Token inválido", "Link de redefinição de senha inválido ou expirado.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSuccess = () => {
    navigate("/login"); // Redireciona para a tela de login após o sucesso
  };

  if (!token) {
    // O useEffect já trata o redirecionamento, mas é bom ter uma renderização condicional
    // para evitar que o formulário seja renderizado sem o token.
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary1">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <ResetPasswordForm token={token} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}