import React, { useState, useEffect } from "react";
import AccountForm from "./AccountForm";
import { post } from "../../services/api"; 
import FormData from "../../types/typeFormData";
import { formatarMensagemErro} from "../../utils/formatarErrors";

interface CreateAccountProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };
    
console.log("Payload:", data);
   if(data.perfil === "ALUNO"){
    try {
      console.log("Enviando para:", import.meta.env.VITE_BACKEND_BASE_URL + "/alunos");
      await post("/alunos", data);
      setMessage("Usuário criado com sucesso!");
      setCreationError(null);
    } catch (error) {
  console.error("Erro na criação:", error);
 setCreationError(formatarMensagemErro(error));


  setMessage(null);

  } }if(data.perfil === "ADMIN"){
try{
  console.log("Enviando para:", import.meta.env.VITE_BACKEND_BASE_URL + "/admin");
   await post("/admin", data);
   setMessage("Usuario criado com sucesso!");
   setCreationError(null);
}catch(error){
 console.log(error);
   setCreationError(
        error instanceof Error ? error.message : "Erro ao criar usuário"
      );
      setMessage(null);
}
  }else{
    console.log("error al criar usuario")
  }
   }
    
  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  const handleBackButton = (): void => {
    setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  if (!propIsVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFFFB2] z-50">
      <div className="text-xl mt-[360px] font-bold bg-[#004054] text-white w-[942px] h-[549px] rounded-[10px] mb-[400px]">
        <p className="mt-[50px] mb-[49px] w-[236px] h-[50px] text-xl md:text-3xl lg:text-3xl mx-auto text-center font-bold font-roboto">
          CRIAR CONTA {creationError?.includes("Email") && (
  <p className="text-red-500 mt-4 text-center text-xl">
    {creationError}
  </p>
)}
        </p>
   
        <div className="px-10">
          <AccountForm
            onSubmit={onSubmit}
            setMessage={setMessage}
            setCreationError={setCreationError}
            message={message}
            creationError={creationError}
          />
      
        </div>
      </div>
    </div>
  );
};
