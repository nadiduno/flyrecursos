// src/components/modals/course/EditCourse.tsx
import React, { useState, useEffect } from "react";
import { put, get, post, del } from "../../../services/api"; // Importar 'del'
import { FormDataCourse } from "../../../types/typeFormData";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";
import { toastCustomSuccess, toastCustomError } from "../../ToastCustom";
import { useAuth } from "../../../context/AuthContext"; // Se precisar do autorId
import { EditCourseForm } from "../../forms/course/EditCourseForm"; // Caminho correto

interface Modulo {
  id: number;
  titulo: string;
}

interface EditCourseProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  courseData: FormDataCourse | null; // Dados do curso a ser editado
  onEditSuccess: () => void;
}

export const EditCourse: React.FC<EditCourseProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  courseData,
  onEditSuccess,
}) => {
  const { userId } = useAuth(); // Obter userId do contexto de autenticação
  const [modulosDisponiveis, setModulosDisponiveis] = useState<Modulo[]>([]);
  const [loadingModulos, setLoadingModulos] = useState(true);
  const [errorModulos, setErrorModulos] = useState<string | null>(null);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        setLoadingModulos(true);
        const response = await get<{ content: Modulo[] }>("/api/modulos");
        setModulosDisponiveis(response.data.content || []);
      } catch (err) {
        console.error("Erro ao carregar módulos:", err);
        setErrorModulos("Não foi possível carregar os módulos.");
      } finally {
        setLoadingModulos(false);
      }
    };

    if (propIsVisible) {
      fetchModulos();
    }
  }, [propIsVisible]); // Recarregar módulos quando o modal se torna visível

  const onSubmit = async (formData: FormDataCourse) => {
    if (!courseData?.id) {
      toastCustomError(
        "Edição de Curso",
        "ID do curso não encontrado para edição."
      );
      return;
    }

    if (!userId) {
      toastCustomError(
        "Edição de Curso",
        "Usuário não autenticado. Faça login novamente."
      );
      return;
    }

    const autorId = parseInt(userId);
    if (isNaN(autorId)) {
      toastCustomError("Edição de Curso", "ID do usuário inválido.");
      return;
    }

    const cursoId = courseData.id;
    const currentModulesIds = courseData.modulosIds || [];
    const newModulesIds = formData.modulosIds || [];

    try {
      // 1. Atualizar o título do curso (PUT /api/cursos/{id})
      const updatePayload = {
        titulo: formData.titulo,
        autorId: autorId, // Enviar o autorId na atualização se a API exigir
      };
      // console.log(`Enviando PUT para /api/cursos/${cursoId} com payload:`, updatePayload);
      await put(`/api/cursos/${cursoId}`, updatePayload);

      // 2. Sincronizar módulos (associar novos, desassociar removidos)
      const modulesToAdd = newModulesIds.filter(
        (id) => !currentModulesIds.includes(id)
      );
      const modulesToRemove = currentModulesIds.filter(
        (id) => !newModulesIds.includes(id)
      );

      // Desassociar módulos
      for (const moduloId of modulesToRemove) {
        // console.log(`Deletando associação: /api/cursos/${cursoId}/modulos/${moduloId}`);
        await del(`/api/cursos/${cursoId}/modulos/${moduloId}`);
      }

      // Associar novos módulos
      for (const moduloId of modulesToAdd) {
        // console.log(`Criando associação: /api/cursos/${cursoId}/modulos/${moduloId}`);
        await post(`/api/cursos/${cursoId}/modulos/${moduloId}`, {}); // Payload vazio ou nulo
      }

      toastCustomSuccess("Curso", formData.titulo, "Editado com sucesso!");

      setTimeout(() => {
        setIsVisible(false);
        onEditSuccess(); // Callback para atualizar a lista de cursos na interface
      }, 1500);
    } catch (error) {
      console.error("Erro na edição do curso:", error);
      let errorMessage = "Erro desconhecido ao editar curso.";

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toastCustomError("Curso", formData.titulo, errorMessage);
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

  if (loadingModulos) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFFFB2] z-50">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorModulos) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFFFB2] z-50">
        <div className="text-red-500 text-xl font-bold">{errorModulos}</div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 px-4 py-2 bg-primary2 text-white rounded"
        >
          Fechar
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[0.25rem] font-bold bg-primary1 text-white w-[90%] md:w-[70%] h-screen rounded-t-[10px] shadow-2xl">
        <EditCourseForm
          onSubmit={onSubmit}
          setIsVisible={setIsVisible}
          defaultData={courseData || undefined} // Passa os dados do curso
          modulosDisponiveis={modulosDisponiveis} // Passa os módulos carregados
        />
      </div>
    </div>
  );
};
