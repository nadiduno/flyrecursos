import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowData } from "./Account";

interface TableCRUDAccountProps {
  students: TableRowData[];
  loading: boolean;
  error: string | null;
  onEdit: (student: TableRowData) => void;
  onDelete: (student: TableRowData) => void;
}

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-');
  return `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
}

export function TableCRUDAccount({
  onDelete,
  students,
  loading,
  error,
  onEdit,
}: TableCRUDAccountProps) {
  

  if (loading) {
    return (
    <div className="flex flex-col items-center justify-centertext-center text-yellow py-5">
       <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white pt-2">Preparando o conteúdo pra você...</span>
    </div>
    );
  }

  if (error) {
    return( 
      <div className="flex flex-col items-center justify-centertext-center text-center text-red-500 py-5">
      <div className="text-lg font-semibold">
          Opa! Não conseguimos carregar os alunos no momento.
          <br />
          Tente novamente mais tarde.
        </div>
      </div>
    );
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
              CPF
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              E-mail
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              Data de Nasc.
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-s lg:text-s">
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
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">{row.cpf}</td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">{row.email}</td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">{formatarData(row.dataNascimento)}</td>
                <td className="whitespace-nowrap text-right flex flex-row gap-4 py-2 px-2 justify-end">
                  <button onClick={() => onEdit(row)}>
                    <GrEdit
                      size={18}
                      className=" opacity-90 hover:opacity-100 hover:text-yellow cursor-pointer transition-transform duration-500"
                      title="Editar"
                      aria-label="Editar"
                    />
                  </button>
                  <button onClick={() => onDelete(row)}>
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

      
    </div>
  );
}
