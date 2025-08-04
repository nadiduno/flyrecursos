import React, { useEffect, useState, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataCourse } from "../../../types/typeFormData";
import { Checkbox, CheckboxGroup } from "react-aria-components";
import { get } from "../../../services/api";
import { MdAccessTimeFilled } from "react-icons/md";
import { Aula, CursoInfo } from "../../../types/interface";

interface ModuloOption {
  id: number;
  titulo: string;
  aulas?: Aula[];
}

interface ModuloDetails {
  totalAulas: number;
  totalDuracao: number;
}

const FormDataSchema = z
  .object({
    titulo: z
      .string()
      .nonempty("O título do curso é obrigatório.")
      .min(3, "O título deve ter no mínimo 3 caracteres.")
      .max(100, "O título deve ter no máximo 100 caracteres."),
    modulosIds: z.array(z.string()).optional(),
    dataInicio: z.string().nonempty("A data de início é obrigatória."),
    dataConclusao: z.string().nonempty("A data de conclusão é obrigatória."),
  })
  .refine(
    (data) => new Date(data.dataInicio) >= new Date(new Date().toDateString()),
    {
      message: "A data de início não pode ser anterior à data atual.",
      path: ["dataInicio"],
    }
  )
  .refine((data) => new Date(data.dataConclusao) > new Date(data.dataInicio), {
    message: "A data de conclusão deve ser posterior à data de início.",
    path: ["dataConclusao"],
  });

export type FormData = z.infer<typeof FormDataSchema>;

interface CourseFormProps {
  onSubmit: SubmitHandler<FormDataCourse>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modulosDisponiveis: ModuloOption[];
  onModulosRefetch: () => void;
  selectedModuleIds: string[];
  setSelectedModuleIds: React.Dispatch<React.SetStateAction<string[]>>;
  loadingModulos: boolean;
  errorModulos: string | null;
  defaultData?: CursoInfo;
}

export const EditCourseForm: React.FC<CourseFormProps> = ({
  onSubmit,
  setIsVisible,
  modulosDisponiveis,
  // onModulosRefetch,
  selectedModuleIds,
  setSelectedModuleIds,
  loadingModulos,
  errorModulos,
  defaultData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      titulo: defaultData?.titulo || "",
      modulosIds: defaultData?.modulos.map((m) => m.id.toString()) || [],
      dataInicio: defaultData?.dataInicio || "",
      dataConclusao: defaultData?.dataConclusao || "",
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredModulos, setFilteredModulos] =
    useState<ModuloOption[]>(modulosDisponiveis);

  const [allLessons, setAllLessons] = useState<Aula[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [errorLessons, setErrorLessons] = useState<string | null>(null);
  const [moduloAggregatedDetails, setModuloAggregatedDetails] = useState<
    Record<number, ModuloDetails>
  >({});

  useEffect(() => {
    console.log("Módulos disponíveis:", modulosDisponiveis);
    console.log("Módulos filtrados:", filteredModulos);
    console.log("IDs selecionados:", selectedModuleIds);
  }, [modulosDisponiveis, filteredModulos, selectedModuleIds]);

  // Buscar modulos
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredModulos(modulosDisponiveis);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = modulosDisponiveis.filter((modulo) =>
        modulo.titulo.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredModulos(results);
    }
  }, [searchTerm, modulosDisponiveis]);

  useEffect(() => {
    setValue("modulosIds", selectedModuleIds, { shouldValidate: true });
  }, [selectedModuleIds, setValue]);

  useEffect(() => {
    setSelectedModuleIds((prevSelected) => {
      const validSelected = prevSelected.filter((idString) =>
        modulosDisponiveis.some((mod) => mod.id === parseInt(idString))
      );
      return validSelected;
    });
  }, [modulosDisponiveis, setSelectedModuleIds]);

  const handleSelectedModulesChange = (newSelection: string[]) => {
    setSelectedModuleIds(newSelection);
  };

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    const modulosIdsAsNumbers =
      data.modulosIds?.map((idString) => parseInt(idString)) || [];

    // Capturar a data atual para 'dataPublicacao'
    const dataPublicacao = new Date().toISOString().split("T")[0];
    const duracaoFormatada = formatDuration(totalSelectedDuracao);

    onSubmit({
      titulo: data.titulo,
      modulosIds: modulosIdsAsNumbers,
      dataPublicacao: dataPublicacao,
      dataInicio: data.dataInicio,
      dataConclusao: data.dataConclusao,
      totalAulas: totalSelectedAulas,
      totalHoras: totalSelectedDuracao,
      duracaoFormatada: duracaoFormatada,
    });
  };

  const fetchAllLessons = async () => {
    try {
      setLoadingLessons(true);
      setErrorLessons(null);
      const response = await get<Aula[]>("/api/aulas");
      const fetchedLessons = response.data || [];
      setAllLessons(fetchedLessons);
    } catch (err) {
      setErrorLessons("Não foi possível carregar as informações das aulas.");
      setAllLessons([]);
    } finally {
      setLoadingLessons(false);
    }
  };

  useEffect(() => {
    fetchAllLessons();
  }, []);

  useEffect(() => {
    const details: Record<number, ModuloDetails> = {};
    modulosDisponiveis.forEach((modulo) => {
      const lessonsInModule = allLessons.filter(
        (lesson) => lesson.moduloId === modulo.id
      );
      const totalAulas = lessonsInModule.length;
      const totalDuracao = lessonsInModule.reduce(
        (sum, lesson) => sum + (lesson.duracaoEstimada || 0),
        0
      );
      details[modulo.id] = { totalAulas, totalDuracao };
    });
    setModuloAggregatedDetails(details);
  }, [modulosDisponiveis, allLessons]);

  const { totalSelectedAulas, totalSelectedDuracao } = useMemo(() => {
    let totalAulas = 0;
    let totalDuracao = 0;

    selectedModuleIds.forEach((moduleIdString) => {
      const moduleId = parseInt(moduleIdString);
      const details = moduloAggregatedDetails[moduleId];
      if (details) {
        totalAulas += details.totalAulas;
        totalDuracao += details.totalDuracao;
      }
    });

    return {
      totalSelectedAulas: totalAulas,
      totalSelectedDuracao: totalDuracao,
    };
  }, [selectedModuleIds, moduloAggregatedDetails]);

  // Função para formatar a duração em horas e minutos
  const formatDuration = (totalMinutes: number): string => {
    if (totalMinutes < 0) return "Duração inválida";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let parts = [];
    if (hours > 0) {
      parts.push(`${hours} hora${hours !== 1 ? "s" : ""}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} minuto${minutes !== 1 ? "s" : ""}`);
    }

    if (parts.length === 0) {
      return "0 minutos";
    }

    return parts.join(" e ");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col justify-center items-center gap-0 ">
        <p className="my-[1rem] md:mt-[1rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold mb-0">
          EDITAR CURSO
        </p>
        <div className="w-[95%] grid gap-2 md:gap-6 pb-2 items-star content-start">
          <div className="w-full flex flex-col md:flex-col">
            <label
              htmlFor="titulo"
              className="w-full md:text-m p-b-[0.125rem] md:py-[0.125rem] md:pt-[1rem] text-left md:text-lg"
            >
              Título do Curso
            </label>
            <input
              id="titulo"
              {...register("titulo")}
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]
              placeholder:text-secondary md:text-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              type="text"
              placeholder="Digite o título do curso"
            />
            {errors.titulo && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.titulo.message}
              </p>
            )}
          </div>

          {/* Modulos */}
          <div className="flex items-center justify-between gap-8">
            <div>
              <label className="w-full md:text-m p-b-[0.125rem] text-left lg:text-lg md:pr-1">
                Selecione os módulos para o curso
              </label>
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Digite o nome do módulo para consultar"
                className="w-[14rem] h-[1.5rem] md:w-[22rem] md:h-[2.5rem] rounded-[4rem] rounded-br-none border border-gray-300 bg-white p-3 text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* SEÇÃO DE SELEÇÃO DE MÓDULOS */}
        <div className="w-[95%] h-[6.5rem] rounded-lg border border-primary2 overflow-auto p-2 mb-1 relative">
          {loadingModulos ? (
            <div className="absolute inset-0 flex items-center justify-center bg-primary1/80 z-10">
              <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : errorModulos ? (
            <p className="text-red-500 text-sm mt-2 text-center absolute inset-0 flex items-center justify-center bg-primary1/80 z-10">
              {errorModulos}
            </p>
          ) : modulosDisponiveis.length === 0 ? (
            <p className="text-red-500 text-sm mt-2 text-center">
              Nenhum módulo disponível. Por favor, crie um módulo primeiro.
            </p>
          ) : filteredModulos.length === 0 ? (
            <p className="text-yellow text-sm mt-2 text-center">
              Nenhum módulo encontrado para "{searchTerm}".
            </p>
          ) : (
            <CheckboxGroup
              value={selectedModuleIds}
              onChange={handleSelectedModulesChange}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredModulos.map((modulo) => (
                  <Checkbox
                    key={modulo.id}
                    value={modulo.id.toString()}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary2/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary2 data-[selected]:bg-primary2/50 data-[selected]:text-white cursor-pointer"
                  >
                    {({ isSelected, isFocusVisible }) => (
                      <>
                        <div
                          className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center
                            ${isSelected ? "bg-primary text-white" : "bg-white"}
                            ${
                              isFocusVisible
                                ? "ring-2 ring-offset-2 ring-primary2"
                                : ""
                            }
                          `}
                        >
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          )}
                        </div>
                        <span className="text-white">{modulo.titulo}</span>
                      </>
                    )}
                  </Checkbox>
                ))}
              </div>
            </CheckboxGroup>
          )}
          {errors.modulosIds && (
            <p className="text-red-500 text-xs md:text-[1rem] mt-1">
              {errors.modulosIds.message}
            </p>
          )}
        </div>

        {/* SEÇÃO DE MÓDULOS AGREGADOS*/}
        <div className="w-[95%] h-[9.5rem] rounded-lg border border-primary2 overflow-auto p-2 py-4 relative">
          {loadingModulos || loadingLessons ? (
            <div className="absolute inset-0 flex items-center justify-center bg-primary1/80 z-10">
              <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : errorModulos || errorLessons ? (
            <p className="text-red-500 text-sm mt-2 text-center absolute inset-0 flex items-center justify-center bg-primary1/80 z-10">
              {errorModulos || errorLessons}
            </p>
          ) : (
            <>
              <span className="text-white">
                {selectedModuleIds.length} Módulo
                {selectedModuleIds.length !== 1 ? "s" : ""} de aprendizagem
                agregado
                {selectedModuleIds.length !== 1 ? "s" : ""}{" "}
                {selectedModuleIds.length > 0 && (
                  <>
                    <br className="md:hidden" />{" "}
                    {/* Quebra de linha apenas em telas menores (mobile) */}
                    <span className="inline-flex items-center">
                      <span>(</span>
                      <span className="text-yellow">
                        {totalSelectedAulas} aula
                        {totalSelectedAulas !== 1 ? "s" : ""}
                      </span>
                      <span className="mx-1">-</span>
                      <span className="inline-flex items-center">
                        <span className="mr-1">Tempo aprox:</span>
                        <span className="flex items-center">
                          <span className="mr-1">
                            <MdAccessTimeFilled />
                          </span>
                          <span>{formatDuration(totalSelectedDuracao)})</span>
                        </span>
                      </span>
                    </span>
                  </>
                )}
              </span>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {selectedModuleIds.map((moduleIdString) => {
                  const module = modulosDisponiveis.find(
                    (m) => m.id === parseInt(moduleIdString)
                  );
                  const details = moduloAggregatedDetails[
                    parseInt(moduleIdString)
                  ] || { totalAulas: 0, totalDuracao: 0 };

                  return module ? (
                    <div
                      key={module.id}
                      className="flex flex-col h-[6rem] rounded-lg border border-white p-2 px-4 gap-1"
                    >
                      <span className="font-extralight text-white">MÓDULO</span>
                      <span className="text-primary2 pb-1">
                        {module.titulo}
                      </span>
                      <div className="pt-2 border-t border-white">
                        <span className="font-extralight text-yellow">
                          {details.totalAulas} aula(s) -{" "}
                        </span>
                        <span className="font-extralight text-white inline-flex items-start">
                          <span className="mr-1">
                            <MdAccessTimeFilled />
                          </span>
                          {details.totalDuracao} min
                        </span>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </>
          )}
        </div>
        <div className="w-full grid md:grid-cols-2 gap-2 md:gap-6 px-4 md:px-8 items-star content-start mt-5">
          {/* Data de Inicio */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m text-left md:text-lg">
              Data de Inicio
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("dataInicio")}
              min={today} // A data de início não pode ser anterior à data atual
              type="date"
            />
            {errors.dataInicio && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.dataInicio.message}
              </p>
            )}
          </div>

          {/* Data de Conclusão */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m text-left md:text-lg">
              Data de Conclusão
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("dataConclusao")}
              type="date"
            />
            {errors.dataConclusao && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 ">
                {errors.dataConclusao.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-[7rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary2 hover:text-black transition-colors duration-200"
            type="button"
            onClick={() => setIsVisible(false)}
          >
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
              Cancelar
            </p>
          </button>
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] bg-primary2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary4 hover:text-black transition-colors duration-200"
            type="submit"
          >
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
              Salvar Edição
            </p>
          </button>
        </div>
      </div>
    </form>
  );
};
