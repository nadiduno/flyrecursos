import React, { useState } from "react";
import { CreateAccount } from "../forms/account/CreateAccount";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleLogin = () => {
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFFB2]">
      <div className="bg-[#004054] p-6 rounded-t-md w-full max-w-sm">
        <h2 className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-3xl mx-auto text-center font-bold font-roboto">
          FAÇA SEU LOGIN
        </h2>

        <label className="text-lg font-normal">E-mail</label>
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full text-black p-2 border rounded-md mb-2"
        />

        <label className="text-lg font-normal">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black p-2 border rounded-md mb-4"
        />

        <p>
          Ainda não tem conta?
          <span
            className="font-bold text-[#00CAFE] cursor-pointer ml-1"
            onClick={() => setShowCreateAccount(true)}
          >
            Cadastre-se
          </span>
        </p>
      </div>

      <div className="flex justify-center bg-[#FFFFFF] rounded-b-md w-full p-6 items-center max-w-sm">
        <button
          onClick={handleLogin}
          className="w-[400px] h-[40px] rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_rgba(0,0,0,0.2)] font-bold text-[20px]"
        >
          Entrar
        </button>
      </div>

      {showCreateAccount && (
        <CreateAccount
          isVisible={showCreateAccount}
          setIsVisible={setShowCreateAccount}
        />
      )}
    </div>
  );
};

export default LoginPage;
