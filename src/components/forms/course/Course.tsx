import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { ButtonFly } from "../../botoes/ButtonFly";
import { CgAdd } from "react-icons/cg";
import { TableCRUDCourse } from "./TableCRUDCourse";
import { CreateCourse } from "./CreateCourse";

export function Course() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleCreateAccount = (): void => {
    setShowCreateAccount(true);
  };

  const handleDelete = () => {
    // Lógica para deletar o usuário (ex: chamada à API)
    console.log("Curso deletado!");
  };

  return (
    <div className="w-full flex-row text-xs m-2 my-3 p-1 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Curso</p>
          <div className="flex-shrink-1">
            <ButtonFly
              text="Criar Curso"
              onClick={handleCreateAccount}
              icon={CgAdd}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end h-[3.5rem] md:h-[7rem] lg:h-[7rem] pb-2 md:pb-4 lg:pb-4">
        <div className="flex flex-row items-end gap-1 md:gap-4 lg:gap-4">
          <input
            type="text"
            placeholder="Digite o curso para consultar"
            className="w-[10rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] lg:w-[20rem] lg:h-[2.5rem]  rounded-[4rem] rounded-br-none border-whitebg-white p-3"
            // onChange={}
            // value={}
          />
          <CiSearch
            size={28}
            className=" opacity-90 hover:opacity-100 cursor-pointer transition-transform duration-500"
            title="Buscar"
            aria-label="Buscar"
          />
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto">
        <TableCRUDCourse onDelete={handleDelete} />
      </div>

      <div className="">
        {showCreateAccount && (
          <CreateCourse
            isVisible={showCreateAccount}
            setIsVisible={setShowCreateAccount}
          />
        )}
      </div>
    </div>
  );
}
