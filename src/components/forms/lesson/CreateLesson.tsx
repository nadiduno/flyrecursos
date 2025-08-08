import React, { useEffect } from "react";
import { CreateLessonForm } from "../lesson/CreateLessonForm";
import { post } from "../../../services/api";
import { FormDataLesson } from "../../../types/typeFormData";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";

import { toastCustomSuccess, toastCustomError } from "../../ToastCustom";

interface CreateLessonProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onLessonCreated?: () => void;
}

export const CreateLesson: React.FC<CreateLessonProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  onLessonCreated,
}) => {
  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  const onSubmit = async (formData: FormDataLesson) => {
    try {
      const payload: Omit<FormDataLesson, "id" | "urlCapa" | "ordem"> = {
        titulo: formData.titulo,
        tipo: formData.tipo,
        duracaoEstimada: formData.duracaoEstimada,
        linkConteudo: formData.linkConteudo,
        moduloId: formData.moduloId,
      };

      // console.log("Enviando requisição POST para: /api/aulas com o payload:", payload);
      await post("/api/aulas", payload);

      const lessonTitulo = formData.titulo || "Aula";
      toastCustomSuccess("Aula", lessonTitulo, "Criado com sucesso!"); // Ajustar tipo de entidade

      setTimeout(() => {
        setIsVisible(false);
        if (onLessonCreated) {
          onLessonCreated();
        }
      }, 1500);
    } catch (error) {
      console.error("Erro na criação:", error);

      // Tratamento de erro mais robusto com AxiosError
      if (error instanceof AxiosError) {
        // console.error("Detalhes do erro da API:", error.response?.data);
        const errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
        const nome = formData.titulo || "Aula";
        toastCustomError("Aula", nome, errorMessage);
      } else {
        const errorMessage = formatarMensagemErro(error);
        const nome = formData.titulo || "Aula";
        toastCustomError("Aula", nome, errorMessage);
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
      <div className="mt-[1rem] md:mt-[1.5rem] font-bold bg-primary1 text-white w-[90%] md:w-[70%] h-[30rem] md:h-[36rem] rounded-t-[10px] shadow-2xl">
        <CreateLessonForm onSubmit={onSubmit} setIsVisible={setIsVisible} />
      </div>
    </div>
  );
};
