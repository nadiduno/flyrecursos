import { CiSearch } from "react-icons/ci";
import { TableCRUDLesson } from "./TableCRUDLesson";
import { CreateLesson } from "./CreateLesson";
import { useState, useEffect } from "react";
import { CgAdd } from "react-icons/cg";
import { get } from "../../../services/api";
import { EditLesson } from "./EditLesson";
import { DeleteLesson } from "./DeleteLesson";
import { ButtonFly } from "../../botoes/ButtonFly";


export interface TableRowData {
  id: number;
  titulo: string;
  tipo: string;
  ordem: number;
  duracaoEstimada: number;
  linkConteudo: string;
  moduloId: number;
  moduloTitulo?: string;
  urlCapa?: string;
}

export function Lesson() {
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showEditLesson, setShowEditLesson] = useState(false);
  const [showDeleteLesson, setShowDeleteLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<TableRowData | null>(
    null
  );
  const [lessons, setLessons] = useState<TableRowData[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCreateLesson = (): void => {
    setShowCreateLesson(true);
  };

  // Eliminar
  const handleDelete = (lesson: TableRowData): void => {
    setSelectedLesson(lesson);
    setShowDeleteLesson(true);
  };
  const handleDeleteSuccess = () => {
    fetchLessons(); // Recarrega a lista de aulas
    setShowDeleteLesson(false);
    setSelectedLesson(null);
  };

  // Ler data API - lessons
  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<TableRowData[]>("/api/aulas");
      const fetchedData = response.data
      // console.log("Resposta do backend:", fetchedData);

      setLessons(fetchedData);
      setFilteredLessons(fetchedData);
    } catch (err) {
      console.error("Erro ao buscar aulas:", err);
      setError("Não foi possível carregar os dados dos aulas.");
      setLessons([]);
      setFilteredLessons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  // Buscar aulas
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredLessons(lessons);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = lessons.filter((lesson) =>
        lesson.titulo.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredLessons(results);
    }
  };

  useEffect(() => {
    handleSearch(); // Chama a buscar quando se digita
  }, [searchTerm, lessons]);

  // Editar
  const handleEditSuccess = () => {
    // console.log("Edição bem-sucedida! Recarregando a lista de aulas...");
    fetchLessons();
    setShowEditLesson(false);
    setSelectedLesson(null);
  };

  const handleEditLesson = (lesson: TableRowData): void => {
    // console.log("Iniciando edição para o aula:", lesson.titulo);
    setSelectedLesson(lesson);
    setShowEditLesson(true);
  };

  return (
    <div className="w-full flex-row text-xs my-3 p-1 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Aula</p>
          <div className="flex-shrink-1">
            <ButtonFly
              text="Criar Aula"
              onClick={handleCreateLesson}
              icon={CgAdd}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end h-[3.5rem] md:h-[7rem] lg:h-[7rem] pb-2 md:pb-4 lg:pb-4">
        <div className="flex flex-row items-end gap-1 md:gap-4 lg:gap-4">
          <input
            type="text"
            placeholder="Digite o nome para consultar"
            className="w-[14rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] lg:w-[20rem] lg:h-[2.5rem] rounded-[4rem] rounded-br-none border-whitebg-white p-3 text-black"
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza buscar
            value={searchTerm} // Controla o valor do input
            autoComplete="name"
          />
          <CiSearch
            size={28}
            className=" opacity-90 hover:opacity-100 cursor-pointer transition-transform duration-500"
            title="Buscar"
            aria-label="Buscar"
            // onClick={handleSearch}
          />
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto">
        {error ? (
          <div className="p-4 text-red-600 text-center">{error}</div>
        ) : (
          <TableCRUDLesson
            onEdit={handleEditLesson}
            onDelete={handleDelete}
            lessons={filteredLessons}
            loading={loading}
            error={error}
          />
        )}
      </div>

      <div className="">
        {showCreateLesson && (
          <CreateLesson
            isVisible={showCreateLesson}
            setIsVisible={setShowCreateLesson}
            onLessonCreated={fetchLessons} 
          />
        )}

        {showEditLesson && selectedLesson && (
          <EditLesson
            isVisible={showEditLesson}
            setIsVisible={setShowEditLesson}
            lessonData={selectedLesson}
            onEditSuccess={handleEditSuccess}
          />
        )}

        {showDeleteLesson && selectedLesson && (
          <DeleteLesson
            isVisible={showDeleteLesson}
            setIsVisible={setShowDeleteLesson}
            lessonData={selectedLesson}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}
