import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavbarLoginPage } from "../componets/NavBarLoginPage";
import desktopImage from "../assets/LoginPage/large.jpg";
import { Footer } from "../componets/Footer";
import { post } from '../services/api'; 


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
      const response = await post('/login', { login: username, senha: password });

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
    <>
      <div className="w-full max-w-[1400px] mx-auto bg-[#0f0f0f] max-h-screen flex flex-col"
      // "overflow-hidden h-screen flex flex-col bg-primary1 font-roboto"
      >
        <nav className="h-[5.375rem] md:h-[7.75rem]shadow-md">
          <NavbarLoginPage />
        </nav>
        <header className="bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20">
          <div className="w-full">
            <div className=" w-full">
              <img
                src={desktopImage}
                alt="Banner principal"
                className="w-full min-h-[606px] object-cover  top-0 left-0 hidden md:block object-[80%_center]"
              />
            </div>
          </div>
        </header>
        <div
          className="md:fixed md:mt-[100px] md:left-1/2 md:transform md:-translate-x-1/2 md:z-50 md:flex md:justify-between md:items-start md:gap-10 md:max-w-[1400px] md:w-full md:px-10 
          
        "
        >
          <div className="hidden md:block md:max-w-[699px]">
            <h1 className="pt-12 text-2xl text-black xl:mt-[20px] md:mt-[140px] min-h-[189.61px] md:text-6xl  transform md:inline-block">
              Aprenda mais com <span className='text-primary2'>nossos Recursos</span>
            </h1>
            <p className="text-left xl:text-[#060606BF] xl:text-[24px] pt-5">
              Amplie seus horizontes educacionais! Nesta seção, você encontrará
              uma rica coleção de vídeos explicativos, artigos relevantes e
              aulas gravadas, cuidadosamente selecionados para enriquecer o
              processo de ensino e aprendizagem.
            </p>
          </div>
          <div
            className="flex flex-col items-center 
              justify-center  max-w-[400x] xl:min-w-[500px] xl:h-[550px]  "
          >
            {/*Componente Login*/}
            <div className=" bg-[#004054] rounded-t-md w-full h-full  ">
              <p className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-2xl mx-auto text-center font-bold font-roboto ">
                FAÇA SEU LOGIN
              </p>
              <div className="flex flex-col items-center">
                <div className="w-[400px] text-left">
                  <label className="w-[50px] h-[21px] text-lg font-normal">
                    E-mail
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Digite seu e-mail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-[400px] h-[50px] text-lg  text-black p-2 border rounded-md mb-[24px]"
                />

                <div className="w-[400px] text-left">
                  <label className="w-[50px] h-[21px] text-lg font-normal text-[18px]">
                    Senha
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[400px] h-[50px] text-lg  text-black p-2 border rounded-md mb-4"
                />
                {loginError && (
                  <p className="text-red-500 text-sm mb-2">{loginError}</p>
                )}

                <div className="w-full flex justify-end">
                  <Link
                    to="/recuperar-senha"
                    className="text-white hover:underline font-normal text-[18px] mr-[30px]"
                  >
                    Esqueci minha senha?{" "}
                  </Link>
                </div>

                <div className="w-[400px] text-left mt-[23px] mb-[14px]">
                  <p className="font-normal text-lg ">
                    Só para estudantes da Fly
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center bg-[#FFFFFF] rounded-b-md min-w-full p-6 items-center max-w-sm h-[152px]">
              <button
                onClick={handleLogin}
                className="w-[400px] h-[50px] rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-center font-bold text-[20px]"
              >
                ENTRAR
              </button>
            </div>
          </div>
        </div>

        <footer className="h-[2.375rem] md:h-[7.75rem]">
          <Footer />
        </footer>
      </div>
    </>
  );
}
