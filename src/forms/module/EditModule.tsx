import React, { useState, useEffect } from "react";
import { put } from "../../services/api";
import { FormDataModule } from "../../types/typeFormData";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { AxiosError } from "axios";
import { EditModuleForm } from "./EditModuleForm";

import {
  toastCustomEditSuccess,
  toastCustomEditError,
} from "../../componets/ToastCustom";

interface EditModuleProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  moduleData: FormDataModule | null;
  onEditSuccess: () => void;
}

export const EditModule: React.FC<EditModuleProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  moduleData,
  onEditSuccess,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormDataModule) => {
    // console.log("Dados do formulário:", formData);
    if (!moduleData?.id) {
      toastCustomEditError(
        "Edição de Módulo",
        "ID do módulo não encontrado para edição."
      );
      return;
    }

    const dataToUpdate = {
      id: moduleData.id,
      titulo: formData.titulo,
    };

    try {
      // console.log("Enviando PUT para /api/modulos:", dataToUpdate);
      await put("/api/modulos", dataToUpdate);
      setCreationError(null);
      toastCustomEditSuccess(formData.titulo || "Módulo","Foi editado com sucesso!");

      setTimeout(() => {
        onEditSuccess();
        setIsVisible(false);
      }, 1500);
    } catch (error) {
      // Tratamento de erro mais robusto com AxiosError
      if (error instanceof AxiosError) {
        // Loga os detalhes da resposta da API para depuração
        console.error("Detalhes do erro:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        const errorMessage =
          error.response?.data?.mensagem ||
          error.response?.data?.message ||
          formatarMensagemErro(error);

        toastCustomEditError("Edição", errorMessage);
      } else {
        toastCustomEditError("Edição", formatarMensagemErro(error));
      }
    }
  };

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
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[3.25rem] md:mt-[8rem] font-bold bg-primary1 text-white w-[90%] md:w-[60%] lg:w-[50%] h-[14rem] md:h-[20rem] rounded-t-[10px] shadow-2xl">
        <EditModuleForm
          onSubmit={onSubmit}
          setMessage={setMessage}
          setCreationError={setCreationError}
          message={message}
          creationError={creationError}
          defaultData={
            moduleData
              ? {
                  titulo: moduleData.titulo,
                }
              : undefined
          }
          setIsVisible={setIsVisible}
        />
      </div>
    </div>
  );
};
