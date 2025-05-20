import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { get } from "../services/api";
import { AxiosResponse } from "axios";

import imgDefault from "../assets/imgDefault.png";

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
          const response: AxiosResponse<ApiResponse> = await get("/api/cursos");

          if (response.status >= 200 && response.status < 300) {
            console.log("Request successful!");
            console.log(response.data);
            setCursos(response.data.content);
            setError("");
          } else {
            // Servidor respondió com erro
            setError(
              `Error ao buscar cursos: ${response.status} - ${response.statusText}`
            );
            setCursos([]);
            return;
          }
        } catch (error: any) {
          // Erro na petição
          console.error("Erro ao buscar cursos:", error);
          setError(error.message || "Erro ao buscar cursos.");
          setCursos([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Usuario não autenticado
        setError("Usuario não autenticado");
        setCursos([]);
        setLoading(false);
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
    return <p className="text-red-600 text-lg">Erro ao buscar cursos</p>;
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



interface Aula {
  id: number;
  duracaoEstimada: number;
  linkConteudo: string;
  moduloId: number;
  ordem: number;
  tipo: string;
  titulo: string;
  imagemCapa?: string;
}

interface Modulo {
  id: number;
  titulo: string;
  ordem: number;
  cursoId: number;
}

interface ModuloResponse {
  content: Modulo[];
}

export function ExampleAPIAula() {
  const { isAuthenticated } = useAuth();
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [modulos, setModulos] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAulas = async () => {
      if (isAuthenticated) {
        try {
          const response: AxiosResponse<Aula[]> = await get("/api/aulas");
          const modulosResponse: AxiosResponse<ModuloResponse> = await get(
            "/api/modulos"
          );

          if (response.status >= 200 && response.status < 300) {
            console.log("Request successful!",response.data);
            setAulas(response.data);
            setError("");

            // Extrair nomes dos módulos
            console.log("Modulos",modulosResponse.data.content);
            const modulosData = modulosResponse.data.content;
            const modulosObj: { [key: number]: string } = {};
            modulosData.forEach((modulo) => {
              modulosObj[modulo.id] = modulo.titulo;
            });
            setModulos(modulosObj);

          } else {
            // Servidor respondió com erro
            setError(
              `Error ao buscar aulas: ${response.status} - ${response.statusText}`
            );
            setAulas([]);
            return;
          }
        } catch (error: any) {
          // Erro na petição
          console.error("Erro ao buscar aulas:", error);
          setError(error.message || "Erro ao buscar aulas.");
          setAulas([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Usuario não autenticado
        setError("Usuario não autenticado");
        setAulas([]);
        setLoading(false);
      }
    };

    fetchAulas();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Carregando aulas...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-lg">Erro ao buscar aulas</p>;
  }

  return (
    <div>
      <h1>Lista de Aulas</h1>
      {aulas.length > 0 ? (
        <ul>
          {aulas.map((aula) => (
            <React.Fragment key={aula.id}>
              <li className="bg-primary2 rounded-md shadow-sm p-4 hover:shadow-md transition-shadow mt-3">
                Curso: {aula.titulo}
              </li>
              <li>Aula: {aula.ordem}</li>
              <li>Tipo: {aula.tipo}</li>
              <li>
                <a
                  href={aula.linkConteudo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {aula.linkConteudo}
                </a>
              </li>
              <li>Duração: {aula.duracaoEstimada}</li>
              <li>Módulo: {modulos[aula.moduloId] || 'Nome do Módulo Indisponível'}</li>
              <li>
                <img
                  src={aula.imagemCapa || imgDefault}
                  alt={`Imagen - ${aula.titulo}`}
                />
              </li>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p>Nenhuma aula encontrada.</p>
      )}
    </div>
  );
}
