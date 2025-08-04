import React, { useState, useEffect } from "react";
import { put, get, post, del } from "../../../services/api"; // Importar 'del'
import { FormDataCourse } from "../../../types/typeFormData";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";
import { toastCustomSuccess, toastCustomError } from "../../ToastCustom";
import { useAuth } from "../../../context/AuthContext"; // Se precisar do autorId
import { EditCourseForm } from "./EditCourseForm";
import { CursoInfo, Modulos } from "../../../types/interface";

interface EditCourseProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  courseData: CursoInfo | null; // Dados do curso a ser editado
  onEditSuccess: () => void;
}

export const EditCourse: React.FC<EditCourseProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  courseData,
  onEditSuccess,
}) => {
  const { userId } = useAuth(); 
  const [modulosDisponiveis, setModulosDisponiveis] = useState<Modulos[]>([]);
  const [loadingModulos, setLoadingModulos] = useState(true);
  const [errorModulos, setErrorModulos] = useState<string | null>(null);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);

  const fetchModulos = async () => {
    try {
      setLoadingModulos(true);
      const response = await get<Modulos[]>("/api/modulos");
      setModulosDisponiveis(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar módulos:", err);
      setErrorModulos("Não foi possível carregar os módulos.");
    } finally {
      setLoadingModulos(false);
    }
  };

  useEffect(() => {
    if (propIsVisible) {
      fetchModulos();
      if (courseData) {
        // Converter para string 
        const ids = courseData.modulos.map((m) => m.id.toString());
        console.log("Definindo módulos selecionados:", ids);
        setSelectedModuleIds(ids);
      }
    }
  }, [propIsVisible, courseData]);

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

    try {
      // 1. Atualizar informações básicas do curso
      const dataInicioISO = new Date(formData.dataInicio)
        .toISOString()
        .split("T")[0];
      const dataConclusaoISO = new Date(formData.dataConclusao)
        .toISOString()
        .split("T")[0];
      const updatePayload = {
        titulo: formData.titulo,
        autorId: autorId,
        dataInicio: dataInicioISO,
        dataConclusao: dataConclusaoISO,
      };

      console.log("Payload sendo enviado:", updatePayload);

      const response = await put(`/api/cursos/${cursoId}`, updatePayload);
      console.log("Resposta do backend:", response.data);

      // 2. Sincronizar módulos 
      const currentModulesIds = courseData.modulos.map((m) => m.id) || [];
      const newModulesIds = formData.modulosIds || [];

      const modulesToAdd = newModulesIds.filter(
        (id) => !currentModulesIds.includes(id)
      );
      const modulesToRemove = currentModulesIds.filter(
        (id) => !newModulesIds.includes(id)
      );

      // Desassociar módulos
      for (const moduloId of modulesToRemove) {
        await del(`/api/cursos/${cursoId}/modulos/${moduloId}`);
      }

      // Associar novos módulos
      for (const moduloId of modulesToAdd) {
        await post(`/api/cursos/${cursoId}/modulos/${moduloId}`, {});
      }

      toastCustomSuccess("Curso", formData.titulo, "Editado com sucesso!");

      setTimeout(() => {
        setIsVisible(false);
        onEditSuccess();
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
      <div className="mt-[1.5rem] md:mt-[0.25rem] font-bold bg-primary1 text-white w-[90%] md:w-[85%] h-[33.5rem] md:h-[38rem] rounded-t-[10px] shadow-2xl">
        <EditCourseForm
          onSubmit={onSubmit}
          setIsVisible={setIsVisible}
          defaultData={courseData || undefined} 
          modulosDisponiveis={modulosDisponiveis}
          onModulosRefetch={fetchModulos} 
          selectedModuleIds={selectedModuleIds}
          setSelectedModuleIds={setSelectedModuleIds}
          loadingModulos={loadingModulos}
          errorModulos={errorModulos}
        />
      </div>
    </div>
  );
};
