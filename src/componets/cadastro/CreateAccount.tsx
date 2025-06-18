import React, { useState, useEffect } from "react";
import AccountForm from "./AccountForm";
import { post } from "../../services/api"; // ⚠️ Asegúrate de ajustar el path si es distinto

type FormData = {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  perfil: string;
  perfilAluno: string;
  senha: string;
  senha2?: string;
};

interface CreateAccountProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };
    delete data.senha2;

    try {
      await post("/alunos", data);
      setMessage("Usuário criado com sucesso!");
      setCreationError(null);
    } catch (error) {
      console.error(error);
      setCreationError(
        error instanceof Error ? error.message : "Erro ao criar usuário"
      );
      setMessage(null);
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
        <p className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-xl md:text-3xl lg:text-3xl mx-auto text-center font-bold font-roboto">
          CRIAR CONTA
        </p>

        <div className="px-10">
          <AccountForm
            onSubmit={onSubmit}
            setMessage={setMessage}
            setCreationError={setCreationError}
            message={message}
            creationError={creationError}
          />
        </div>
      </div>
    </div>
  );
};
