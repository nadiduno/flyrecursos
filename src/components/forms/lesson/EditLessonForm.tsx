import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataLesson } from "../../../types/typeFormData";
import { get } from "../../../services/api";
// import { PatternFormat } from "react-number-format";

interface ModuloOption {
  id: number;
  titulo: string;
}

const FormDataSchema = z.object({
  // Validação com zod
  titulo: z
    .string()
    .nonempty("O título da aula é obrigatório.")
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  tipo: z.enum(["VIDEO", "ARTIGO", "PDF"], {
    errorMap: () => ({ message: "Selecione um tipo de aula válido." }),
  }),
  duracaoEstimada: z
    .number()
    .int()
    .min(1, "A duração estimada deve ser um número inteiro positivo.")
    .max(9999, "A duração máxima é 9999 minutos."),
  linkConteudo: z
    .string()
    .nonempty("O link do conteúdo é obrigatório.")
    .url("O link do conteúdo deve ser uma URL válida."),
  moduloId: z
    .number({
      required_error: "Selecione ou crie um módulo para a aula",
      invalid_type_error: "Selecione um módulo válido",
    })
    .int()
    .positive("Selecione um módulo válido"),
});
type FormData = z.infer<typeof FormDataSchema> & {
  id?: number;
};

interface EditLessonFormProps {
  onSubmit: SubmitHandler<FormData>;
  setMessage: (msg: string | null) => void;
  setCreationError: (msg: string | null) => void;
  message: string | null;
  creationError: string | null;
  defaultData?: FormDataLesson;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditLessonForm: React.FC<EditLessonFormProps> = ({
  onSubmit,
  setMessage,
  setCreationError,
  defaultData,
  setIsVisible,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      titulo: "",
      tipo: "VIDEO",
      duracaoEstimada: 0,
      linkConteudo: "",
      moduloId: undefined,
      ...(defaultData
        ? {
            titulo: defaultData.titulo,
            tipo: defaultData.tipo as "VIDEO" | "ARTIGO" | "PDF", // Cast explícito
            duracaoEstimada: defaultData.duracaoEstimada,
            linkConteudo: defaultData.linkConteudo,
            moduloId: defaultData.moduloId,
            id: defaultData.id,
          }
        : {}),
    },
  });

  const [modulosDisponiveis, setModulosDisponiveis] = useState<ModuloOption[]>(
    []
  );
  const [loadingModulos, setLoadingModulos] = useState(true);
  const [errorModulos, setErrorModulos] = useState<string | null>(null);
  const initialModuleId =
    defaultData?.moduloId !== undefined ? defaultData.moduloId : null;
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(
    initialModuleId
  );

  // Inicializa os valores do formulário
  useEffect(() => {
    if (defaultData) {
      reset({
        titulo: defaultData.titulo,
        tipo: defaultData.tipo as "VIDEO" | "ARTIGO" | "PDF",
        duracaoEstimada: defaultData.duracaoEstimada,
        linkConteudo: defaultData.linkConteudo,
        moduloId: defaultData.moduloId, // Garantido que é number
        id: defaultData.id,
      });
      // Garante que só passa number ou null
      setSelectedModuleId(
        defaultData.moduloId !== undefined ? defaultData.moduloId : null
      );
    }
  }, [defaultData, reset]);

  // Busca os módulos disponíveis
  useEffect(() => {
    const fetchModulos = async () => {
      try {
        setLoadingModulos(true);
        const response = await get<{ content: ModuloOption[] }>("/api/modulos");
        setModulosDisponiveis(response.data.content || []);
      } catch (err) {
        setErrorModulos("Não foi possível carregar os módulos");
      } finally {
        setLoadingModulos(false);
      }
    };
    fetchModulos();
  }, []);

  // Sincroniza o selectedModuleId com o formulário
  useEffect(() => {
    if (selectedModuleId !== null) {
      setValue("moduloId", selectedModuleId, { shouldValidate: true });
    }
  }, [selectedModuleId, setValue]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
      }}
      onChange={() => {
        setMessage(null);
        setCreationError(null);
      }}
    >
      <div className="flex flex-col justify-center items-center gap-0 md:gap-1">
        <p className="my-[1rem] md:mt-[1rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold mb-0">
          EDITAR AULA{" "}
        </p>
        <div className="w-full grid md:grid-cols-2 min-h-[20rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-star content-start">
          {/* Título da Aula */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m p-b-[0.125rem] md:py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
              Título da Aula
            </label>
            <input
              {...register("titulo")}
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
              placeholder:text-secondary md:text-lg"
              type="text"
              placeholder="Digite o título da aula"
            />
            {errors.titulo && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.titulo.message}
              </p>
            )}
          </div>

          {/* Tipo de Aula */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
              Tipo de Aula
            </label>
            <select
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                        placeholder:text-secondary md:text-lg"
              {...register("tipo")}
            >
              <option value="VIDEO">Vídeo</option>
              <option value="ARTIGO">Artigo</option>
              <option value="PDF">PDF</option>
            </select>
            {errors.tipo && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.tipo.message}
              </p>
            )}
          </div>

          {/* Link do Conteúdo */}
          <div className="w-full flex flex-col md:col-span-2">
            <label className="w-full md:text-m py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
              Link do Conteúdo
            </label>
            <input
              {...register("linkConteudo")}
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                        placeholder:text-secondary md:text-lg"
              type="url"
              placeholder="Ex: https://youtube.com/aula1"
            />
            {errors.linkConteudo?.message && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1">
                {errors.linkConteudo.message}
              </p>
            )}
          </div>

          {/* Duração Estimada */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
              Duração Estimada (min)
            </label>
            <input
              {...register("duracaoEstimada", { valueAsNumber: true })}
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                        placeholder:text-secondary md:text-lg"
              type="number"
              placeholder="Duração em minutos"
            />
            {errors.duracaoEstimada?.message && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1">
                {errors.duracaoEstimada.message}
              </p>
            )}
          </div>

          {/* Seleção de Módulo */}
          <div className="w-full flex flex-col md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-3/4 gap-0">
                <label className="w-full md:text-m py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
                  Módulo da Aula
                </label>

                {loadingModulos ? (
                  <p className="text-gray-300">Carregando módulos...</p>
                ) : errorModulos ? (
                  <p className="text-red-500">{errorModulos}</p>
                ) : (
                  <select
                    className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
                    {...register("moduloId", { valueAsNumber: true })}
                    value={selectedModuleId ?? ""}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number(e.target.value)
                        : null;
                      setSelectedModuleId(value);
                      if (value !== null) {
                        setValue("moduloId", value, { shouldValidate: true });
                      }
                    }}
                  >
                    <option value="" disabled>
                      Selecione um módulo
                    </option>
                    {modulosDisponiveis.map((modulo) => (
                      <option key={modulo.id} value={modulo.id}>
                        {modulo.titulo}
                      </option>
                    ))}
                  </select>
                )}
                {errors.moduloId?.message && (
                  <p className="text-red-500 text-xs md:text-[1rem] mt-1">
                    {errors.moduloId.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem]  rounded-[50px]  border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]  hover:bg-secondary2 hover:text-black transition-colors duration-200"
            type="button"
            onClick={() => setIsVisible(false)}
          >
            {" "}
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
              Canelar
            </p>
          </button>
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem]  rounded-[50px] bg-primary2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary4 hover:text-black transition-colors duration-200"
            type="submit"
          >
            {" "}
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
              Editar
            </p>
          </button>
        </div>
      </div>
    </form>
  );
};
