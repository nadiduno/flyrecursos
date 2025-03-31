import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

interface CreateAccountProps {
  isVisible: boolean; // Prop from parent
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>; // Setter function from parent

}

export const CreateAccount: React.FC<CreateAccountProps> = ({ isVisible: propIsVisible, setIsVisible }) => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormData) => {
    console.log("submitted data", formData);

    try {
      //replace create user url
      const response = await fetch('http://localhost:8080/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        //console.log('usuario criado:', result);

        setMessage(result.message);
        setCreationError(null);
      } else {
        const err = await response.json();
        setCreationError(err.message);
        setMessage(null);
        //console.log('Não foi possivel criar a conta:', err);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    
  };

  //Componente dinamico para esc, ou botão atras do telefone
  //Se clicar esc sumira o componente
  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      //console.log("esc")
      setIsVisible(false); 
    }
  };

  // Se clicar no botão voltar do telefone ou navegador, o componente some
  const handleBackButton = (): void => {
    setIsVisible(false); 
  };

  // Set up event listeners on component mount
  useEffect(() => {
    
    // Listener for Escape key
    window.addEventListener('keydown', handleEscape);

    // Listener para botão voltar do telefone (history chage)
    window.addEventListener('popstate', handleBackButton);

    // Deletar listener quando o componente for desmontado
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  //  PARA VER COMPONENTE MUDAR PARA isVisible 
  if (!propIsVisible) return null;


  return (
   
    <div className="fixed inset-0  flex items-center justify-center bg-[#FFFFFFB2] z-50">
      
      <div className="text-xl mt-[200px] font-bold mb-4 bg-[#004054] text-white  w-[500px] h-[669px] rounded-[10px]">
        <h1 className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-3xl mx-auto text-center font-bold font-roboto ">
          CRIE SUA CONTA
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="ml-[57px]">
            <div className="w-[400px] h-[73px] mb-[24px]">
              <label className="w-[50px] h-[21px] text-lg font-normal">
                Nome completo
              </label>
              <input
                {...register("name", { required: true })}
                className="w-[400px] h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] font-normal text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                type="text"
                placeholder="Digite seu nome completo"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  O nome é obrigatório
                </p>
              )}
            </div>
            <div className="w-[400px] h-[73px] mb-[24px]">
              <label className="w-[50px] h-[21px] text-lg font-normal">
                E-mail
              </label>
              <input
                className="w-[400px] h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] font-normal text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                {...register("email", { required: true},)}
                type="email"
                placeholder="Digite seu email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">O e-mail é obrigatório</p>}
            </div>

            <div className="w-[400px] h-[73px] mb-[24px]">
              <label className="w-[50px] h-[21px] text-lg font-normal">
                Senha
              </label>
              <input
                {...register("password", { required: true })}
                className="w-[400px] h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] font-normal text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                type="password"
                placeholder="Digite sua senha"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">A Senha é obrigatória</p>}
            </div>
            <div className="w-[400px] h-[73px] mb-[39px]">
              <label className="w-[50px] h-[21px] text-lg font-normal">
                Repita a senha
              </label> 
              <input
                {...register("password2", {
                  required: "A senha é obrigatória",
                  validate: (value) =>
                    value === watch("password") || "As senhas não coincidem",
                })}
                className="w-[400px] h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] font-normal text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                type="password"
                placeholder="Digite sua senha novamente"
              />
              {errors.password2 && <p className="text-red-500 text-xs mt-1">As senhas não coincidem</p>}
              {creationError && <p className="text-red-500 text-xs mt-1">{creationError}</p>}
              {message && <p className="text-green-500 text-xs mt-1">{message}</p>}
            </div>
          </div>
          
          <div className="w-[500px] h-[152px] bt-[5px] rounded-b-[5px] bg-[#FFFFFF] flex justify-center items-center space-x-4">
          
            <button
              className="w-[400px] h-[50px]  rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]"
              type="submit"
            > <p className="h-[23px] leading-tight tracking-normal text-center font-bold text-[20px]">CRIAR CONTA</p>
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};
