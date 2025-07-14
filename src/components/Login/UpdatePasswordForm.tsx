import React, { useState, useEffect, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { put } from "../../services/api";
import { AxiosError } from "axios";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { toastCustomSuccess, toastCustomError } from "../ToastCustom";

const UpdatePasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("O e-mail é obrigatório.")
      .email("Formato de e-mail inválido."),
    senhaAtual: z
      .string()
      .nonempty("A senha atual é obrigatória.")
      .min(6, "A senha atual deve ter no mínimo 6 caracteres."),
    novaSenha: z
      .string()
      .nonempty("A nova senha é obrigatória.")
      .min(6, "A nova senha deve ter no mínimo 6 caracteres.")
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
    message: "As novas senhas não coincidem.",
    path: ["confirmarNovaSenha"],
  });

type UpdatePasswordFormData = z.infer<typeof UpdatePasswordSchema>;

interface UpdatePasswordFormProps {
  onSuccess?: () => void; // Callback opcional para quando a senha é atualizada com sucesso
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const UpdatePasswordForm = React.forwardRef<
  { submitForm: () => void },
  UpdatePasswordFormProps
>(({ onSuccess, onSubmittingChange }, ref) => {
  // Adicionado onSubmittingChange
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  const [updateError, setUpdateError] = useState<string | null>(null);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarNovaSenha, setShowConfirmarNovaSenha] = useState(false);

  const toggleSenhaAtualVisibility = () => setShowSenhaAtual((prev) => !prev);
  const toggleNovaSenhaVisibility = () => setShowNovaSenha((prev) => !prev);
  const toggleConfirmarNovaSenhaVisibility = () =>
    setShowConfirmarNovaSenha((prev) => !prev);

  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async (data) => {
    setUpdateError(null);
    try {
      const payload = {
        email: data.email,
        senhaAtual: data.senhaAtual,
        novaSenha: data.novaSenha,
      };

      await put("/auth/atualizar-senha", payload);

      toastCustomSuccess(
        "Sucesso",
        "Senha atualizada!",
        "Sua senha foi atualizada com sucesso. Você pode fazer login com a nova senha."
      );
      reset();
      onSuccess?.(); // Chama o callback de sucesso
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      let errorMessage = "Erro ao atualizar a senha. Tente novamente.";
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setUpdateError(errorMessage);
      toastCustomError("Erro", "Atualização de Senha", errorMessage);
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
      <h2 className="text-2xl font-bold text-center mb-6">Atualizar Senha</h2>
      {updateError && (
        <p className="text-red-500 text-center mb-4">{updateError}</p>
      )}
      {/* Email*/}
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
      {/* Senha Atual */}
      <div className="mb-4">
        <label htmlFor="senhaAtual" className="block text-sm font-bold mb-2">
          Senha Atual (Temporária)
        </label>
        <div className="relative">
          <input
            id="senhaAtual"
            type={showSenhaAtual ? "text" : "password"}
            {...register("senhaAtual")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            placeholder="Sua senha temporária"
            aria-invalid={errors.senhaAtual ? "true" : "false"}
            aria-describedby="senhaAtual-error"
          />
          <button
            type="button"
            onClick={toggleSenhaAtualVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
            aria-label={
              showSenhaAtual ? "Esconder senha atual" : "Mostrar senha atual"
            }
          >
            {showSenhaAtual ? <IoEye size={18} /> : <IoEyeOff size={18} />}
          </button>
        </div>
        {errors.senhaAtual && (
          <p id="senhaAtual-error" className="text-red-500 text-xs mt-1">
            {errors.senhaAtual.message}
          </p>
        )}
      </div>
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
            aria-label={
              showNovaSenha ? "Esconder nova senha" : "Mostrar nova senha"
            }
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
        <label
          htmlFor="confirmarNovaSenha"
          className="block text-sm font-bold mb-2"
        >
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
            aria-label={
              showConfirmarNovaSenha
                ? "Esconder confirmação de nova senha"
                : "Mostrar confirmação de nova senha"
            }
          >
            {showConfirmarNovaSenha ? (
              <IoEye size={18} />
            ) : (
              <IoEyeOff size={18} />
            )}
          </button>
        </div>
        {errors.confirmarNovaSenha && (
          <p
            id="confirmarNovaSenha-error"
            className="text-red-500 text-xs mt-1"
          >
            {errors.confirmarNovaSenha.message}
          </p>
        )}
      </div>
    </form>
  );
});
