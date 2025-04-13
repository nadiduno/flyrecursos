import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../context/AuthContext';

export default function Login(){

      // Initialize navigate
      const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const {login} = useAuth();
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  
    //login request
    const handleLogin = async() => {
        try {
        const response = await fetch(`${backendUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username, senha: password }),
        });

        // se login ok atualizar auth context provider para verificar se esta autenticado o usuario
        if (response.ok) {
            console.log('Login successful!');
           
            const result = await response.json();
            console.log(result);
            const token = result.accessToken;
            const expiresIn = result.expiresIn;
            login(token, expiresIn);
            setLoginError('');
            navigate('/'); 
        } else if (response.status === 401) {
            // Unauthorized error (401) indicates invalid credentials
            setLoginError('E-mail ou senha inválidos. Tente novamente.');   
            }
            else {
                const err = await response.json();
                setLoginError(err.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError(error instanceof Error ? error.message : String(error));
        }
    };
    
    

  
    
    return(

      // <!-- Componente Login-->
        <><div className="fixed inset-0  flex flex-col items-center justify-center bg-[#FFFFFFB2] z-50">
        <div className="bg-[#004054] p-6 rounded-t-md w-full max-w-sm">
          <h2 className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-3xl mx-auto text-center font-bold font-roboto ">FAÇA SEU LOGIN</h2>
  
          <label className="w-[50px] h-[21px] text-lg font-normal">
                  E-mail
          </label> 
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-black p-2 border rounded-md mb-2"
          />
          <label className="w-[50px] h-[21px] text-lg font-normal">
                  Senha
          </label> 
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black p-2 border rounded-md mb-4"
          />
          {loginError && (
            <p className="text-red-500 text-sm mb-2">{loginError}</p>
          )}
          {/* <p>Ainda não tem conta? 
            <span 
            className="font-bold text-[#00CAFE] cursor-pointer ml-1"
            onClick={() => setShowCreateAccount(true)}
            > Cadastre-se</span></p> */}
        </div>
        <div className="flex justify-center bg-[#FFFFFF] rounded-b-md w-full p-6 items-center max-w-sm">
            <button onClick={handleLogin} className="w-[400px] h-[40px]  rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]cking-normal text-center font-bold text-[20px]">
              Entrar
            </button>
        </div>
       
        
      </div></>
    )
}