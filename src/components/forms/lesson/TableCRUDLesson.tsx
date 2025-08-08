import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowData } from "./Lesson";
import { useEffect, useState } from "react";
import { get } from "../../../services/api";
import { Table, Column, Row, Cell, TableHeader, TableBody } from 'react-aria-components';

interface Modulo {
  id: number;
  titulo: string;
}

interface TableCRUDLessonProps {
  lessons: TableRowData[];
  loading: boolean;
  error: string | null;
  onEdit: (lesson: TableRowData) => void;
  onDelete: (lesson: TableRowData) => void;
}

export function TableCRUDLesson({
  onDelete,
  lessons,
  loading,
  error,
  onEdit,
}: TableCRUDLessonProps) {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loadingModulos, setLoadingModulos] = useState(true);

  // Buscar módulos quando o componente montar
  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await get<Modulo[]>("/api/modulos");
        setModulos(response.data || []);
      } catch (err) {
        console.error("Erro ao buscar módulos:", err);
      } finally {
        setLoadingModulos(false);
      }
    };

    fetchModulos();
  }, []);

  // Função para obter o título do módulo pelo ID
  const getModuloTitulo = (moduloId: number) => {
    const modulo = modulos.find((m) => m.id === moduloId);
    return modulo ? modulo.titulo : "Módulo não encontrado";
  };

  // Função para formatar o tipo de aula
  const formatTipoAula = (tipo: string) => {
    switch (tipo) {
      case "VIDEO":
        return "Vídeo";
      case "ARTIGO":
        return "Artigo";
      case "PDF":
        return "PDF";
      default:
        return tipo;
    }
  };

  if (loading || loadingModulos) {
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
          Opa! Não conseguimos carregar as aulas no momento.
          <br />
          Tente novamente mais tarde.
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Container principal para a tabela com o scroll vertical */}
      <Table 
        aria-label="Lista de aulas" 
        className="w-full h-full text-sm table-fixed" // Adicionei h-full e table-fixed
      >
        <TableHeader className="sticky-header border-b border-secondary">
          <Column 
            isRowHeader 
            className="w-[30%] px-2 py-3 text-left font-medium text-yellow bg-primary1"
          >
            Título
          </Column>
          <Column 
            className="w-[15%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
          >
            Tipo
          </Column>
          <Column 
            className="w-[25%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
          >
            Módulo
          </Column>
          <Column 
            className="w-[10%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
          >
            Ordem
          </Column>
          <Column 
            className="w-[10%] px-2 py-3 text-left font-medium text-yellow hidden md:table-cell bg-primary1"
          >
            Duração
          </Column>
          <Column 
            className="w-[10%] px-2 py-3 pr-6 text-right font-medium text-yellow bg-primary1"
          >
            Ações
          </Column>
        </TableHeader>
        
        {/* O TableBody agora é o contêiner com a rolagem vertical. */}
        {/* Adicionei 'flex-1' para que ele ocupe o espaço restante do container pai */}
        {/* E 'overflow-y-auto' para habilitar a rolagem vertical */}
        <TableBody className="divide-y divide-secondary overflow-y-auto flex-1">
          {lessons.length === 0 ? (
            <Row>
              <Cell colSpan={6} className="text-center py-4 text-gray-500">
                Nenhuma aula encontrada.
              </Cell>
            </Row>
          ) : (
            lessons.map((lesson) => (
              <Row key={lesson.id} className="table-row-hover">
                <Cell className="table-cell truncate">
                  {lesson.titulo}
                </Cell>
                <Cell className="hidden md:table-cell">
                  {formatTipoAula(lesson.tipo)}
                </Cell>
                <Cell className="hidden md:table-cell truncate">
                  {getModuloTitulo(lesson.moduloId)}
                </Cell>
                <Cell className="hidden md:table-cell">
                  {lesson.ordem}
                </Cell>
                <Cell className="hidden md:table-cell">
                  {lesson.duracaoEstimada} min
                </Cell>
                <Cell className="table-cell">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(lesson)}
                      className="p-1 focus:outline-none focus:ring-2 focus:ring-yellow rounded"
                      aria-label={`Editar aula ${lesson.titulo}`}
                      title="Editar aula"
                    >
                      <GrEdit className="text-lg opacity-70 hover:opacity-100 hover:text-yellow transition-colors" />
                    </button>
                    <button 
                      onClick={() => onDelete(lesson)}
                      className="p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                      aria-label={`Excluir aula ${lesson.titulo}`}
                      title="Excluir aula"
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
    </>
  );
}