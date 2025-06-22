import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TableRowData {
  name: string;
}

const data: TableRowData[] = [
  { name: "Aula 1" },
  { name: "Aula 2"},
];


interface DeleteUserProps {
  onDelete: () => void; // função para executar a exclusão real
}

export function TableCRUDLesson({ onDelete }:DeleteUserProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    onDelete();
    closeModal();
  };
  return (
    <div className="overflow-x-auto flex justify-center p-1">
      <table className="min-w-[95%]">
        <colgroup>
          <col /> 
          <col className="hidden md:table-cell lg:table-cell" /> 
          <col className="w-22" />{" "}
        </colgroup>
        <thead  className="border-b border-secondary">
          <tr className="px-6 py-4 text-left font-medium  tracking-wider text-yellow md:text-[17px]">
            <th scope="col" className="py-3">
              Aula
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-sm lg:text-sm">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-2">{row.name}</td>
              <td className="whitespace-nowrap text-right flex flex-row gap-4 py-2 px-2 justify-end">
                <a href="#" className="">
                  <GrEdit 
                    size={18}
                    className=" opacity-90 hover:opacity-100 hover:text-yellow cursor-pointer transition-transform duration-500"
                    title="Editar"
                    aria-label="Editar"
                  />
                </a>
                <button onClick={openModal}>
                  <RiDeleteBin6Line 
                    size={18}
                    className=" opacity-90 hover:opacity-100 hover:text-red-500 cursor-pointer transition-transform duration-500"
                    title="Eliminar"
                    aria-label="Eliminar" 
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#FFFFFFB2] bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-[#004054] p-6 rounded-[10px] shadow-md w-full max-w-md">
            <p className="text-xl text-center font-normal font-roboto mb-10">
              Tem certeza que deseja deletar o usuário?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-black  bg-gray-200 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
