import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataModule } from "../../types/typeFormData";

const ModuleSchemaEdit = z.object({
  titulo: z
    .string()
    .nonempty("O título do módulo é obrigatório.")
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
});

export type FormModuleDataEdit = z.infer<typeof ModuleSchemaEdit>;

interface EditModuleFormProps {
  onSubmit: (data: FormModuleDataEdit) => void;
  setMessage: (msg: string | null) => void;
  setCreationError: (msg: string | null) => void;
  message: string | null;
  creationError: string | null;
  defaultData?: FormDataModule;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateModuleForm: React.FC<EditModuleFormProps> = ({
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
  } = useForm<FormModuleDataEdit>({
    resolver: zodResolver(ModuleSchemaEdit),
    defaultValues: defaultData || { titulo: "" },
  });

  useEffect(() => {
    reset(defaultData);
  }, [defaultData, reset]);

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
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="my-[1rem] md:mt-[3rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold ">
          EDITAR MÓDULO{" "}
        </p>
        <div className="w-full grid min-h-[10rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-star content-start">
          {/* Título do Módulo */}
          <div className="w-full flex flex-col">
            <label className="w-full md:text-m p-b-[0.5rem] md:py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Título do Módulo
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
              placeholder:text-secondary md:text-lg"
              {...register("titulo")}
              type="text"
              placeholder="Digite o novo título do módulo"
            />
            {errors.titulo?.message && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.titulo.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary2 hover:text-black transition-colors duration-200"
            type="button"
            onClick={() => {
              setIsVisible(false);
              setMessage(null);
              setCreationError(null);
            }}
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
