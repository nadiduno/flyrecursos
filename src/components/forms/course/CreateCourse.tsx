import React, { useEffect, useState } from "react";
import { post, get } from "../../../services/api";
import { FormDataCourse } from "../../../types/typeFormData";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";
import { toastCustomSuccess, toastCustomError } from "../../ToastCustom";
import { useAuth } from "../../../context/AuthContext";
import { CreateCourseForm } from "./CreateCourseForm";

interface Modulo {
  id: number;
  titulo: string;
}

interface CreateCourseProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCourseCreated?: () => void;
}

export const CreateCourse: React.FC<CreateCourseProps> = ({
  isVisible: propIsVisible,
  setIsVisible,
  onCourseCreated,
}) => {
  const { userId } = useAuth();
  const [modulosDisponiveis, setModulosDisponiveis] = useState<Modulo[]>([]);
  const [loadingModulos, setLoadingModulos] = useState(true);
  const [errorModulos, setErrorModulos] = useState<string | null>(null);
  const [refreshModulosTrigger, setRefreshModulosTrigger] = useState(0);

  const [currentSelectedModuleIds, setCurrentSelectedModuleIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        setLoadingModulos(true);
        setErrorModulos(null); // Limpa erros anteriores
        const response = await get<Modulo[]>("/api/modulos");
        setModulosDisponiveis(response.data || []);
      } catch (err) {
        console.error("Erro ao carregar módulos:", err);
        setErrorModulos("Não foi possível carregar os módulos.");
      } finally {
        setLoadingModulos(false);
      }
    };

    if (propIsVisible) {
      fetchModulos();
    } else {
      setCurrentSelectedModuleIds([]);
      // Resetar também os módulos disponíveis e estados de carregamento/erro ao fechar
      setModulosDisponiveis([]);
      setLoadingModulos(true); // Preparar para o próximo carregamento
      setErrorModulos(null);
    }
  }, [propIsVisible, refreshModulosTrigger]);

  const handleEscape = (event: KeyboardEvent): void => {
    if (event.key === "Escape") setIsVisible(false);
  };

  const onSubmit = async (formData: FormDataCourse) => {
    try {
      if (!userId) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }

      const autorId = parseInt(userId);
      if (isNaN(autorId)) {
        throw new Error("ID do usuário inválido");
      }

      // --- Passo 1: Criar o curso SEM módulos no payload inicial ---
      const createCoursePayload = {
        titulo: formData.titulo,
        // autorId: autorId,
      };

      // console.log("Payload para criar curso (Passo 1):", createCoursePayload);
      const createCourseResponse = await post<{ id: number }>(
        "/api/cursos",
        createCoursePayload
      );
      const newCourseId = createCourseResponse.data.id;

      if (!newCourseId) {
        throw new Error("ID do curso recém-criado não retornado pela API.");
      }
      // --- Passo 2: Associar módulos, SE houver módulos selecionados ---
      if (formData.modulosIds && formData.modulosIds.length > 0) {
        // console.log("Módulos selecionados para associação:", formData.modulosIds );
        for (const moduloId of formData.modulosIds) {
          // console.log(`Associando módulo ${moduloId} ao curso ${newCourseId}`);
          await post(`/api/cursos/${newCourseId}/modulos/${moduloId}`, {});
        }
        toastCustomSuccess("Curso", formData.titulo, "Criado com sucesso!");
      } else {
        toastCustomSuccess(
          "Curso",
          formData.titulo,
          "Criado com sucesso! (sem módulos)"
        );
      }

      // console.log("Operação de criação de curso concluída com sucesso.");

      setCurrentSelectedModuleIds([]);

      setTimeout(() => {
        setIsVisible(false);
        onCourseCreated?.();
      }, 1500);
    } catch (error) {
      console.error("Erro na criação do curso:", error);

      let errorMessage = "Erro desconhecido ao criar curso.";
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || formatarMensagemErro(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toastCustomError("Curso", formData.titulo, errorMessage);
    }
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

  // Função para passar para o CreateCourseForm
  const handleRefreshModulos = () => {
    setRefreshModulosTrigger((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-[#FFFFFFB2] z-50">
      <div className="mt-[1.5rem] md:mt-[0.25rem] font-bold bg-primary1 text-white w-[90%] md:w-[70%] h-[33.5rem] md:h-[38rem] rounded-t-[10px] shadow-2xl">
        <CreateCourseForm
          onSubmit={onSubmit}
          setIsVisible={setIsVisible}
          modulosDisponiveis={modulosDisponiveis}
          onModulosRefetch={handleRefreshModulos}
          selectedModuleIds={currentSelectedModuleIds}
          setSelectedModuleIds={setCurrentSelectedModuleIds}
          loadingModulos={loadingModulos}
          errorModulos={errorModulos}
        />
      </div>
    </div>
  );
};
