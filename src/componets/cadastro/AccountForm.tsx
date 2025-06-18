import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  perfil: string;
  perfilAluno: string;
  senha: string;
  senha2?: string;
};

interface AccountFormProps {
  onSubmit: (data: FormData) => void;
  setMessage: (msg: string | null) => void;
  setCreationError: (msg: string | null) => void;
  message: string | null;
  creationError: string | null;
}

const AccountForm: React.FC<AccountFormProps> = ({
  onSubmit,
  setMessage,
  setCreationError,
  message,
  creationError,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        setMessage(null);
        setCreationError(null);
      }}
    >
      <div className="flex flex-row place-content-around gap-1">
        <div>
          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Nome completo
            </label>
            <input
              {...register("nome", { required: true })}
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              type="text"
              placeholder="Digite seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1">O nome é obrigatório</p>
            )}
          </div>
          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              E-mail
            </label>
            <input
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("email", { required: true })}
              type="email"
              placeholder="Digite seu email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                O e-mail é obrigatório
              </p>
            )}
          </div>

          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              CPF
            </label>
            <input
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("cpf", { required: true })}
              type="text"
              placeholder="000.000.000-00"
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs mt-1">O CPF é obrigatório</p>
            )}
          </div>

          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Data de nascimento
            </label>
            <input
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("dataNascimento", { required: true })}
              max={
                new Date(Date.now() - 86400000).toISOString().split("T")[0] // → "2022-01-17"
              } // não pode ser maior que a data atual
              type="date"
              placeholder="Digite sua data de nascimento"
            />
            {errors.dataNascimento && (
              <p className="text-red-500 text-xs mt-1">A data esta errada</p>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Perfil da conta
            </label>
            <select
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("perfil", { required: true })}
              defaultValue={"ALUNO"}
            >
              <option value="ALUNO">Aluno</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Perfil do aluno
            </label>
            <select
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("perfilAluno", { required: true })}
              defaultValue={"MERCADO"}
            >
              <option value="MERCADO">Mercado</option>
              <option value="TECNOLOGIA">Tecnologia</option>
              <option value="MARKETING_E_EMPREENDEDORISMO">
                Marketing e Empreendedorismo
              </option>
              <option value="SUPERPROFS">SuperProfs</option>
              <option value="COLORINDO">Colorindo</option>
              <option value="ALL">Tudo</option>
            </select>
          </div>

          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Senha
            </label>
            <input
              {...register("senha", { required: true })}
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              type="password"
              placeholder="Digite sua senha"
            />
            {errors.senha && (
              <p className="text-red-500 text-xs mt-1">A Senha é obrigatória</p>
            )}
          </div>
          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Repita a senha
            </label>
            <input
              {...register("senha2", {
                required: "A senha é obrigatória",
                validate: (value) =>
                  value === watch("senha") || "As senhas não coincidem",
              })}
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              type="password"
              placeholder="Digite sua senha novamente"
            />
            {errors.senha2 && (
              <p className="text-red-500 text-xs mt-1">
                As senhas não coincidem
              </p>
            )}
            {creationError && (
              <p className="text-red-500 text-xs mt-1">{creationError}</p>
            )}
            {message && (
              <p className="text-green-500 text-xs mt-1">{message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-[942px] h-[152px] bt-[5px] rounded-b-[5px] bg-[#FFFFFF] flex justify-center items-center space-x-4">
        <button
          className="w-[400px] min-h-[50px]  rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]"
          type="submit"
        >
          {" "}
          <p className="h-[23px] leading-tight tracking-normal text-center font-bold text-[20px]">
            CRIAR CONTA
          </p>
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
