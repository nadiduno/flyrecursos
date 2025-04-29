import React, { useState, useEffect } from 'react';
import {useForm } from "react-hook-form";


type FormData = {
  nome: string;
  email: string;
  cpf:string;
  dataNascimento: string;
  perfil: string;
  perfilAluno: string;
  senha: string;
  senha2: string;
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
  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL; // URL do backend
  const token = localStorage.getItem("accessToken"); // Token de autenticação

  const onSubmit = async (formData: FormData) => {
    //console.log("submitted data", formData);

    try {
      //replace create user url
      const response = await fetch(`${backendUrl}/alunos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Adicionando o token no header
        },
        body: JSON.stringify(formData),
      });

      if (response.ok || response.status === 204) {
        setMessage('Usuario criado com sucesso!');
        setCreationError(null);
      } else if(response.status === 409){
        const err = await response.json();
        setCreationError(err.message || 'Erro ao criar usuário');
        setMessage(null);

      }
    } catch (error) {
      console.error('Error:', error);
      console.log('catch:', error);

      setCreationError('Erro ao criar usuário');
      setMessage(null);
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
      
      <div className="text-xl mt-[360px] font-bold bg-[#004054] text-white  w-[942px] h-[549px] rounded-[10px] mb-[400px]">
        <p className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-xl md:text-3xl lg:text-3xl mx-auto text-center font-bold font-roboto ">
          CRIAR CONTA
        </p>
        <form action="" onSubmit={handleSubmit(onSubmit)} onChange={() => {setMessage(null); setCreationError(null);}}>
          <div className="flex flex-row place-content-around gap-1">
            <div>
            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                Nome completo
              </label>
              <input
                {...register("nome", { required: true })}
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                type="text"
                placeholder="Digite seu nome completo"
              />
              {errors.nome && (
                <p className="text-red-500 text-xs mt-1">
                  O nome é obrigatório
                </p>
              )}
            </div>
            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                E-mail
              </label>
              <input
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                {...register("email", { required: true},)}
                type="email"
                placeholder="Digite seu email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">O e-mail é obrigatório</p>}
            </div>

            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                CPF
              </label>
              <input
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                {...register("cpf", { required: true},)}
                type="text"
                placeholder="000.000.000-00"
              />
              {errors.cpf && <p className="text-red-500 text-xs mt-1">O CPF é obrigatório</p>}
            </div>

            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Data de nascimento
              </label>
              <input
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                {...register("dataNascimento", { required: true,})}
                max={
                  new Date(Date.now() - 86400000)
                    .toISOString()
                    .split("T")[0] // → "2022-01-17"
                } // não pode ser maior que a data atual	
                type="date"
                placeholder="Digite sua data de nascimento"
              />
              {errors.dataNascimento && <p className="text-red-500 text-xs mt-1">A data esta errada</p>}
            </div>
            </div>
                <div>
            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                Perfil da conta
              </label>
              <select
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                {...register("perfil", { required: true},)}
                defaultValue={"ALUNO"}
              >
                <option value="ALUNO">Aluno</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                Perfil do aluno
              </label>
              <select
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                {...register("perfilAluno", { required: true},)}
                defaultValue={"MERCADO"}
              >
                <option value="MERCADO">Mercado</option>
                <option value="TECNOLOGIA">Tecnologia</option>
                <option value="MARKETING_E_EMPREENDEDORISMO">Marketing e Empreendedorismo</option>
                <option value="SUPERPROFS">SuperProfs</option>
                <option value="COLORINDO">Colorindo</option>
                <option value="ALL">Tudo</option>
        
              </select>
            </div>

            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                Senha
              </label>
              <input
                {...register("senha", { required: true })}
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                type="password"
                placeholder="Digite sua senha"
              />
              {errors.senha && <p className="text-red-500 text-xs mt-1">A Senha é obrigatória</p>}
            </div>
            <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
              <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
                Repita a senha
              </label> 
              <input
                {...register("senha2", {
                  required: "A senha é obrigatória",
                  validate: (value) =>
                    value === watch("senha") || "As senhas não coincidem",
                })}
                className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
                type="password"
                placeholder="Digite sua senha novamente"
              />
              {errors.senha2 && <p className="text-red-500 text-xs mt-1">As senhas não coincidem</p>}
              {creationError && <p className="text-red-500 text-xs mt-1">{creationError}</p>}
              {message && <p className="text-green-500 text-xs mt-1">{message}</p>}
            </div>
          </div>
          </div>
          
          <div className="w-[942px] h-[152px] bt-[5px] rounded-b-[5px] bg-[#FFFFFF] flex justify-center items-center space-x-4">
          
            <button
              className="w-[400px] min-h-[50px]  rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]"
              type="submit"
            > <p className="h-[23px] leading-tight tracking-normal text-center font-bold text-[20px]">CRIAR CONTA</p>
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};
