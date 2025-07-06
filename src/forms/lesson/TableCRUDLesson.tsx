import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableRowData } from "./Lesson";
import { useEffect, useState } from "react";
import { get } from "../../services/api";

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
        const response = await get<{ content: Modulo[] }>("/api/modulos");
        setModulos(response.data.content || []);
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
    const modulo = modulos.find(m => m.id === moduloId);
    return modulo ? modulo.titulo : "Módulo não encontrado";
  };

  if (loading || loadingModulos) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-yellow py-5">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white pt-2">Preparando o conteúdo pra você...</span>
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
              Título
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              Tipo
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              Módulo
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              Ordem
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              Duração (min)
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-s lg:text-s">
          {lessons.length === 0 ? (
            <tr>
              <td colSpan={6} className="flex text-center py-4 text-gray-500">
                Nenhuma aula encontrada.
              </td>
            </tr>
          ) : (
            lessons.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap py-2">{row.titulo}</td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">
                  {row.tipo === "VIDEO" ? "Vídeo" : 
                   row.tipo === "ARTIGO" ? "Artigo" : 
                   row.tipo === "PDF" ? "PDF" : row.tipo}
                </td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">
                  {getModuloTitulo(row.moduloId)}
                </td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">
                  {row.ordem}
                </td>
                <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">
                  {row.duracaoEstimada}
                </td>
                <td className="whitespace-nowrap text-right flex flex-row gap-4 py-2 px-2 justify-end">
                  <button onClick={() => onEdit(row)}>
                    <GrEdit
                      size={18}
                      className="opacity-90 hover:opacity-100 hover:text-yellow cursor-pointer transition-transform duration-500"
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