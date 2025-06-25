import React, { useState, useEffect } from "react";
import { EditAccountForm } from "./EditAccountForm";
import { put } from "../../services/api";
import { FormData } from "../../types/typeFormData";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import toast from 'react-hot-toast';

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
        setCreationError("ID do aluno não encontrado para edição.");
        toast.error("ID do aluno não encontrado para edição.");
        console.error("Erro: ID do aluno não encontrado para edição.");
        return;
    }
    
    const dataToUpdate = { ...formData, id: studentData.id };

    try {
      // console.log("Enviando requisição PUT para /alunos com o payload:", dataToUpdate);
      await put("/alunos", dataToUpdate);
      setMessage("Usuário editado com sucesso!");
      setCreationError(null);
      toast.success("Usuário editado com sucesso!");
      onEditSuccess();

    } catch (error) {
      console.error("Erro na edição:", error);
      const errorMessage = formatarMensagemErro(error);
      setCreationError(errorMessage);
      setMessage(null);
      toast.error(errorMessage);
      console.error("Mensagem de erro formatada:", errorMessage);
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
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFFFB2] z-50">
      <div className="text-xl mt-[360px] font-bold bg-[#004054] text-white w-[942px] h-[549px] rounded-[10px] mb-[400px]">
        <p className="mt-[50px] mb-[49px] w-[300px] h-[50px] text-xl md:text-3xl lg:text-3xl mx-auto text-center font-bold font-roboto">
          EDITAR CONTA{" "}
          {creationError && (
            <p className="text-red-500 mt-3 text-center text-xl">
              {creationError}
            </p>
          )}
          {message && (
            <p className="text-green-500 mt-3 text-center sm:text-xl md:text-xl">
              {message}
            </p>
          )}
        </p>

        <div className="px-10">
          <EditAccountForm
            onSubmit={onSubmit}
            setMessage={setMessage}
            setCreationError={setCreationError}
            message={message}
            creationError={creationError}
            defaultData={studentData || undefined}
          />
        </div>
      </div>
    </div>
  );
};