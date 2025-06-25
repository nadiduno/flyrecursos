import React, { useState, useEffect } from "react";
import { CreateAccountForm } from "./CreateAccountForm";
import { post } from "../../services/api"; 
import { FormData } from "../../types/typeFormData";
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
 if (data.perfil === "ALUNO") {
  try {
    console.log("Enviando para:", import.meta.env.VITE_BACKEND_BASE_URL + "/alunos");
    await post("/alunos", data);
    setMessage("Usuário criado com sucesso!");
    setCreationError(null);
    setTimeout(() => {
      setIsVisible(false)
    }, 3000);
    
  } catch (error) {
    console.error("Erro na criação:", error);
    setCreationError(formatarMensagemErro(error));
    setMessage(null);
  }
} else if (data.perfil === "ADMIN") {
  try {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { dataNascimento, ...adminData } = data;
    console.log("Enviando para:", import.meta.env.VITE_BACKEND_BASE_URL + "/admin");
    await post("/admin", adminData);
    setMessage("Usuário criado com sucesso!");
    setCreationError(null);
     setTimeout(() => {
      setIsVisible(false)
    }, 3000);
  } catch (error) {
    console.log(error);
    setCreationError(
      error instanceof Error ? error.message : "Erro ao criar usuário"
    );
    setMessage(null);
  }
} else {
  console.log("Perfil inválido. Não foi possível criar o usuário.");
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
        <p className="mt-[50px] mb-[49px] w-[300px] h-[50px] text-xl md:text-3xl lg:text-3xl mx-auto text-center font-bold font-roboto">
          CRIAR CONTA {creationError && (
  <p className="text-red-500 mt-3 text-center text-xl">
    {creationError}
  </p>
)}
    {message && (
  <p className="text-green-500 mt-3 text-center sm:text-xl md:text-xl">
    {message}
  </p>
)}
        </p>
   
        <div className="px-10">
          <CreateAccountForm
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
