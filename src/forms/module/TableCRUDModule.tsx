import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowDataModule } from "./Module";
interface TableCRUDModuleProps {
  modules: TableRowDataModule[];
  loading: boolean;
  error: string | null;
  onEdit: (module: TableRowDataModule) => void;
  onDelete: (module: TableRowDataModule) => void;
}

export function TableCRUDModule({
  onDelete,
  modules,
  loading,
  error,
  onEdit,
}: TableCRUDModuleProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-yellow py-5">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white pt-2">
          Preparando o conteúdo pra você...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-red-500 py-5">
        <div className="text-lg font-semibold">
          Opa! Não conseguimos carregar os módulos no momento.
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
          <col className="hidden md:table-cell lg:table-cell" />
          <col className="w-22" />
        </colgroup>
        <thead className="border-b border-secondary">
          <tr className="px-6 py-4 text-left font-medium tracking-wider text-yellow md:text-[17px]">
            <th scope="col" className="py-3">
              Título do Módulo
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-s lg:text-s">
          {modules.length === 0 ? ( // Usar 'modules'
            <tr>
              <td colSpan={2} className="text-center py-4 text-gray-500">
                {" "}
                {/* colSpan ajustado para 2 colunas */}
                Nenhum módulo encontrado.
              </td>
            </tr>
          ) : (
            modules.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap py-2">{row.titulo}</td>
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
