import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TableRowData {
  id: number;
  nome: string;
  email?: string;
}

interface TableCRUDCountProps {
  onDelete: (id:number) => void; 
  students: TableRowData[];
  loading: boolean;
  error: string | null;
}

export function TableCRUDCount({ onDelete, students, loading, error }: TableCRUDCountProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);

const openModal = (id: number) => {
  setSelectedId(id);
  setIsModalOpen(true);
};
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    if (selectedId !== null) {
    onDelete(selectedId);
    closeModal();
  }

  };

  if (loading) {
    return <div className="text-center text-yellow">Carregando alunos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto flex justify-center p-1">
      <table className="min-w-[95%]">
        <colgroup>
          <col />
          <col className="hidden md:table-cell lg:table-cell" />
          <col className="w-22" />
        </colgroup>
        <thead className="border-b border-secondary">
          <tr className="px-6 py-4 text-left font-medium tracking-wider text-yellow md:text-[17px]">
            <th scope="col" className="py-3">
              Nome Completo
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              E-mail
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-sm lg:text-sm">
          {students.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                Nenhum aluno encontrado.
              </td>
            </tr>
          ) : (
            students.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap py-2">{row.nome}</td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">
                  {row.email}
                </td>
                <td className="whitespace-nowrap text-right flex flex-row gap-4 py-2 px-2 justify-end">
                  <a href="#" className="">
                    <GrEdit
                      size={18}
                      className=" opacity-90 hover:opacity-100 hover:text-yellow cursor-pointer transition-transform duration-500"
                      title="Editar"
                      aria-label="Editar"
                    />
                  </a>
                <button onClick={() => openModal(row.id)}>
  <RiDeleteBin6Line
    size={18}
    className="opacity-90 hover:opacity-100 hover:text-red-500 cursor-pointer transition-transform duration-500"
    title="Eliminar"
    aria-label="Eliminar"
  />
</button>
                </td>
              </tr>
            ))
          )}
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
                className="px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-400"
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