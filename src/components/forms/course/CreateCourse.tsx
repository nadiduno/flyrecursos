import React, { useState, useEffect } from "react";
import { post } from "../../../services/api";
import { CreateCourseForm } from "./CreateCourseForm";

interface CourseCreateProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Asegúrate de que este type coincida con lo que espera tu backend:
type FormData = {
  titulo: string;
  descripcao: string;
  modulosID: string[];
  autorID: string;
};

export const CreateCourse: React.FC<CourseCreateProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);

  const onSubmit = async (formData: FormData) => {
    try {
      await post("/cursos", formData); // Cambia esta ruta si es diferente
      setMessage("Curso criado com sucesso!");
      setCreationError(null);
    } catch (error) {
      console.error(error);
      setCreationError(
        error instanceof Error ? error.message : "Erro ao criar curso"
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFFFB2] z-50">
      <div className="text-xl mt-[360px] font-bold bg-[#004054] text-white w-[942px] h-[549px] rounded-[10px] mb-[400px]">
        <h2 className="mt-[50px] mb-[49px] w-[236px] h-[35px] text-xl md:text-3xl lg:text-3xl mx-auto text-center font-bold font-roboto">
          CRIAR CURSO
        </h2>

        <div className="px-10">
          <CreateCourseForm
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
