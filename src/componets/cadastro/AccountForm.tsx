import React from "react";
import { useForm } from "react-hook-form";
import FormData from "../../types/typeFormData";

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
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

const perfilSelecionado = watch("perfil")
  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        setMessage(null);
        setCreationError(null);
      }}
    >
      <div className="grid grid-cols-2 place-content-around gap-5 min-h-[300px]">
        
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
           {perfilSelecionado === "ALUNO" && (
  <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
    <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
      Data de nascimento
    </label>
    <input
      className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-[#8D8686]"
      {...register("dataNascimento", { required: perfilSelecionado === "ALUNO" })}
      max={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
      type="date"
      placeholder="Digite sua data de nascimento"
    />
    {errors.dataNascimento && (
      <p className="text-red-500 text-xs mt-1">A data está errada</p>
    )}
  </div>
)}
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
