import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { get } from "../../../services/api";

interface CursoOption {
  id: number;
  titulo: string;
}

interface CursosApiResponse {
  content: CursoOption[];
  totalElements: number;
  totalPages: number;
  size: number;
}

// Algoritmo de Módulo 11 - Algoritmo do dígito verificador (CPF válidos)
const calculateDigitCPF = (value: string, tamanho: number, pesos: number[]): number => {
  let soma = 0;
  for (let i = 1; i <= tamanho; i++) {
    soma += Number.parseInt(value.substring(i - 1, i)) * pesos[i - 1];
  }
  const resto = (soma * 10) % 11;
  return resto === 10 || resto === 11 ? 0 : resto;
};

const validateCPF = (cpf: string): boolean => {
  const cleanedCpf: string = cpf.replace(/\D/g, "");
  if (cleanedCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanedCpf)) {
    return false;
  }
  const digito1 = calculateDigitCPF(cleanedCpf, 9, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const digito2 = calculateDigitCPF(cleanedCpf, 10, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  return digito1 === Number.parseInt(cleanedCpf.substring(9, 10)) && digito2 === Number.parseInt(cleanedCpf.substring(10, 11));
};

const FormDataSchema = z.object({
  nome: z.string().nonempty("Precisamos do nome completo"),
  email: z.string().nonempty("Precisamos do e-mail para contato").email("Este e-mail não parece válido. Poderia verificar?"),
  cpf: z
    .string()
    .nonempty("Precisamos do CPF")
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "Formato de CPF inválido.")
    .refine(validateCPF, { message: "CPF inválido." }),
  perfil: z.enum(["ALUNO", "ADMIN"], { errorMap: () => ({ message: "Selecione um perfil válido." }) }),
  dataNascimento: z.string().optional(),
  cursoId: z.number().int().positive("Selecione um curso válido").optional().nullable(),
}).superRefine((data, ctx) => {
  if (data.perfil === "ALUNO") {
    if (!data.dataNascimento) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dataNascimento"],
        message: "Precisamos da data de nascimento.",
      });
    } else {
      const birthDate = new Date(data.dataNascimento);
      const today = new Date();
      const MIN_YEAR = 1940;
      const MAX_YEAR = today.getFullYear() - 10;
      if (!(birthDate <= today && birthDate.getFullYear() >= MIN_YEAR && birthDate.getFullYear() <= MAX_YEAR)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dataNascimento"],
          message: "O usuário precisa ter pelo menos 10 anos.",
        });
      }
    }
  }
});

type FormSchema = z.infer<typeof FormDataSchema>;

interface AccountFormProps {
  onSubmit: (data: FormSchema) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAccountForm: React.FC<AccountFormProps> = ({ onSubmit, setIsVisible }) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      perfil: "ALUNO",
      nome: "",
      email: "",
      cpf: "",
      dataNascimento: "",
      cursoId: undefined,
    },
  });

  const perfilSelecionado = watch("perfil");

  const [cursosDisponiveis, setCursosDisponiveis] = useState<CursoOption[]>([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [errorCursos, setErrorCursos] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoadingCursos(true);
        const response = await get<CursosApiResponse>("/api/cursos");
        setCursosDisponiveis(response.data?.content || []);
      } catch (err) {
        setErrorCursos("Não foi possível carregar os cursos");
      } finally {
        setLoadingCursos(false);
      }
    };
    fetchCursos();
  }, []);

  useEffect(() => {
    if (perfilSelecionado === "ADMIN") {
      setValue("cursoId", undefined);
      setValue("dataNascimento", undefined);
    } else {
      setValue("cursoId", undefined);
      setValue("dataNascimento", "");
    }
  }, [perfilSelecionado, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="my-[1rem] md:mt-[3rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold">
          CRIAR CONTA
        </p>
        <div className="w-full grid md:grid-cols-2 min-h-[20rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-star content-start">
          {/* Nome */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m p-b-[0.5rem] md:py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Nome completo
            </label>
            <input
              {...register("nome")}
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
              type="text"
              placeholder="Digite seu nome completo"
            />
            {errors.nome && <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">{errors.nome.message}</p>}
          </div>

          {/* E-mail */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              E-mail
            </label>
            <input
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
              {...register("email")}
              type="email"
              placeholder="Digite seu email"
            />
            {errors.email && <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">{errors.email.message}</p>}
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
                  className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
                />
              )}
            />
            {errors.cpf && <p className="text-red-500 text-xs md:text-[1rem] mt-1 md:mt-5">{errors.cpf.message}</p>}
          </div>

          {/* Perfil da conta */}
          <div className="w-full flex flex-col md:flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Perfil da conta
            </label>
            <select
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
              {...register("perfil")}
              defaultValue={"ALUNO"}
            >
              <option value="ALUNO">Aluno</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.perfil && <p className="text-red-500 text-xs md:text-[1rem] mt-1">{errors.perfil.message}</p>}
          </div>

          {/* Campos condicionais para Aluno */}
          {perfilSelecionado === "ALUNO" && (
            <div className="w-full flex gap-4 md:col-span-2">
              {/* Data de nascimento */}
              <div className="w-1/3 flex flex-col">
                <label className="w-full md:text-m py-[0.5rem] text-left md:text-lg">
                  Data de nascimento
                </label>
                <input
                  className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
                  {...register("dataNascimento")}
                  max={
                    new Date(Date.now() - 86400000).toISOString().split("T")[0]
                  }
                  type="date"
                />
                {errors.dataNascimento && <p className="text-red-500 text-xs md:text-[1rem] mt-1">{errors.dataNascimento.message}</p>}
              </div>

              {/* Seleção de Cursos */}
              <div className="w-2/3 flex flex-col">
                <label className="w-full md:text-m py-[0.5rem] text-left md:text-lg">
                  Matricular em um curso
                </label>
                {loadingCursos ? (
                  <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                ) : errorCursos ? (
                  <p className="text-red-500">{errorCursos}</p>
                ) : (
                  // Usando Controller para gerenciar o valor do select
                  <Controller
                    name="cursoId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <select
                        className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
                        value={value ?? ""}
                        onChange={(e) => {
                          onChange(e.target.value === "" ? undefined : Number(e.target.value));
                        }}
                      >
                        <option value="" disabled>
                          Selecione um curso
                        </option>
                        {cursosDisponiveis.map((curso) => (
                          <option key={curso.id} value={curso.id}>
                            {curso.titulo}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                )}
                {cursosDisponiveis.length === 0 && !loadingCursos && (
                  <p className="text-red-500 text-sm mt-2">
                    Nenhum curso disponível.
                  </p>
                )}
                {errors.cursoId?.message && (
                  <p className="text-red-500 text-xs md:text-[1rem] mt-1">
                    {errors.cursoId.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
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
              Criar Conta
            </p>
          </button>
        </div>
      </div>
    </form>
  );
};