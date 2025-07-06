import React, { useState, useEffect } from "react";
import { EditLessonForm } from "../lesson/EditLessonForm";
import { put } from "../../../services/api";
import { FormDataLesson } from "../../../types/typeFormData";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";

import {
  toastCustomSuccess,
  toastCustomError,
} from "../../ToastCustom";

interface EditLessonProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  lessonData: FormDataLesson | null;
  onEditSuccess: () => void;
}

export const EditLesson: React.FC<EditLessonProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  lessonData,
  onEditSuccess,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormDataLesson) => {
    // console.log("Dados do formulário:", formData);
    if (!lessonData?.id) {
      toastCustomError("Conta", "ID do aula não encontrado para edição.");
      return;
    }

    // const dataToUpdate = { ...formData, id: lessonData.id };
    const dataToUpdate = {
      ...formData,
      id: lessonData.id, 
      ordem: lessonData.ordem,
    };

    try {
      // console.log("Enviando requisição PUT para /aulas com o payload:", dataToUpdate);
      await put("/api/aulas", dataToUpdate);
      setCreationError(null);
      toastCustomSuccess(
        "Aula",
        formData.titulo || "Aula",
        "Foi editado com sucesso!"
      );

      setTimeout(() => {
        onEditSuccess();
        setIsVisible(false);
      }, 1500);
    } catch (error) {
      // Tratamento de erro mais robusto com AxiosError
      if (error instanceof AxiosError) {
        // Loga os detalhes da resposta da API para depuração
        console.error(
          "Detalhes do erro da API (edição):",
          error.response?.data
        );
        const errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
        const nome = formData.titulo || "Aula";
        toastCustomError("Aula", nome, errorMessage);
        setCreationError(errorMessage);
      } else {
        // Caso não seja um erro do Axios (ex: erro de rede, erro de código)
        const errorMessage = formatarMensagemErro(error);
        const nome = formData.titulo || "Aula";
        toastCustomError("Aula", nome, errorMessage);
        setCreationError(errorMessage);
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
      <div className="mt-[1rem] md:mt-[1rem] font-bold bg-primary1 text-white w-[90%] md:w-[70%] h-[28rem] md:h-[36rem] rounded-t-[10px] shadow-2xl">
        <EditLessonForm
          onSubmit={onSubmit}
          setMessage={setMessage}
          setCreationError={setCreationError}
          message={message}
          creationError={creationError}
          defaultData={
            lessonData
              ? {
                  titulo: lessonData.titulo,
                  tipo: lessonData.tipo,
                  duracaoEstimada: lessonData.duracaoEstimada,
                  linkConteudo: lessonData.linkConteudo,
                  moduloId: lessonData.moduloId,
                  id: lessonData.id,
                  ordem: lessonData.ordem,
                }
              : undefined
          }
          setIsVisible={setIsVisible}
        />
      </div>
    </div>
  );
};