import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { get} from "../services/api";
import { AxiosResponse } from 'axios';

interface Curso {
  id: number;
  autorId: number;
  titulo: string;
  descricao: string;
  imagemCapa: string;
  nivel: string;
  tags: string[];
}

interface ApiResponse {
  content: Curso[];
  pageable: any;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  empty: boolean;
}

export function ExampleAPI() {
  const { isAuthenticated } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
        const fetchCursos = async () => {
            if (isAuthenticated) {
                try {
                    const response: AxiosResponse<ApiResponse> = await get('/api/cursos'); 
            
                    if (response.status >= 200 && response.status < 300) {
                        console.log("Request successful!");
                        console.log(response.data);
                        setCursos(response.data.content);
                        setError("");
                    }
                    else{
                        setError(
                            `Erro ao buscar cursos: ${
                            response.status && response.statusText
                            }`
                        );
                        setCursos([]);
                        return;
                    }
                }  catch (error: any) {
                    console.error("Erro ao buscar cursos:", error);
                    setError(error.message || "Erro ao buscar cursos.");
                    setCursos([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCursos();
    }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Carregando cursos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-lg">{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Cursos</h1>
      {cursos.length > 0 ? (
        <ul>
          {cursos.map((curso) => (
            <React.Fragment key={curso.id}>
              <li className="bg-primary2 rounded-md shadow-sm p-4 hover:shadow-md transition-shadow mt-3">
                Curso: {curso.titulo}
              </li>
              <li>Descripção: {curso.descricao}</li>
              <li>
                <img src={curso.imagemCapa} alt="" />
              </li>
              <li>Tag: {curso.tags.map((tag) => `#${tag}`).join(" ")}</li>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p>Nenhum curso encontrado.</p>
      )}
    </div>
  );
}
