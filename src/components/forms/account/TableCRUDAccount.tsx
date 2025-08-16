import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowData } from "./Account";
import { Table, Column, Row, Cell, TableHeader, TableBody } from 'react-aria-components';

interface TableCRUDAccountProps {
  students: TableRowData[];
  loading: boolean;
  error: string | null;
  onEdit: (student: TableRowData) => void;
  onDelete: (student: TableRowData) => void;
}

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
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
          Opa! Não conseguimos carregar os alunos no momento.
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
          aria-label="Lista de alunos" 
          className="w-full fixed-table"
        >
          <TableHeader className="sticky-header border-b border-secondary">
            <Column 
              isRowHeader 
              className="w-[30%] min-w-[150px] px-2 py-3 text-left font-medium text-yellow bg-primary1"
            >
              Nome Completo
            </Column>
            <Column 
              className="w-[20%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              CPF
            </Column>
            <Column 
              className="w-[27%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              E-mail
            </Column>
            <Column 
              className="w-[13%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              Data Nasc.
            </Column>
            <Column 
              className="w-[10%] px-2 py-3 pr-6text-right font-medium text-yellow bg-primary1"
            >
              Ações
            </Column>
          </TableHeader>
          
          <TableBody className="divide-y divide-secondary">
            {students.length === 0 ? (
              <Row>
                <Cell colSpan={5} className="text-center py-4 text-gray-500">
                  Nenhum aluno encontrado.
                </Cell>
              </Row>
            ) : (
              students.map((student) => (
                <Row key={student.id} className="table-row-hover">
                  <Cell className="table-cell truncate">
                    {student.nome}
                  </Cell>
                  <Cell className="hidden md:table-cell">
                    {student.cpf}
                  </Cell>
                  <Cell className="hidden md:table-cell truncate">
                    {student.email}
                  </Cell>
                  <Cell className="hidden md:table-cell">
                    {formatarData(student.dataNascimento)}
                  </Cell>
                  <Cell className="table-cell">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(student)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-yellow rounded"
                        aria-label={`Editar aluno ${student.nome}`}
                        title="Editar aluno"
                      >
                        <GrEdit className="text-lg opacity-70 hover:opacity-100 hover:text-yellow transition-colors" />
                      </button>
                      <button 
                        onClick={() => onDelete(student)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        aria-label={`Excluir aluno ${student.nome}`}
                        title="Excluir aluno"
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