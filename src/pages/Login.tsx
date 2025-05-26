import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavbarLoginPage } from "../componets/NavBarLoginPage";
import { Footer } from "../componets/Footer";
import { post } from "../services/api";
import { ImagemBanner } from "../componets/ImagemBanner";
import { TextMain } from "../componets/TextMain";
import { ButtonFly } from "../componets/ButtonFly";

export default function Login() {
  // Initialize navigate
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  // const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  //login request
  const handleLogin = async () => {
    try {
      // const response = await fetch(`${backendUrl}/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ login: username, senha: password }),
      // });

      //Usando Axios importado do api.ts
      const response = await post("/login", {
        login: username,
        senha: password,
      });

      // se login ok atualizar auth context provider para verificar se esta autenticado o usuario
      if (response.status >= 200 && response.status < 300) {
        console.log("Login successful!");

        // const result = await response.json();
        // console.log(result);
        // const token = result.accessToken;
        // const expiresIn = result.expiresIn;

        //Desentralizando
        const { accessToken, expiresIn } = response.data;

        login(accessToken, expiresIn);
        setLoginError("");
        navigate("/");
      } else if (response.status === 401) {
        // Unauthorized error (401) indicates invalid credentials
        setLoginError("E-mail ou senha inválidos. Tente novamente.");
      } else {
        //const err = await response.json();
        setLoginError("Problema ao fazer login. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      //setLoginError(error instanceof Error ? error.message : String(error));
      setLoginError("Problema ao fazer login. Tente novamente.");
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

                <div className="rounded-xl w-full h-[200rem] md:h-[95%] bg-primary1 py-[0.5rem] md:py-[2rem] px-6 md:px-8 lg:px-20 flex flex-col items-start justify-start gap-3 text-white text-[14px] md:text-[17px]">
                  <p className="w-full md:text-xl mx-auto text-center font-bold text-primary2">
                    Faça seu Login
                  </p>
                  <div className="w-full flex flex-col ">
                    <div className="w-full text-left">
                      <label className="">E-mail</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Digite seu e-mail"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-[2rem] text-gray-600 p-1 border rounded-md mb-6"
                    />
                    <div className="w-full text-left">
                      <label className="">Senha</label>
                    </div>
                    <input
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-[2rem] text-gray-600 p-1 border rounded-md mb-6"
                    />
                    <div className="min-h-[1rem] mb-[0.5] mt-[-1rem] md:mt-[0.25rem] md:mb-2 text-[0.75rem] md:text-sm transition-all duration-200">
                      {loginError && (
                        <p className="text-red-500 ">{loginError}</p>
                      )}
                    </div>
                    <div className="w-full flex justify-end pt-2">
                      <Link to="/recuperar-senha" className="hover:underline">
                        Esqueci minha senha?{" "}
                      </Link>
                    </div>

                    <div className="w-full text-center pt-[1rem] md:pt-[2rem] pb-[1rem]">
                      <p>Só para estudantes da Fly</p>
                    </div>
                    <ButtonFly text="Entrar" onClick={handleLogin} />
                  </div>
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
