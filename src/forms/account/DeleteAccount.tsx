import React, { useEffect } from "react";
import { del } from "../../services/api";
import { TableRowData } from "../../forms/account/Account";
import { DeleteAccountForm } from "./DeleteAccountForm";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { AxiosError } from "axios";

import {
  toastCustomEditSuccess,
  toastCustomEditError,
} from "../../componets/ToastCustom";

interface DeleteAccountProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  studentData: TableRowData | null;
  onDeleteSuccess: () => void;
}

export const DeleteAccount: React.FC<DeleteAccountProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  studentData,
  onDeleteSuccess,
}) => {
  const handleDeleteConfirm = async () => {
    if (!studentData?.id) {
      toastCustomEditError("Erro", "ID do Usuário não encontrado para exclusão.");
      setIsVisible(false);
      return;
    }

    try {
      await del(`/alunos/${studentData.id}`);
      const nome = studentData.nome || "Usuário";
      toastCustomEditSuccess(nome, "Foi eliminado com sucesso!");

      setTimeout(() => {
        onDeleteSuccess();
        setIsVisible(false);
      }, 500);

    } catch (error) {
      // Tratamento de erro mais robusto com AxiosError
      if (error instanceof AxiosError) {
        console.error("Detalhes do erro da API (exclusão):", error.response?.data);
        const errorMessage = error.response?.data?.message || formatarMensagemErro(error);
        const nome = studentData.nome || "Usuário";
        toastCustomEditError(nome, errorMessage);
      } else {
        const errorMessage = formatarMensagemErro(error);
        const nome = studentData.nome || "Usuário";
        toastCustomEditError(nome, errorMessage);
      }
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  // Efeito para fechar o modal com a tecla 'Escape'
  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!propIsVisible || !studentData) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[3.25rem] md:mt-[8rem] font-bold bg-primary1 text-white w-[90%] md:w-[60%] lg:w-[50%] h-[15rem] md:h-[23rem] rounded-t-[10px] shadow-2xl">
        <DeleteAccountForm
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancel}
          studentName={studentData.nome}
        />
      </div>
    </div>
  );
};
