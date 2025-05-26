// import React from "react";
import { useRef, useState, useEffect } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { CardVideo} from "./CardVideo";
import { useAuth } from "../context/AuthContext";
import { get } from "../services/api";
import { AxiosResponse } from "axios";


interface Aula {
    id: number;
    duracaoEstimada: number;
    linkConteudo: string;
    moduloId: number;
    ordem: number;
    tipo: string;
    titulo: string;
    imagemCapa?: string;
    modulo?: string;
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


interface ResourceProps {
    resource:  Aula;
    onVideoSelect: (video: Aula) => void; // Use a interface Aula para o vídeo selecionado
}

export function Resource({ resource, onVideoSelect }: ResourceProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [scrollAmount, setScrollAmount] = useState<number>(0);
    const [isAtStart, setIsAtStart] = useState<boolean>(true);
    const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
    const { isAuthenticated } = useAuth();
    const [aulas, setAulas] = useState<Aula[]>([]);
    const [modulos, setModulos] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const scrollPerClick = 400;

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


    useEffect(() => {
        const handleScroll = () => {
            if (carouselRef.current) {
                const currentScroll = carouselRef.current.scrollLeft;
                setScrollAmount(currentScroll);
                setIsAtStart(currentScroll === 0);
                setIsAtEnd(currentScroll >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 1);
            }
        };

        if (carouselRef.current) {
            carouselRef.current.addEventListener('scroll', handleScroll);
            handleScroll(); // Verificar a posição inicial
        }

        return () => {
            if (carouselRef.current) {
                carouselRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [aulas]); // Recalcula a visibilidade dos botões quando as aulas são carregadas

    const sliderScrollLeft = () => {
        if (carouselRef.current) {
            const newScrollAmount = Math.max(0, scrollAmount - scrollPerClick);
            carouselRef.current.scrollTo({
                top: 0,
                left: newScrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const slideScrollRight = () => {
        if (carouselRef.current) {
            const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
            const newScrollAmount = Math.min(maxScroll, scrollAmount + scrollPerClick);
            carouselRef.current.scrollTo({
                top: 0,
                left: newScrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (loading) {
        return <div className="m-3 p-3 text-gray-400 my-[1.5rem] bg-primary1 rounded-2xl">Carregando recursos...</div>;
    }

    if (error) {
        return <div className="m-3 p-3 text-gray-400 my-[1rem] bg-primary1 rounded-2xl">Erro ao carregar recursos: {error}</div>;
    }

    return (
        <div className="w-[90%] relative mx-auto rounded-2xl">
            <h2 className="text-3xl pt-[0.5rem] md:px-1 md:text-4xl ">
                {/* {resource.title} */}
                {resource.titulo}
            </h2>
            <div
                ref={carouselRef}
                className="h-[250px] w-full overflow-hidden whitespace-nowrap flex items-center scroll-smooth"
            >
                {aulas.map((aula) => (
                    <div
                        key={aula.id}
                        className={`transition-all duration-300 hover:shadow-lg text-primary2 relative cursor-pointer`}
                        onClick={() => onVideoSelect(aula)} // Passe o objeto Aula para onVideoSelect
                    >
                        <div className="relative cursor-pointer hover:scale-[1.4] transition-transform duration-500 hover:z-10">
                            <CardVideo key={aula.id} cardVideo={aula} />
                            <div className="absolute inset-0 flex flex-col items-center justify-end text-white opacity-0 hover:opacity-100 transition-opacity duration-700">
                                <div className="mt-2 text-center">
                                    {aula.titulo} do {modulos[aula.moduloId]}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={sliderScrollLeft}
                className={`absolute left-[-5%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${isAtStart ? 'hidden' : ''} md:left-[-50px] ml:left-[-50px]`}
                disabled={isAtStart}
            >
                <GoChevronLeft size={24} />
            </button>
            <button
                onClick={slideScrollRight}
                className={`absolute right-[-5%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${isAtEnd ? 'hidden' : ''} md:right-[-50px] ml:right-[-50px]`}
                disabled={isAtEnd}
            >
                <GoChevronRight size={24} />
            </button>
        </div>
    );
}