import { Link } from "react-router-dom"; // Ainda manteremos Link para estrutura, mas usaremos onClick
import { ButtonFly } from "../botoes/ButtonFly";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  SubmitHandler,
} from "react-hook-form";

interface FormData {
  email: string;
  senha: string;
}

interface FormLoginProps {
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: SubmitHandler<FormData>;
  errors: FieldErrors<FormData>;
  loginError: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleInputChange: () => void;
  // NOVO: Adicionado o callback para o clique em "Esqueci minha senha?"
  onForgotPasswordClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function FormLogin({
  register,
  handleSubmit,
  onSubmit,
  errors,
  loginError,
  showPassword,
  togglePasswordVisibility,
  handleInputChange,
  onForgotPasswordClick, // NOVO
}: FormLoginProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col"
      aria-label="Formulário de Login"
    >
      {/* E-mail */}
      <div className="w-full text-left">
        <label htmlFor="email">E-mail</label>
      </div>
      <input
        autoFocus
        id="email"
        type="text"
        placeholder="Digite seu e-mail"
        {...register("email", { onChange: handleInputChange })}
        className="w-full h-[2rem] text-gray-600 p-1 border rounded-md mb-2"
        aria-required="true"
        aria-invalid={errors.email ? "true" : "false"}
        aria-describedby="email-error"
      />
      {errors.email ? (
        <p
          id="email-error"
          className="text-red-500 text-[0.6rem] md:text-sm transition-all duration-20 mb-2"
        >
          {errors.email.message}
        </p>
      ) : (
        <div className="h-[1.5rem] mb-2" />
      )}

      {/* Senha */}
      <div className="w-full text-left">
        <label htmlFor="senha">Senha</label>
      </div>
      <div className="relative w-full">
        <input
          autoComplete="off"
          id="senha"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          {...register("senha", { onChange: handleInputChange })}
          className="w-full h-[2rem] text-gray-600 p-1 border rounded-md pr-10 mb-2"
          aria-required="true"
          aria-invalid={errors.senha ? "true" : "false"}
          aria-describedby="senha-error"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer transition-all duration-200 transform hover:scale-110"
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          aria-controls="senha"
        >
          {showPassword ? (
            <IoEye
              size={18}
              className="opacity-90 hover:opacity-100 hover:text-primary1"
            />
          ) : (
            <IoEyeOff
              size={18}
              className="opacity-90 hover:opacity-100 hover:text-primary1"
            />
          )}
        </button>
      </div>
      {errors.senha ? (
        <p
          id="senha-error"
          className="text-red-500 text-[0.6rem] md:text-sm transition-all duration-20 mb-2"
        >
          {errors.senha.message}
        </p>
      ) : (
        <div className="h-[1.5rem] mb-2" />
      )}

      {/* Erro login */}
      <div className="min-h-[1rem] text-[0.6rem] md:text-sm transition-all duration-200">
        {loginError && (
          <p
            className="text-red-500 h-[1rem] mb-[-1rem] md:mb-[0.125rem] mt-[-1rem] md:mt-[-0.5rem]"
            aria-live="polite"
          >
            {loginError}
          </p>
        )}
        {!errors.senha && (
          <div className="h-[1rem] mb-[-1rem] md:mb-[0.125rem] mt-[-1rem] md:mt-[-0.5rem]" />
        )}
      </div>

      <div className="w-full flex justify-end m-[-1rem] md:m-[0.125rem]">
        {/* Usar o Link com onClick para abrir o modal */}
        <Link
          to="#" // Pode ser "#" ou outro valor, já que o JS vai impedir a navegação
          onClick={onForgotPasswordClick}
          className="hover:underline"
        >
          Esqueci minha senha?
        </Link>
      </div>

      <div className="w-full text-center pt-[1rem] md:pt-[2rem] pb-[1rem] ">
        <p>Só para estudantes da Fly</p>
      </div>

      <ButtonFly text="Entrar" type="submit" aria-label="Entrar na plataforma" />
    </form>
  );
}