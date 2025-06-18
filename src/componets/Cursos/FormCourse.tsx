import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  titulo: string;
  descripcao: string;
  modulosID : string[];
  autorID: string;
};

interface FormCourseProps {
  onSubmit: (data: FormData) => void;
  setMessage: (msg: string | null) => void;
  setCreationError: (msg: string | null) => void;
  message: string | null;
  creationError: string | null;
}

const FormCourse: React.FC<FormCourseProps> = ({
  onSubmit,
  setMessage,
  setCreationError,

}) => {
  const {
    register,
    handleSubmit,
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
              Titulo
            </label>
            <input
              {...register("titulo", { required: true })}
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              type="text"
              placeholder=""
            />
            {errors.titulo && (
              <p className="text-red-500 text-xs mt-1">O titulo é obrigatório</p>
            )}
          </div>
          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Descripcao
            </label>
            <input
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("descripcao", { required: true })}
              type="text"
              placeholder=""
            />
            {errors.descripcao && (
              <p className="text-red-500 text-xs mt-1">
                Descripcao é obrigatório
              </p>
            )}
          </div>

          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Modulos
            </label>
            <input
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("modulosID", { required: true })}
              type="text"
              placeholder=""
            />
            {errors.modulosID && (
              <p className="text-red-500 text-xs mt-1">O modulo é obrigatório</p>
            )}
          </div>

          <div className="flex flex-col w-[400px] h-[73px] mb-[24px]">
            <label className="block h-[21px] text-lg font-normal mb-[4px] text-left">
              Autor
            </label>
            <input
              className="w-[400px] min-h-[50px] bg-[#EBEBF5] rounded-[5px] pl-[16px] text-black text-lg font-normal placeholder:h-[21px] border-[#0000001A] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] 
                 placeholder:text-[#8D8686]"
              {...register("autorID", { required: true })}
             
              type="text"
              placeholder=""
            />
            {errors.autorID && (
              <p className="text-red-500 text-xs mt-1">Falta autor do curso</p>
            )}
          </div>
        </div>
        <div>
        </div>
      </div>

      <div className="w-[942px] h-[152px] bt-[5px] rounded-b-[5px] bg-[#FFFFFF] flex justify-center items-center space-x-4">
        <button
          className="w-[400px] min-h-[50px]  rounded-[50px] bg-[#00CAFE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)]"
          type="submit"
        >
          {" "}
          <p className="h-[23px] leading-tight tracking-normal text-center font-bold text-[20px]">
            CRIAR CURSO
          </p>
        </button>
      </div>
    </form>
  );
};

export default FormCourse;
