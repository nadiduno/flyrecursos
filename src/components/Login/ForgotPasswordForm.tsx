// src/components/Login/ForgotPasswordForm.tsx
import React, { useState, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "../../services/api"; // Troquei para o método POST
import { AxiosError } from "axios";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { toastCustomSuccess, toastCustomError } from "../ToastCustom";

// 1. Simplificar o schema para incluir apenas o email
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const ForgotPasswordForm = React.forwardRef<
  { submitForm: () => void },
  ForgotPasswordFormProps
>(({ onSuccess, onSubmittingChange }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  // Removido o useEffect que observava isSubmitting, pois a lógica de onSubmittingChange será chamada no submit.

  const [updateError, setUpdateError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    onSubmittingChange(true); // Inicia o estado de submissão
    setUpdateError(null);
    try {
      // 2. Simplificar o payload para enviar apenas o e-mail
      const payload = { email: data.email };

      // 3. Chamar o endpoint de esqueci-senha com o método POST
      await post("/auth/esqueci-senha", payload);

      toastCustomSuccess(
        "Sucesso",
        "E-mail enviado!",
        "As instruções para redefinir sua senha foram enviadas para o seu e-mail."
      );
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      let errorMessage =
        "Erro ao enviar e-mail. Por favor, tente novamente mais tarde.";
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setUpdateError(errorMessage);
      toastCustomError(
        "Erro",
        "Redefinição de Senha",
        errorMessage
      );
    } finally {
      onSubmittingChange(false); // Finaliza o estado de submissão
    }
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)(),
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Esqueci a Senha
      </h2>
      {updateError && (
        <p className="text-red-500 text-center mb-4">{updateError}</p>
      )}
      {/* 4. Manter apenas o campo de email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Seu e-mail cadastrado"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      {/* 5. Os campos de senha foram removidos daqui */}
    </form>
  );
});