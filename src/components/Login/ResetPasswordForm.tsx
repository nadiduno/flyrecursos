import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "../../services/api";
import { AxiosError } from "axios";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toastCustomSuccess, toastCustomError } from "../ToastCustom";

// Zod Schema para validar o formulário de redefinição de senha
const ResetPasswordSchema = z
  .object({
    novaSenha: z
      .string()
      .nonempty("A nova senha é obrigatória.")
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .max(15, "A senha deve ter no máximo 15 caracteres.")
      .refine(
        (val) => /[A-Z]/.test(val),
        "A nova senha deve conter pelo menos uma letra maiúscula."
      )
      .refine(
        (val) => /[a-z]/.test(val),
        "A nova senha deve conter pelo menos uma letra minúscula."
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "A nova senha deve conter pelo menos um número."
      )
      .refine(
        (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
        "A nova senha deve conter pelo menos um caractere especial."
      ),
    confirmarNovaSenha: z
      .string()
      .nonempty("A confirmação da nova senha é obrigatória."),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarNovaSenha"],
  });

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
  onSuccess: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarNovaSenha, setShowConfirmarNovaSenha] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const toggleNovaSenhaVisibility = () => setShowNovaSenha((prev) => !prev);
  const toggleConfirmarNovaSenhaVisibility = () => setShowConfirmarNovaSenha((prev) => !prev);

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    setResetError(null);
    try {
      // Payload para a API de resetar senha
      const payload = {
        token: token,
        novaSenha: data.novaSenha,
      };

      await post("/auth/resetar-senha", payload);

      toastCustomSuccess(
        "Sucesso",
        "Senha redefinida!",
        "Sua senha foi redefinida com sucesso. Você já pode fazer login."
      );
      reset();
      onSuccess(); // Chama a função de sucesso para fechar o modal e/ou redirecionar
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      let errorMessage = "Erro ao redefinir a senha. Verifique o link e tente novamente.";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || formatarMensagemErro(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setResetError(errorMessage);
      toastCustomError("Erro", "Redefinição de Senha", errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Redefinir Senha</h2>
      {resetError && (
        <p className="text-red-500 text-center mb-4">{resetError}</p>
      )}

      {/* Nova Senha */}
      <div className="mb-4">
        <label htmlFor="novaSenha" className="block text-sm font-bold mb-2">
          Nova Senha
        </label>
        <div className="relative">
          <input
            id="novaSenha"
            type={showNovaSenha ? "text" : "password"}
            {...register("novaSenha")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            placeholder="Sua nova senha"
            aria-invalid={errors.novaSenha ? "true" : "false"}
            aria-describedby="novaSenha-error"
          />
          <button
            type="button"
            onClick={toggleNovaSenhaVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
            aria-label={showNovaSenha ? "Esconder nova senha" : "Mostrar nova senha"}
          >
            {showNovaSenha ? <IoEye size={18} /> : <IoEyeOff size={18} />}
          </button>
        </div>
        {errors.novaSenha && (
          <p id="novaSenha-error" className="text-red-500 text-xs mt-1">
            {errors.novaSenha.message}
          </p>
        )}
      </div>

      {/* Confirmar Nova Senha */}
      <div className="mb-6">
        <label htmlFor="confirmarNovaSenha" className="block text-sm font-bold mb-2">
          Confirmar Nova Senha
        </label>
        <div className="relative">
          <input
            id="confirmarNovaSenha"
            type={showConfirmarNovaSenha ? "text" : "password"}
            {...register("confirmarNovaSenha")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            placeholder="Confirme sua nova senha"
            aria-invalid={errors.confirmarNovaSenha ? "true" : "false"}
            aria-describedby="confirmarNovaSenha-error"
          />
          <button
            type="button"
            onClick={toggleConfirmarNovaSenhaVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
            aria-label={showConfirmarNovaSenha ? "Esconder confirmação de nova senha" : "Mostrar confirmação de nova senha"}
          >
            {showConfirmarNovaSenha ? <IoEye size={18} /> : <IoEyeOff size={18} />}
          </button>
        </div>
        {errors.confirmarNovaSenha && (
          <p id="confirmarNovaSenha-error" className="text-red-500 text-xs mt-1">
            {errors.confirmarNovaSenha.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary2 hover:bg-secondary4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
      >
        {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
      </button>
    </form>
  );
};