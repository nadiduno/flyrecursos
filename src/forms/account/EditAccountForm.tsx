import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "../../types/typeFormData";

interface AccountFormProps {
  onSubmit: (data: FormData) => void;
  setMessage: (msg: string | null) => void;
  setCreationError: (msg: string | null) => void;
  message: string | null;
  creationError: string | null;
  defaultData?: FormData;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const EditAccountForm: React.FC<AccountFormProps> = ({
  onSubmit,
  setMessage,
  setCreationError,
  defaultData,
  setIsVisible
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: defaultData });

  useEffect(() => {
    // console.log("Formulário resetado com os novos dados padrão:", defaultData);
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
          EDITAR CONTA{" "}
        </p>
        <div className="w-full grid md:grid-cols-2 min-h-[20rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-star content-start">
          {/* Nome */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:py-[2rem] text-left md:text-lg">
              Nome completo
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("nome", { required: true })}
              type="text"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1">O nome é obrigatório</p>
            )}
          </div>

          {/* E-mail */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:py-[2rem] text-left md:text-lg">
              E-mail
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("email", { required: true })}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                O e-mail é obrigatório
              </p>
            )}
          </div>

          {/* CPF */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:py-[2rem] text-left md:text-lg">
              CPF
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("cpf", { required: true })}
              type="text"
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs mt-1">O CPF é obrigatório</p>
            )}
          </div>

          {/* Data de nascimento */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:py-[2rem] text-left md:text-lg">
              Data de nascimento
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("dataNascimento", {
                required: true,
              })}
              max={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
              type="date"
            />
            {errors.dataNascimento && (
              <p className="text-red-500 text-xs mt-1">A data está errada</p>
            )}
          </div>
        </div>

        <div className="w-full h-[7rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4">
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem]  rounded-[50px]  border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]"
            type="button"
            onClick={() => setIsVisible(false)}
          >
            {" "}
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
              Canelar
            </p>
          </button>
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem]  rounded-[50px] bg-primary2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]"
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
