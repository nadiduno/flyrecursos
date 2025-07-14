import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { FormData } from "../../types/typeFormData";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";

// Algoritmo de Módulo 11 - Algoritmo do dígito verificador (CPF válidos)
const calculateDigitCPF = (
  value: string,
  tamanho: number,
  pesos: number[]
): number => {
  let soma = 0;
  for (let i = 1; i <= tamanho; i++) {
    soma += Number.parseInt(value.substring(i - 1, i)) * pesos[i - 1];
  }
  const resto = (soma * 10) % 11;
  return resto === 10 || resto === 11 ? 0 : resto;
};

const validateCPF = (cpf: string): boolean => {
  const cleanedCpf: string = cpf.replace(/\D/g, "");
  if (cleanedCpf.length !== 11) {
    return false;
  }
  if (/^(\d)\1{10}$/.test(cleanedCpf)) {
    return false;
  }
  const digito1 = calculateDigitCPF(
    cleanedCpf,
    9,
    [10, 9, 8, 7, 6, 5, 4, 3, 2]
  );
  const digito2 = calculateDigitCPF(
    cleanedCpf,
    10,
    [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  );
  return (
    digito1 === Number.parseInt(cleanedCpf.substring(9, 10)) &&
    digito2 === Number.parseInt(cleanedCpf.substring(10, 11))
  );
};

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
    .max(14, "O CPF deve ter no máximo 14 caracteres (com formatação).")
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "Formato de CPF inválido.")
    .refine(validateCPF, {
      message: "CPF inválido.",
    }),
  dataNascimento: z
    .string()
    .nonempty("Precisamos do Data de nascimento")
    .refine((dateString) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      const MIN_YEAR = 1940;
      const MAX_YEAR = today.getFullYear() - 10;
      return (
        birthDate <= today &&
        birthDate.getFullYear() >= MIN_YEAR &&
        birthDate.getFullYear() <= MAX_YEAR
      );
    }, "O usuário precisa ter pelo menos 10 anos"),
  perfil: z.enum(["ALUNO", "ADMIN"], {
    errorMap: () => ({ message: "Selecione um perfil válido." }),
  }),
});

export type FormData = z.infer<typeof FormDataSchema>;

interface AccountFormProps {
  onSubmit: (data: FormData) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAccountForm: React.FC<AccountFormProps> = ({
  onSubmit,
  setIsVisible,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      perfil: "ALUNO",
      nome: "",
      email: "",
      cpf: "",
      dataNascimento: "",
    },
  });

  const perfilSelecionado = watch("perfil");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="my-[1rem] md:mt-[3rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold ">
          CRIAR CONTA{" "}
        </p>
        <div className="w-full grid md:grid-cols-2 min-h-[20rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-star content-start">
          {/* Nome */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m p-b-[0.5rem] md:py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Nome completo
            </label>
            <input
              {...register("nome")}
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              type="text"
              placeholder="Digite seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.nome.message}
              </p>
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
              placeholder="Digite seu email"
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
              CPF -{" "}
              <span className="text-secondary text-xs md:text-[1rem] font-normal">
                Ex: 999.999.999-99
              </span>
            </label>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <PatternFormat
                  format="###.###.###-##"
                  {...field}
                  className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
              placeholder:text-secondary md:text-lg"
                />
              )}
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                {errors.cpf.message}
              </p>
            )}
          </div>

          {/* Perfil da conta */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Perfil da conta
            </label>
            <select
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
              {...register("perfil")}
              defaultValue={"ALUNO"}
            >
              <option value="ALUNO">Aluno</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          {perfilSelecionado === "ALUNO" && (
            // Data de nascimento
            <div className="w-full flex flex-col md:flex-col">
              <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
                Data de nascimento
              </label>
              <input
                className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
            placeholder:text-secondary md:text-lg"
                {...register("dataNascimento")}
                max={
                  new Date(Date.now() - 86400000).toISOString().split("T")[0]
                }
                type="date"
                placeholder="Digite sua data de nascimento"
              />
              {errors.dataNascimento && (
                <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">
                  {errors.dataNascimento.message}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem]  rounded-[50px]  border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]  hover:bg-secondary2 hover:text-black transition-colors duration-200"
            type="button"
            onClick={() => setIsVisible(false)}
          >
            {" "}
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
              Cancelar
            </p>
          </button>
          <button
            className="w-[8rem] md:w-[15rem] h-[3rem]  rounded-[50px] bg-primary2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary4 hover:text-black transition-colors duration-200"
            type="submit"
          >
            {" "}
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
              Criar Conta
            </p>
          </button>
        </div>
      </div>
    </form>
  );
};
