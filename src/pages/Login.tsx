import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavbarLoginPage } from "../componets/NavBarLoginPage";
import { Footer } from "../componets/Footer";
import { post } from "../services/api";
import { ImagemBanner } from "../componets/Dashboard/ImagemBanner";
import { TextMain } from "../componets/TextMain";
import { ButtonFly } from "../componets/ButtonFly";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createFormDataSchema = z.object({
  // Validação com zod
  email: z
    .string()
    .nonempty("O e-mail é obrigatório.")
    .email("Formato de e-mail inválido.")
    .min(5, "O e-mail deve ter no mínimo 5 caracteres.")
    .max(50, "O e-mail deve ter no máximo 50 caracteres.")
    .transform((val) => val.toLowerCase()),
  senha: z
    .string()
    .nonempty("A senha é obrigatória.")
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(15, "A senha deve ter no máximo 15 caracteres.")
    // .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula."),
    // .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial.")
});

type FormData = z.infer<typeof createFormDataSchema>;

export default function Login() {
  // Initialize navigate
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createFormDataSchema),
  });

  // Submissão do formulário
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoginError("");
    try {
      //Usando Axios importado do api.ts
      const response = await post("/auth/login", data);

      // console.log("Resposta completa:", response);

      // se login ok atualizar auth context provider para verificar se esta autenticado o usuario
      if (response.data?.accessToken) {
        const isUserAdmin = login(
          response.data.accessToken,
          response.data.expiresIn
        );

        // Perfil condicional
        navigate(isUserAdmin ? "/dashboard" : "/aulas");

      } else {
        setLoginError(
          response?.data?.message || response?.data || "Credenciais inválidas"
        );
      }
    } catch (error: any) {
      console.error(
        "Erro na requisição de login:",
        error.response?.data || error.message || error
      );
      if (error.response?.status === 401) {
        setLoginError(
          error.response?.data?.message ||
            error.response?.data ||
            "E-mail ou senha incorretos"
        );
      } else if (error.code === "ECONNABORTED") {
        setLoginError("Tempo de conexão esgotado. Tente novamente.");
      } else {
        setLoginError("Erro ao conectar com o servidor.");
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = () => {
    if (loginError) {
      setLoginError("");
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen">
      <div className="w-[95%] mx-auto">
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <NavbarLoginPage />
        </nav>
        <header className="bg-white text-black border-b-[3px] border-primary2 rounded-2xl">
          <div className="w-full h-[24rem] md:h-full transition-all duration-500">
            <div className="relative w-full h-full max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] rounded-2xl">
              <ImagemBanner />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-[1rem] md:px-[5rem] ld:px-[5rem] py-4 md:py-0">
                <TextMain />

                <div className="rounded-xl w-full h-[200rem] md:h-[95%] bg-primary1 py-[0.5rem] md:py-[1rem] px-6 md:px-8 lg:px-20 flex flex-col items-start justify-start text-white text-[14px] md:text-[17px]">
                  <p className="w-full md:text-xl mx-auto text-center font-bold text-primary2">
                    Faça seu Login
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col"
                    aria-label="Formulário de Login"
                  >
                    {/* E-mail*/}
                    <div className="w-full text-left">
                      <label htmlFor="email" className="">
                        E-mail
                      </label>
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
                    {/* Erro para o e-mail*/}
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-red-500 text-[0.6rem] md:text-sm transition-all duration-20 mb-2"
                      >
                        {errors.email.message}
                      </p>
                    )}
                    {/* Espaçamento para manter o layout*/}
                    {!errors.email && <div className="h-[1.5rem] mb-2"></div>}

                    {/* Senha*/}
                    <div className="w-full text-left">
                      <label htmlFor="senha" className="">
                        Senha
                      </label>
                    </div>
                    <div className="relative w-full">
                      <input
                        autoComplete="off"
                        id="senha"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        {...register("senha", {
                          onChange: handleInputChange,
                        })}
                        className="w-full h-[2rem] text-gray-600 p-1 border rounded-md pr-10 mb-2"
                        aria-required="true"
                        aria-invalid={errors.senha ? "true" : "false"}
                        aria-describedby="senha-error"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer transition-all duration-200 transform hover:scale-110"
                        aria-label={
                          showPassword ? "Esconder senha" : "Mostrar senha"
                        }
                        aria-controls="senha"
                      >
                        {showPassword ? (
                          <span
                            role="img"
                            className="mb-1 hover:bg-secondary hover:bg-opacity-70 hover:rounded-lg transition-transform duration-500"
                          >
                            <IoEye
                              size={18}
                              className=" opacity-90 hover:opacity-100 hover:text-primary1 cursor-pointer transition-transform duration-500"
                              title="Esconder senha"
                              aria-label="Olho aberto"
                            />
                          </span>
                        ) : (
                          <span
                            role="img"
                            className="mb-1 hover:bg-secondary hover:bg-opacity-70 hover:rounded-lg transition-transform duration-500"
                          >
                            <IoEyeOff
                              size={18}
                              className=" opacity-90 hover:opacity-100 hover:text-primary1 cursor-pointer transition-transform duration-500"
                              title="Mostrar senha"
                              aria-label="Olho fechado"
                            />
                          </span>
                        )}
                      </button>
                    </div>
                    {/* Erro para a senha */}
                    {errors.senha && (
                      <p
                        id="senha-error"
                        className="text-red-500 text-[0.6rem] md:text-sm transition-all duration-20 mb-2"
                      >
                        {errors.senha.message}
                      </p>
                    )}
                    {/* Espaçamento para manter o layout */}
                    {!errors.senha && <div className="h-[1.5rem] mb-2"></div>}

                    <div className="min-h-[1rem] text-[0.6rem] md:text-sm transition-all duration-200">
                      {/* Erro do login */}
                      {loginError && (
                        <p
                          className="text-red-500 h-[1rem] mb-[-1rem] md:mb-[0.125rem] mt-[-1rem] md:mt-[-0.5rem]"
                          aria-live="polite"
                        >
                          {loginError}
                        </p>
                      )}
                      {/* Espaçamento para manter o layout */}
                      {!errors.senha && (
                        <div className="h-[1rem] mb-[-1rem] md:mb-[0.125rem] mt-[-1rem] md:mt-[-0.5rem]"></div>
                      )}
                    </div>

                    <div className="w-full flex justify-end m-[-1rem] md:m-[0.125rem]">
                      <Link to="/recuperar-senha" className="hover:underline">
                        Esqueci minha senha?{" "}
                      </Link>
                    </div>

                    <div className="w-full text-center pt-[1rem] md:pt-[2rem] pb-[1rem] ">
                      <p>Só para estudantes da Fly</p>
                    </div>
                    <ButtonFly
                      text="Entrar"
                      type="submit"
                      aria-label="Entrar na plataforma"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </header>

        <footer className="h-[5.375rem] md:h-[7.75rem] mt-10">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
