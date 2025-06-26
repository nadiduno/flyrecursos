import React, { useState, useEffect } from "react";
import { EditAccountForm } from "./EditAccountForm";
import { put } from "../../services/api";
import { FormData } from "../../types/typeFormData";
import { formatarMensagemErro } from "../../utils/formatarErrors";

import {
  toastCustomEditSuccess,
  toastCustomEditError,
} from "../../componets/ToastCustom";

interface EditAccountProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  studentData: FormData | null;
  onEditSuccess: () => void;
}

export const EditAccount: React.FC<EditAccountProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  studentData,
  onEditSuccess,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormData) => {
    // console.log("Dados do formulário:", formData);
    if (!studentData?.id) {
      toastCustomEditError("ID do aluno não encontrado para edição.");
      return;
    }

    const dataToUpdate = { ...formData, id: studentData.id };

    try {
      // console.log("Enviando requisição PUT para /alunos com o payload:", dataToUpdate);
      await put("/alunos", dataToUpdate);
      setCreationError(null);
      toastCustomEditSuccess(formData.nome || "Aluno");
      setTimeout(() => {
        onEditSuccess();
        setIsVisible(false);
      }, 1500);
    } catch (error) {
      // console.error("Erro na edição:", error);
      const errorMessage = formatarMensagemErro(error);
      setCreationError(errorMessage);
      toastCustomEditError(formData.nome || "Aluno");
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
      <div className="mt-[3.5rem] md:mt-[8rem] font-bold bg-primary1 text-white w-[95%] md:w-[60%] lg:w-[50%] h-[27rem] md:h-[34rem] rounded-t-[10px] shadow-2xl">
        <EditAccountForm
          onSubmit={onSubmit}
          setMessage={setMessage}
          setCreationError={setCreationError}
          message={message}
          creationError={creationError}
          defaultData={studentData || undefined}
          setIsVisible={setIsVisible}
        />
      </div>
    </div>
  );
};
