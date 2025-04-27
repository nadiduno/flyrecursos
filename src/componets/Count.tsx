import { CiSearch } from "react-icons/ci";
import { Table } from "./Table";


export function Count() {
  return (
    <div className="w-full flex-row text-xs mt-2 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex flex-row items-center justify-between p-2 md:p-6 lg:p-6 text-xl">
          <p>CONTA</p>
          <button
            // onClick={}
            className="w-[10rem] h-[1.5rem] md:w-[21rem] md:h-[2.5rem] lg:w-[21rem] lg:h-[2.5rem] rounded-[3.125rem] bg-primary2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-center font-bold  text-[1rem] md:text-[1.25rem] lg:text-[1.25rem] opacity-95 hover:opacity-100 cursor-pointer transition-transform duration-500"
            aria-label="Criar Conta"
          >
            + CRIAR CONTA
          </button>
        </div>
      </div>
    <div className="flex justify-end items-end h-[3.5rem] md:h-[7rem] lg:h-[7rem] pb-2 md:pb-4 lg:pb-4">
      <div className="flex flex-row items-end gap-1 md:gap-4 lg:gap-4">
          <input 
            type="text" 
            placeholder="Digite o nome para consultar"
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
        <Table />
      </div>
    </div>
  );
}
