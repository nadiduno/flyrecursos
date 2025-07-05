import React, { useEffect } from "react";
import { del } from "../../services/api";
import { TableRowDataModule } from "./Module";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { AxiosError } from "axios";
import { DeleteModuleForm } from "./DeleteModuleForm";

import { toastCustomSuccess, toastCustomError } from "../ToastCustom";

interface DeleteModuleProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  moduleData: TableRowDataModule | null;
  onDeleteSuccess: () => void;
}

export const DeleteModule: React.FC<DeleteModuleProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  moduleData,
  onDeleteSuccess,
}) => {
  const handleDeleteConfirm = async () => {
    if (!moduleData?.id) {
      toastCustomError("Módulo", "ID do módulo não encontrado para exclusão.");
      setIsVisible(false);
      return;
    }

    try {
      console.log(
        "Enviando requisição DELETE para: /api/modulos/" + moduleData.id
      );
      await del(`/api/modulos/${moduleData.id}`);

      const moduleTitle = moduleData.titulo || "Módulo";
      toastCustomSuccess("Módulo", moduleTitle, "Excluído com sucesso!");

      setTimeout(() => {
        onDeleteSuccess();
        setIsVisible(false);
      }, 500);
    } catch (error) {
      console.error("Erro na exclusão do módulo:", error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
        const moduleTitle = moduleData.titulo || "Módulo";
        toastCustomError("Módulo", moduleTitle, errorMessage);
      } else {
        const errorMessage = formatarMensagemErro(error);
        const moduleTitle = moduleData.titulo || "Módulo";
        toastCustomError("Módulo", moduleTitle, errorMessage);
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

  if (!propIsVisible || !moduleData) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[3.25rem] md:mt-[8rem] font-bold bg-primary1 text-white w-[90%] md:w-[60%] lg:w-[50%] h-[15rem] md:h-[23rem] rounded-t-[10px] shadow-2xl">
        <DeleteModuleForm
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancel}
          moduleTitle={moduleData.titulo}
        />
      </div>
    </div>
  );
};
