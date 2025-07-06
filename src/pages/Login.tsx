// Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavbarLoginPage } from "../components/nav/NavBarLoginPage";
import { Footer } from "../components/footer/Footer";
import { ImagemBanner } from "../components/Dashboard/ImagemBanner";
import { TextMain } from "../components/text/TextMain";
import { FormLogin } from "../components/Login/FormLogin";
import { post } from "../services/api";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const createFormDataSchema = z.object({
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
    .max(15, "A senha deve ter no máximo 15 caracteres."),
});

type FormData = z.infer<typeof createFormDataSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createFormDataSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoginError("");
    try {
      const response = await post("/auth/login", data);

      if (response.data?.accessToken) {
        const isUserAdmin = login(
          response.data.accessToken,
          response.data.expiresIn
        );
        navigate(isUserAdmin ? "/dashboard" : "/aulas");
      } else {
        setLoginError(response?.data?.message || "Credenciais inválidas");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoginError(
          error.response?.data?.message || "E-mail ou senha incorretos"
        );
      } else if (error.code === "ECONNABORTED") {
        setLoginError("Tempo de conexão esgotado. Tente novamente.");
      } else {
        setLoginError("Erro ao conectar com o servidor.");
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleInputChange = () => {
    if (loginError) setLoginError("");
  };

  return (
    <div className="w-full mx-auto min-h-screen">
      <div className="w-[95%] mx-auto">
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <NavbarLoginPage />
        </nav>

        <header className="bg-white text-black border-b-[3px] border-primary2 rounded-2xl">
          <div className="relative w-full h-full max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] rounded-2xl">
            <ImagemBanner />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-4 md:px-20 py-4">
              <TextMain />
              <div className="rounded-xl w-full bg-primary1 py-4 px-6 flex flex-col items-start justify-start text-white">
                <p className="w-full md:text-xl mx-auto text-center font-bold text-primary2">
                  Faça seu Login
                </p>
                <FormLogin
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  errors={errors}
                  loginError={loginError}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  handleInputChange={handleInputChange}
                />
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
