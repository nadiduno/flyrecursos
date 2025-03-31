import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0  flex flex-col items-center justify-center bg-[#FFFFFFB2] z-50">
      <div className="bg-[#004054] p-6 rounded-md w-full max-w-sm">
        <h2 className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-3xl mx-auto text-center font-bold font-roboto ">FAÇA SEU LOGIN</h2>

        <label className="w-[50px] h-[21px] text-lg font-normal">
                E-mail
        </label> 
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <label className="w-[50px] h-[21px] text-lg font-normal">
                Senha
        </label> 
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <p>Ainda não tem conta? <span className="font-bold text-[#00CAFE]">Cadastre-se</span></p>
      </div>
      <div className="flex justify-center bg-[#FFFFFF] rounded-md w-full p-6 items-center max-w-sm">
          <button onClick={handleLogin} className="w-[400px] h-[40px]  rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]cking-normal text-center font-bold text-[20px]">
            Entrar
          </button>
      </div>
      
    </div>
  );
};

export default LoginModal;