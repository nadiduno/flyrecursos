import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowDataCourse } from "./Course";
import { Table, Column, Row, Cell, TableHeader, TableBody } from 'react-aria-components';

interface TableCRUDCourseProps {
  courses: TableRowDataCourse[];
  loading: boolean;
  error: string | null;
  onEdit: (course: TableRowDataCourse) => void;
  onDelete: (course: TableRowDataCourse) => void;
}

export function TableCRUDCourse({
  onDelete,
  courses,
  loading,
  error,
  onEdit,
}: TableCRUDCourseProps) {
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
      <>
        <div className="text-lg font-semibold">
          Opa! Não conseguimos carregar os cursos no momento.
          <br />
          Tente novamente mais tarde.
        </div>
      </>
    );
  }

  return (
    <div className="relative h-full overflow-hidden">
      {/* Container principal com altura fixa */}
      <div className="h-[calc(100vh-300px)] overflow-auto">
        <Table 
          aria-label="Lista de cursos" 
          className="w-full border-collapse table-fixed"
        >
          {/* Cabeçalho fixo */}
          <TableHeader className="sticky top-0 z-10 bg-primary1 border-b border-secondary">
            <Column 
              isRowHeader 
              className="w-[25%] min-w-[150px] px-2 py-3 text-left font-medium text-yellow bg-primary1"
            >
              Título
            </Column>
            <Column 
              className="w-[25%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              Módulos
            </Column>
            <Column 
              className="w-[10%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              Duração
            </Column>
            <Column 
              className="w-[15%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              Início
            </Column>
            <Column 
              className="w-[15%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
            >
              Culminação
            </Column>
            <Column 
              className="w-[10%] px-2 py-3 pr-6 text-right font-medium text-yellow bg-primary1"
            >
              Ações
            </Column>
          </TableHeader>
          
          {/* Corpo da tabela */}
          <TableBody className="divide-y divide-secondary">
            {courses.length === 0 ? (
              <Row>
                <Cell colSpan={6} className="text-center py-4 text-gray-500">
                  Nenhum curso encontrado.
                </Cell>
              </Row>
            ) : (
              courses.map((course) => (
                <Row key={course.id} className="hover:bg-primary2/10">
                  {/* Título */}
                  <Cell className="px-2 py-2 truncate">
                    {course.titulo}
                  </Cell>
                  
                  {/* Módulos com scroll interno */}
                  <Cell className="px-2 py-2 hidden md:table-cell">
                    <div className="max-h-[100px] overflow-y-auto thin-scrollbar">
                      {course.modulos?.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {course.modulos.map((modulo) => (
                            <li 
                              key={modulo.id} 
                              className="truncate text-xs leading-tight"
                            >
                              {modulo.titulo}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">Nenhum módulo</span>
                      )}
                    </div>
                  </Cell>
                  
                  {/* Duração */}
                  <Cell className="px-2 py-2 hidden md:table-cell truncate">
                    {course.duracaoFormatada}
                  </Cell>
                  
                  {/* Datas */}
                  <Cell className="px-2 py-2 hidden md:table-cell">
                    {course.dataInicio}
                  </Cell>
                  <Cell className="px-2 py-2 hidden md:table-cell">
                    {course.dataConclusao}
                  </Cell>
                  
                  {/* Ações */}
                  <Cell className="px-2 py-2">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(course)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-yellow rounded"
                        aria-label={`Editar curso ${course.titulo}`}
                        title="Editar curso"
                      >
                        <GrEdit className="text-lg opacity-70 hover:opacity-100 hover:text-yellow transition-colors" />
                      </button>
                      <button 
                        onClick={() => onDelete(course)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        aria-label={`Excluir curso ${course.titulo}`}
                        title="Excluir curso"
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