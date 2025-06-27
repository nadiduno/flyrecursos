import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const FormDataSchema = z.object({
  // Validação com zod
  nome: z
    .string()
    .nonempty("Precisamos do nome completo")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(50, "O nome deve ter no máximo 50 caracteres."),
  email: z
    .string()
    .nonempty("Precisamos do e-mail para contato")
    .email("Este e-mail não parece válido. Poderia verificar?")
    .min(5, "O e-mail deve ter no mínimo 5 caracteres.")
    .max(50, "O e-mail deve ter no máximo 50 caracteres.")
    .transform((val) => val.toLowerCase()),
  cpf: z
    .string()
    .nonempty("Precisamos do CPF")
    .min(11, "O CPF deve ter no mínimo 11 caracteres.")
    .max(14, "O CPF deve ter no máximo 50 caracteres.")
    .regex(
      /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
      "Formato de CPF inválido."
    ),
  dataNascimento: z
    .string()
    .nonempty("Precisamos do Data de nascimento")
    .refine((dateString) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      const MIN_YEAR = 1900; 
      const MAX_YEAR = today.getFullYear() - 10;
      return (
        birthDate <= today &&
        birthDate.getFullYear() >= MIN_YEAR &&
        birthDate.getFullYear() <= MAX_YEAR
      );
    },"Data inválida. Deve ser entre 1900 e " + (new Date().getFullYear() - 10)),
});

type FormData = z.infer<typeof FormDataSchema> & {
  id?: number;
  perfil?: string;
};

interface EditAccountFormProps {
  onSubmit: (data: FormData) => void;
  setMessage: (msg: string | null) => void;
  setCreationError: (msg: string | null) => void;
  message: string | null;
  creationError: string | null;
  defaultData?: FormData;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditAccountForm: React.FC<EditAccountFormProps> = ({
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
  } = useForm<FormData>({
    // defaultValues: defaultData,
    resolver: zodResolver(FormDataSchema), 
    defaultValues: defaultData || {
      nome: "",
      email: "",
      cpf: "",
      dataNascimento: "",
    },
  });

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
            <label className="w-full md:text-m p-b-[0.5rem] md:py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Nome completo
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("nome")}
              type="text"
            />
            {errors.nome?.message && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">{errors.nome.message}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              E-mail
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("email")}
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* CPF */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              CPF
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("cpf")}
              type="text"
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">{errors.cpf.message}</p>
            )}
          </div>

          {/* Data de nascimento */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Data de nascimento
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("dataNascimento")}
              max={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
              type="date"
            />
            {errors.dataNascimento && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.dataNascimento.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem]">
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
