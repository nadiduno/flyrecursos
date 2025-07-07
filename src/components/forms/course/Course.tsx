import { CiSearch } from "react-icons/ci";
import { TableCRUDCourse } from "./TableCRUDCourse";
import { CreateCourse } from "./CreateCourse";
import { useState, useEffect } from "react";
import { ButtonFly } from "../../botoes/ButtonFly";
import { CgAdd } from "react-icons/cg";
import { get } from "../../../services/api";
import { EditCourse } from "./EditCourse";
import { DeleteCourse } from "./DeleteCourse";

interface Modulo {
  id: number;
  titulo: string;
  ordem?: number;
}

interface Autor {
  id: number;
  nome: string;
  email: string;
}

interface CursoFromAPI {
  id: number;
  titulo: string;
  dataPublicacao: string;
  autor: Autor;
  modulos: Modulo[];
}

export interface TableRowDataCourse {
  id: number;
  titulo: string;
  modulos: Modulo[];
  modulosTitulos?: string[];
  autorNome: string;
}

export function Course() {
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] =
    useState<TableRowDataCourse | null>(null);
  const [coursesData, setCoursesData] = useState<TableRowDataCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<TableRowDataCourse[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCreateCourse = (): void => {
    setShowCreateCourse(true);
  };

  // Eliminar
  const handleDelete = (course: TableRowDataCourse): void => {
    setSelectedCourse(course);
    setShowDeleteCourse(true);
  };

  const handleDeleteSuccess = () => {
    fetchCourses(); // Recarrega a lista de cursos
    setShowDeleteCourse(false);
    setSelectedCourse(null);
  };

   // Ler data API - cursos
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<{ content: CursoFromAPI[] }>("/api/cursos");
      const fetchedData = response.data.content || [];
      // console.log("Resposta do backend:", fetchedData);
      const transformedData = fetchedData.map((curso) => ({
        id: curso.id,
        titulo: curso.titulo,
        modulos: curso.modulos,
        autorNome: curso.autor.nome,
      }));

      setCoursesData(transformedData);
      setFilteredCourses(transformedData);
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      setError("Não foi possível carregar os dados dos cursos.");
      setCoursesData([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Buscar Cursos
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(coursesData);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = coursesData.filter((course) =>
        course.titulo.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredCourses(results);
    }
  };

  useEffect(() => {
    handleSearch(); // Chama a buscar quando se digita
  }, [searchTerm, coursesData]);

  // Editar
  const handleEditSuccess = () => {
    fetchCourses();
    setShowEditCourse(false);
    setSelectedCourse(null);
  };

  const handleEditCourse = (course: TableRowDataCourse): void => {
    setSelectedCourse(course);
    setShowEditCourse(true);
  };

  return (
    <div className="w-full flex-row text-xs my-3 p-1 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Curso</p>
          <div className="flex-shrink-1">
            <ButtonFly
              text="Criar Curso"
              onClick={handleCreateCourse}
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
            placeholder="Digite o título do curso para consultar"
            className="w-[14rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] lg:w-[20rem] lg:h-[2.5rem] rounded-[4rem] rounded-br-none border-whitebg-white p-3 text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <CiSearch
            size={28}
            className=" opacity-90 hover:opacity-100 cursor-pointer transition-transform duration-500"
            title="Buscar"
            aria-label="Buscar"
          />
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto">
        {error ? (
          <div className="p-4 text-red-600 text-center">{error}</div>
        ) : (
          <TableCRUDCourse
            onEdit={handleEditCourse}
            onDelete={handleDelete}
            courses={filteredCourses}
            loading={loading}
            error={error}
          />
        )}
      </div>

      <div className="">
        {showCreateCourse && (
          <CreateCourse
            isVisible={showCreateCourse}
            setIsVisible={setShowCreateCourse}
            onCourseCreated={fetchCourses}
          />
        )}

        {showEditCourse && selectedCourse && (
          <EditCourse
            isVisible={showEditCourse}
            setIsVisible={setShowEditCourse}
            courseData={selectedCourse}
            onEditSuccess={handleEditSuccess}
          />
        )}

        {showDeleteCourse && selectedCourse && (
          <DeleteCourse
            isVisible={showDeleteCourse}
            setIsVisible={setShowDeleteCourse}
            courseData={selectedCourse}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}
