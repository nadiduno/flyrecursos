import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useAulasPorModulo } from "../../utils/useAulasPorModulo";
import { CardVideo } from "../Cursos/CardVideo";
import { Aula } from "../../types/interface";

interface ModuloAulasProps {
  modulo: { id: number; titulo: string };
  index: number;
  onVideoSelect: (video: Aula) => void;
}

export const ModuloAulas = ({ modulo, onVideoSelect }: ModuloAulasProps) => {
  const { aulas, loading, error } = useAulasPorModulo(modulo.id);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollPerClick = 400;

  return (
    <div className="w-[90%] mx-auto my-4 rounded-2xl relative">
      <h2 className="text-xl font-bold mb-4">{modulo.titulo}</h2>

      {loading && <p className="text-gray-500 text-center">Carregando aulas...</p>}
      {error && <p className="text-red-600 text-center">Erro ao carregar aulas: {error}</p>}

      <div
  ref={carouselRef}
  className="h-full md:h-[250px] w-full overflow-x-hidden whitespace-nowrap flex items-start scroll-smooth pb-1"
>

        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="w-[300px] w-[18%] mx-2 mr-4 cursor-pointer group"
            onClick={() => onVideoSelect(aula)}
          >
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardVideo cardVideo={aula} />
            </div>
            <p className="mt-2 text-sm text-center font-medium group-hover:text-primary1 transition-colors duration-300">
              {aula.titulo}
            </p>
          </div>
        ))}
      </div>

      {/* Flechas de scroll */}
      <button
        onClick={() => carouselRef.current?.scrollBy({ left: -scrollPerClick, behavior: "smooth" })}
        className="absolute left-[-5%] top-[50%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 md:left-[-50px]"
      >
        <GoChevronLeft size={24} />
      </button>
      <button
        onClick={() => carouselRef.current?.scrollBy({ left: scrollPerClick, behavior: "smooth" })}
        className="absolute right-[-5%] top-[50%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 md:right-[-50px]"
      >
        <GoChevronRight size={24} />
      </button>
    </div>
  );
};
