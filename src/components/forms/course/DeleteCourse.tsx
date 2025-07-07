import React, { useEffect } from "react";
import { del } from "../../../services/api";
import { TableRowDataCourse } from "../course/Course";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";

import {
  toastCustomSuccess,
  toastCustomError,
} from "../../ToastCustom";
import { DeleteCourseForm } from "./DeleteCourseForm";

interface DeleteCourseProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  courseData: TableRowDataCourse | null;
  onDeleteSuccess: () => void;
}

export const DeleteCourse: React.FC<DeleteCourseProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  courseData,
  onDeleteSuccess,
}) => {
  const handleDeleteConfirm = async () => {
    if (!courseData?.id) {
      toastCustomError("Erro", "ID do Cuso não encontrado para exclusão.");
      setIsVisible(false);
      return;
    }

    try {
      await del(`/api/cursos/${courseData.id}`);
      const nome = courseData.titulo || "Cuso";
      toastCustomSuccess("Cuso",nome, "Foi eliminado com sucesso!");

      setTimeout(() => {
        onDeleteSuccess();
        setIsVisible(false);
      }, 500);

    } catch (error) {
      // Tratamento de erro mais robusto com AxiosError
      if (error instanceof AxiosError) {
        console.error("Detalhes do erro da API (exclusão):", error.response?.data);
        const errorMessage = error.response?.data?.message || formatarMensagemErro(error);
        const nome = courseData.titulo || "Cuso";
        toastCustomError("Cuso",nome, errorMessage);
      } else {
        const errorMessage = formatarMensagemErro(error);
        const nome = courseData.titulo || "Cuso";
        toastCustomError("Cuso",nome, errorMessage);
      }
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!propIsVisible || !courseData) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[3.25rem] md:mt-[8rem] font-bold bg-primary1 text-white w-[90%] md:w-[60%] lg:w-[50%] h-[15rem] md:h-[23rem] rounded-t-[10px] shadow-2xl">
        <DeleteCourseForm
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancel}
          courseName={courseData.titulo}
        />
      </div>
    </div>
  );
};