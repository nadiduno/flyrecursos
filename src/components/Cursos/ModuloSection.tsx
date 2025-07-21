import React from 'react';
import { Resource } from '../resourse/Resource';
import { CardVideoType } from '../Cursos/CardVideo'; 
import { Aula } from '../../types/interfaceApi'; 

interface ModuloSectionProps {
  moduloId: number;
  moduloTitulo: string;
  aulas: Aula[];
  onVideoSelect: (video: CardVideoType) => void;
  isOdd: boolean;
}

export const ModuloSection: React.FC<ModuloSectionProps> = ({
  moduloId,
  moduloTitulo,
  aulas,
  onVideoSelect,
  isOdd,
}) => {
  const sectionId = moduloTitulo.toLowerCase().replace(/ /g, "-") + `-${moduloId}`;
  const bgColorClass = isOdd ? "odd:bg-primary1 text-white" : "bg-white text-primary2";

  return (
    <section
      key={moduloId}
      id={sectionId}
      className={`md:py-1 border-t-[3px] border-primary2 ${bgColorClass} transition-all duration-300 hover:shadow-lg mt-[0.25rem] md:mt-[1rem] mb-[1rem] md:mb-[1.5rem] rounded-2xl`}
    >
      <h2 className={`text-2xl font-bold p-4 ${isOdd ? 'text-white' : 'text-primary2'}`}>
        {moduloTitulo}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {aulas.length > 0 ? (
          aulas.map((aula) => (
            <Resource
              key={aula.id}
              resource={{
                id: aula.id,
                titulo: aula.titulo,
                duracaoEstimada: aula.duracaoEstimada,
                linkConteudo: aula.linkConteudo,
                moduloId: aula.moduloId,
                ordem: aula.ordem,
                tipo: aula.tipo,
                urlCapa: aula.urlCapa, 
              }}
              onVideoSelect={onVideoSelect}
            />
          ))
        ) : (
          <p className={isOdd ? 'text-white' : 'text-primary2'}>Nenhuma aula encontrada para este módulo.</p>
        )}
      </div>
    </section>
  );
};