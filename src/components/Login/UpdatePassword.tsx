import React, { useEffect, useState } from "react"; 
import { UpdatePasswordForm } from "../Login/UpdatePasswordForm";

interface UpdatePasswordProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
}) => {
  
  const formRef = React.useRef<{ submitForm: () => void; getIsSubmitting: () => boolean }>(null); // Adicionado getIsSubmitting
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de carregamento local

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  const handleBackButton = (): void => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (propIsVisible) {
      window.addEventListener("keydown", handleEscape);
      window.addEventListener("popstate", handleBackButton);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [propIsVisible]);

  if (!propIsVisible) return null;

  const handlePasswordUpdateSuccess = () => {
    setIsVisible(false);
  };

  // Função submissão
  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[3.25rem] md:mt-[8rem] font-bold bg-primary1 text-white w-[90%] md:w-[60%] lg:w-[50%] h-[30rem] md:h-[40rem] rounded-t-[10px] shadow-2xl overflow-auto flex flex-col">
        <div className="flex-grow">
          <UpdatePasswordForm
            ref={formRef}
            onSuccess={handlePasswordUpdateSuccess}
            onSubmittingChange={setIsSubmitting} // Passa a função para atualizar o estado de isSubmitting
          />
        </div>
        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary2 hover:text-black transition-colors duration-200"
            type="button"
            onClick={() => setIsVisible(false)} 
            disabled={isSubmitting} // Desabilita se estiver submetendo
          >
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
              Cancelar
            </p>
          </button>
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] bg-primary2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary4 hover:text-black transition-colors duration-200"
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitting} // Desabilita se estiver submetendo
          >
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
              {isSubmitting ? "Atualizando..." : "Atualizar Senha"} 
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};