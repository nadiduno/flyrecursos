import React, { useEffect } from "react";
import { CreateAccountForm } from "./CreateAccountForm";
import { post } from "../../services/api"; 
import { FormData } from "../../types/typeFormData";
import { formatarMensagemErro} from "../../utils/formatarErrors";
import { AxiosError } from "axios";

import {
  toastCustomEditSuccess,
  toastCustomEditError,
} from "../../componets/ToastCustom";


interface CreateAccountProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
}) => {
  
  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  const onSubmit = async (formData: FormData) => {
    const { perfil, dataNascimento, ...commonData } = formData;
    let endpoint = "";
    let dataToSend: Partial<FormData> = commonData;

    if (perfil === "ALUNO") {
      endpoint = "/alunos";
      dataToSend = { ...commonData, dataNascimento };
      // console.log("Aluno", dataToSend)
    } else if (perfil === "ADMIN") {
      endpoint = "/admin";
      dataToSend = commonData;
      // console.log("Admin", dataToSend)
    } else {
      toastCustomEditError("Usuário", "Perfil inválido. Não foi possível criar o usuário.");
      return;
    }

    try {
      
      // console.log("Enviando para:", import.meta.env.VITE_BACKEND_BASE_URL + endpoint);
      // console.log("Enviando requisição POST para:", endpoint, "com o payload:", dataToSend);
      const response = await post(endpoint, dataToSend);
      console.log(response.data); 
      
      const nome = formData.nome || "Usuário";
      toastCustomEditSuccess(nome, "Foi criado com sucesso!!!");

      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      
    } catch (error) {
      console.error("Erro na criação:", error);

      // Tratamento de erro mais robusto com AxiosError
      if (error instanceof AxiosError) {
        // console.error("Detalhes do erro da API:", error.response?.data);
        const errorMessage = error.response?.data?.message || formatarMensagemErro(error);
        const nome = formData.nome || "Usuário";
        toastCustomEditError(nome, errorMessage);
      } else {
        const errorMessage = formatarMensagemErro(error);
        const nome = formData.nome || "Usuário";
        toastCustomEditError(nome, errorMessage);
      }
    }
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
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[1rem] md:mt-[4rem] font-bold bg-primary1 text-white w-[90%] md:w-[70%] h-[33.5rem] md:h-[40rem] rounded-t-[10px] shadow-2xl">
        <CreateAccountForm
          onSubmit={onSubmit}
          setIsVisible={setIsVisible} 
        />
      </div>
    </div>
  );
};