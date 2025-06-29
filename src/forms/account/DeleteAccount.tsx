import React, { useEffect } from "react";
import { del } from "../../services/api";
import { TableRowData } from "../../forms/account/Account"; // Ajuste o caminho se necessário
import { DeleteAccountForm } from "./DeleteAccountForm";
import toast from "react-hot-toast";

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
      toast.error("ID do aluno não encontrado para exclusão.");
      setIsVisible(false);
      return;
    }

    try {
      // Chama a API de exclusão
      await del(`/alunos/${studentData.id}`);
      
      // Notifica o sucesso
      toast.success(`Usuário ${studentData.nome} eliminado com sucesso!`);
      
      // Fecha o modal e atualiza a lista de alunos
      setTimeout(() => {
        onDeleteSuccess();
        setIsVisible(false);
      }, 500);
      
    } catch (error) {
      // Em caso de erro, notifica o usuário
      toast.error("Erro ao eliminar o usuário. Por favor, tente novamente.");
      console.error("Erro ao eliminar Usuário:", error);
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