import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowDataModule } from "./Module";
import { Table, Column, Row, Cell, TableHeader, TableBody } from 'react-aria-components';

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
    <div className="relative h-full overflow-hidden">
      <div className="h-[calc(100vh-300px)] overflow-auto">
        <Table 
          aria-label="Lista de módulos" 
          className="w-full fixed-table"
        >
          <TableHeader className="sticky-header border-b border-secondary">
            <Column 
              isRowHeader 
              className="w-[70%] px-2 py-3 text-left font-medium text-yellow"
            >
              Título do Módulo
            </Column>
            <Column 
              className="w-[30%] px-2 py-3 text-right font-medium text-yellow"
            >
              Ações
            </Column>
          </TableHeader>
          
          <TableBody className="divide-y divide-secondary">
            {modules.length === 0 ? (
              <Row>
                <Cell colSpan={2} className="text-center py-4 text-gray-500">
                  Nenhum módulo encontrado.
                </Cell>
              </Row>
            ) : (
              modules.map((module) => (
                <Row key={module.id} className="table-row-hover">
                  <Cell className="table-cell truncate">
                    {module.titulo}
                  </Cell>
                  <Cell className="table-cell">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(module)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-yellow rounded"
                        aria-label={`Editar módulo ${module.titulo}`}
                        title="Editar módulo"
                      >
                        <GrEdit className="text-lg opacity-70 hover:opacity-100 hover:text-yellow transition-colors" />
                      </button>
                      <button 
                        onClick={() => onDelete(module)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        aria-label={`Excluir módulo ${module.titulo}`}
                        title="Excluir módulo"
                      >
                        <RiDeleteBin6Line className="text-lg opacity-70 hover:opacity-100 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </Cell>
                </Row>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}