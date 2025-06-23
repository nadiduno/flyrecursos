import { useRef, useState, useEffect, useCallback, memo } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { CardVideo } from "./CardVideo";
import { useAuth } from "../context/AuthContext";
import { get } from "../services/api";

interface CacheData<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos em milissegundos

let aulasCache: CacheData<Aula[]> | null = null;
let modulosCache: CacheData<{ [key: number]: string }> | null = null;
let fetchPromise: Promise<void> | null = null;

const clearStaleCache = () => {
  const now = Date.now();
  if (aulasCache && now - aulasCache.timestamp > CACHE_DURATION) {
    aulasCache = null;
  }
  if (modulosCache && now - modulosCache.timestamp > CACHE_DURATION) {
    modulosCache = null;
  }
};

interface Aula {
  id: number;
  duracaoEstimada: number;
  linkConteudo: string;
  moduloId: number;
  ordem: number;
  tipo: string;
  titulo: string;
  urlCapa?: string;
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
  resource: Aula;
  onVideoSelect: (video: Aula) => void;
}

// Função de comparação personalizada para o React.memo
const arePropsEqual = (prevProps: ResourceProps, nextProps: ResourceProps) => {
  return (
    prevProps.resource.id === nextProps.resource.id &&
    prevProps.onVideoSelect === nextProps.onVideoSelect
  );
};

const ResourceComponent = ({ resource, onVideoSelect }: ResourceProps) => {
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

  const fetchAllResources = useCallback(async () => {
    clearStaleCache();

    // Se já temos cache válido, usa ele
    if (aulasCache && modulosCache) {
      setAulas(aulasCache.data);
      setModulos(modulosCache.data);
      setLoading(false);
      return;
    }

    // Se já existe uma requisição em andamento, aguarda ela
    if (fetchPromise) {
      await fetchPromise;
      return;
    }

    setLoading(true);
    setError(null);

    // if (!isAuthenticated) {
    //   setError("Você precisa estar logado para acessar o conteúdo.");
    //   setLoading(false);
    //   return;
    // }

    try {
      fetchPromise = Promise.all([
        get<Aula[]>("/api/aulas"),
        get<ModuloResponse>("/api/modulos"),
      ]).then(([aulasResponse, modulosResponse]) => {
        if (aulasResponse.status >= 200 && aulasResponse.status < 300) {
          const now = Date.now();
          aulasCache = { data: aulasResponse.data, timestamp: now };

          const modulosData = modulosResponse.data.content;
          const modulosObj = modulosData.reduce((acc, modulo) => {
            acc[modulo.id] = modulo.titulo;
            return acc;
          }, {} as { [key: number]: string });

          modulosCache = { data: modulosObj, timestamp: now };

          setAulas(aulasResponse.data);
          setModulos(modulosObj);
        } else {
          throw new Error(
            `Não conseguimos carregar os conteúdos agora. Verifique sua conexão ou recarregue a página.`
          );
        }
      });

      await fetchPromise;
    } catch (err: any) {
      console.error("Erro ao buscar recursos:", err);
      setError(
        err.message ||
          "Não conseguimos carregar os conteúdos agora. Verifique sua conexão ou recarregue a página."
      );
      aulasCache = null;
      modulosCache = null;
    } finally {
      setLoading(false);
      fetchPromise = null;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAllResources();
    console.log("Renderizando Aula")
  }, [fetchAllResources]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const currentScroll = carousel.scrollLeft;
      setScrollAmount(currentScroll);
      setIsAtStart(currentScroll === 0);
      setIsAtEnd(
        currentScroll >= carousel.scrollWidth - carousel.clientWidth - 1
      );
    };

    carousel.addEventListener("scroll", handleScroll);
    handleScroll(); // Verifica estado inicial

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, [aulas]);

  const sliderScrollLeft = useCallback(() => {
    if (carouselRef.current) {
      const newScrollAmount = Math.max(0, scrollAmount - scrollPerClick);
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: "smooth",
      });
    }
  }, [scrollAmount]);

  const slideScrollRight = useCallback(() => {
    if (carouselRef.current) {
      const maxScroll =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newScrollAmount = Math.min(
        maxScroll,
        scrollAmount + scrollPerClick
      );
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: "smooth",
      });
    }
  }, [scrollAmount]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px] w-full bg-white rounded-2xl mx-auto my-3">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-prinary2 pt-2">Preparando o conteúdo pra você...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[250px] w-full bg-white rounded-2xl mx-auto my-3 text-secondary3">
        <div className="text-lg font-semibold">
          Opa! Não conseguimos carregar as aulas no momento.
          <br />
          Tente novamente mais tarde.
        </div>
      </div>
    );
  }

  if (aulas.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] w-full bg-white rounded-2xl mx-auto my-3 text-secondary3">
        <div className="text-lg font-semibold">
          Ainda não temos aulas disponíveis por aqui.
          <br />
          Fique de olho, novidades estão chegando!
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] relative mx-auto rounded-2xl">
      <h2 className="text-2xl pt-[0.5rem] md:px-1 md:text-3xl">
        {resource.titulo}
      </h2>
      <div
        ref={carouselRef}
        className="h-[250px] w-full overflow-hidden whitespace-nowrap flex items-center scroll-smooth"
      >
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="transition-all duration-300 hover:shadow-lg text-primary2 relative cursor-pointer"
            onClick={() => onVideoSelect(aula)}
          >
            <div className="relative cursor-pointer hover:scale-[1.4] transition-transform duration-500 hover:z-10">
              <CardVideo cardVideo={aula} />
              <div className="absolute inset-0 flex flex-col items-center justify-end text-sm text-primary2 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="mt-2 text-center">{aula.titulo}</div>
                {modulos[aula.moduloId] && (
                  <div className="text-xs text-secondary3">
                    {modulos[aula.moduloId]}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={sliderScrollLeft}
        className={`absolute left-[-5%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${
          isAtStart ? "hidden" : ""
        } md:left-[-50px] ml:left-[-50px]`}
        disabled={isAtStart}
      >
        <GoChevronLeft size={24} />
      </button>
      <button
        onClick={slideScrollRight}
        className={`absolute right-[-5%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${
          isAtEnd ? "hidden" : ""
        } md:right-[-50px] ml:right-[-50px]`}
        disabled={isAtEnd}
      >
        <GoChevronRight size={24} />
      </button>
    </div>
  );
};

// Componente memoizado com comparação personalizada
export const Resource = memo(ResourceComponent, arePropsEqual);
