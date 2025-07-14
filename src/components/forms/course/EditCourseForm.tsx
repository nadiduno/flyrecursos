import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataCourse } from "../../../types/typeFormData";
import { Checkbox, CheckboxGroup } from "react-aria-components";

interface ModuloOption {
  id: number;
  titulo: string;
}

const FormDataSchema = z.object({
  titulo: z
    .string()
    .nonempty("O título do curso é obrigatório.")
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  modulosIds: z.array(z.number()).optional(),
});

type FormData = z.infer<typeof FormDataSchema> & {
  id?: number;
  autorId?: number;
};

interface EditCourseFormProps {
  onSubmit: SubmitHandler<FormData>;
  defaultData?: FormDataCourse;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modulosDisponiveis: ModuloOption[];
}

export const EditCourseForm: React.FC<EditCourseFormProps> = ({
  onSubmit,
  defaultData,
  setIsVisible,
  modulosDisponiveis,
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
      modulosIds: [],
    },
  });

  const [selectedModules, setSelectedModules] = useState<number[]>([]);

  useEffect(() => {
    if (defaultData) {
      reset({
        titulo: defaultData.titulo,
        modulosIds: defaultData.modulosIds || [],
        id: defaultData.id,
        autorId: defaultData.autorId,
      });
      // Sincroniza selectedModules com o estado inicial
      setSelectedModules(defaultData.modulosIds || []);
    } else {
      reset({
        titulo: "",
        modulosIds: [],
        id: undefined,
        autorId: undefined,
      });
      setSelectedModules([]);
    }
  }, [defaultData, reset]);

  const handleSelectedModulesChange = (newSelection: string[]) => {
    // Converte os IDs de string para number
    const newSelectionAsNumbers = newSelection.map(Number);
    setSelectedModules(newSelectionAsNumbers);
    setValue("modulosIds", newSelectionAsNumbers, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center gap-0 md:gap-1">
        <p className="my-[1rem] md:mt-[1rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold mb-0">
          EDITAR CURSO
        </p>
        <div className="w-[95%] grid gap-2 md:gap-6 pb-4 items-start content-start">
          {/* Título do Curso */}
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

          <label className="w-full md:text-m p-b-[0.125rem] md:py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
            Selecione os módulos para o curso
          </label>
          <div className="flex items-center gap-8">
            <div className="">
              <input
                type="text"
                placeholder="Digite o nome para consultar"
                className="w-[14rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] rounded-[4rem] rounded-br-none border border-gray-300 bg-white p-3 text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-secondary"
                autoComplete="name"
              />
            </div>
          </div>
        </div>

        {/* Seleção de Módulos com CheckboxGroup e Layout Responsivo */}
        <div className="w-[95%] h-[13rem] md:h-[10rem] rounded-lg border border-primary2 overflow-auto p-2">
          {modulosDisponiveis.length === 0 ? (
            <p className="text-red-500 text-sm mt-2 text-center">
              Nenhum módulo disponível. Por favor, crie um módulo primeiro.
            </p>
          ) : (
            <CheckboxGroup
              // Converta os IDs de number[] para string[] para a propriedade value
              value={selectedModules.map(String)}
              onChange={handleSelectedModulesChange}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {modulosDisponiveis.map((modulo) => (
                  <Checkbox
                    key={modulo.id}
                    // Converta modulo.id para string para a propriedade value
                    value={String(modulo.id)}
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

        {/* Seção de Módulos Agregados (exibição dos módulos selecionados) */}
        <div className="w-[95%] h-[17rem] md:h-[15rem] rounded-lg border border-primary2 overflow-auto p-2 py-4">
          <span className="text-white">
            {selectedModules.length} Módulo
            {selectedModules.length !== 1 ? "s" : ""} de aprendizagem agregado
            {selectedModules.length !== 1 ? "s" : ""}
          </span>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {selectedModules.map((moduleId) => {
              const module = modulosDisponiveis.find((m) => m.id === moduleId);
              return module ? (
                <div
                  key={module.id}
                  className="flex flex-col h-[6rem] rounded-lg border border-white p-2 px-4 gap-1"
                >
                  <span className="font-extralight text-white">MÓDULO</span>
                  <span className="text-primary2 pb-2">{module.titulo}</span>
                  <div className="pt-2 border-t border-white">
                    <span className="font-extralight text-white">
                      0 aula(s) -{" "}
                    </span>
                    <span className="font-extralight text-white">
                      0 minutos
                    </span>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div className="w-full h-[7.5rem] md:h-[10rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
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
              Salvar Alterações
            </p>
          </button>
        </div>
      </div>
    </form>
  );
};
