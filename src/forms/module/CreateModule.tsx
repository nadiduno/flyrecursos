import React, { useState, useEffect } from "react";
import { post } from "../../services/api";
import { FormDataModule } from "../../types/typeFormData";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { AxiosError } from "axios";
import { CreateModuleForm } from "./CreateModuleForm";

import {
  toastCustomSuccess,
  toastCustomError,
} from "../../componets/ToastCustom";

interface CreateModuleProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onModuleCreated: () => void;
}

export const CreateModule: React.FC<CreateModuleProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  onModuleCreated,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      setIsVisible(false);
      setMessage(null);
      setCreationError(null);
    }
  };

  const onSubmit = async (formData: FormDataModule) => {
    try {
      setCreationError(null);
      setMessage(null);

      const payload: FormDataModule = {
        titulo: formData.titulo,
      };

      // console.log("Enviando requisição POST para: /api/modulos com o payload:", payload);
      await post("/api/modulos", payload);
      
      const moduleTitulo = formData.titulo || "Módulo";
      toastCustomSuccess("Módulo",moduleTitulo, "Criado com sucesso!");
      // setMessage("Módulo criado com sucesso!");

      setTimeout(() => {
        setIsVisible(false);
        onModuleCreated();
        setMessage(null);
        setCreationError(null);
      }, 1500);
    } catch (error) {
      console.error("Erro na criação do módulo:", error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
        const moduleTitulo = formData.titulo || "Módulo";
        toastCustomError("Módulo",moduleTitulo, errorMessage);
        setCreationError(errorMessage);
      } else {
        const errorMessage = formatarMensagemErro(error);
        const moduleTitulo = formData.titulo || "Módulo";
        toastCustomError("Módulo",moduleTitulo, errorMessage);
        setCreationError(errorMessage);
      }
      setMessage(null);
    }
  };

  const handleBackButton = (): void => {
    setIsVisible(false);
    setMessage(null);
    setCreationError(null);
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
      <div className="mt-[1rem] md:mt-[4rem] font-bold bg-primary1 text-white w-[90%] md:w-[70%] h-[15rem] md:h-[20rem] rounded-t-[10px] shadow-2xl">
        <CreateModuleForm
          onSubmit={onSubmit}
          setIsVisible={setIsVisible}
          message={message}
          creationError={creationError}
          setCreationError={setCreationError}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};
