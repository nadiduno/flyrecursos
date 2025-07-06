import React from "react";

interface DeleteModuleFormModuleProps {
  onConfirm: () => void;
  onCancel: () => void;
  moduleTitle: string; // A prop agora é moduleTitle
}

export const DeleteModuleForm: React.FC<DeleteModuleFormModuleProps> = ({
  onConfirm,
  onCancel,
  moduleTitle,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="my-[1rem] md:mt-[3rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold ">
        CONFIRMAR EXCLUSÃO DO MÓDULO{" "}
      </p>

      <p className="flex flex-col text-sm md:text-md text-center text-white">
        Tem certeza que deseja excluir o módulo{" "}
        <span className="font-bold text-yellow p-4 md:p-8 mb-1">
          "{moduleTitle}"?
        </span>{" "}
        Esta ação não pode ser desfeita.
      </p>

      <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
        <button
          className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary2 hover:text-black transition-colors duration-200"
          type="button"
          onClick={onCancel}
        >
          <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
            Cancelar
          </p>
        </button>
        <button
          className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] bg-red-500 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-red-400 hover:text-black transition-colors duration-200"
          type="button"
          onClick={onConfirm}
        >
          <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
            Confirmar Exclusão
          </p>
        </button>
      </div>
    </div>
  );
};
