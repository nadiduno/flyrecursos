import { memo, useMemo } from "react";
import { useCursoActivo } from "../../utils/useCursoAtivo";
import { ModuloAulas } from "./ModuloConAulas";
import { Aula } from "../../../src/types/interface";

// componente que muestra Una lista de secciones (módulos), cada una con sus aulas. Los colores de fondo alternan para mejorar la legibilidad, y al hacer clic en una aula, se dispara una acción (como reproducir un video o mostrar detalles).

interface ResourceProps {
  onVideoSelect: (video: Aula) => void;
}

const ResourceComponent = ({ onVideoSelect }: ResourceProps) => {
  const { curso } = useCursoActivo();
const modulos = useMemo(() => curso?.modulos || [], [curso]);

  return (
    <div className="w-full ">
      {modulos.map((modulo, index) => (
       <section
  key={modulo.id}
  id={`modulo${modulo.id}`} 
  className={`${
    index % 2 === 0 ? "bg-secondary2 text-black" : "bg-primary1 text-white"
  } p-4 rounded-2xl mb-6`}
>
  <ModuloAulas
    modulo={modulo}
    index={index}
    onVideoSelect={onVideoSelect}
  />
</section>

      ))}
    </div>
  );
};

export const Resource = memo(ResourceComponent);
