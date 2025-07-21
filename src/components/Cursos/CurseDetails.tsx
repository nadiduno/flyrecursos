import { CursoInfo } from "../../types/interface";

interface Props {
  curso: CursoInfo;
}

export function CourseDetails({ curso }: Props) {
  return (
    <div className="rounded-2xl p-[0.25rem] md:p-[3rem] z-20 h-fit w-full md:max-w-[620px] text-xs bg-white m-4 bg-opacity-70">
      <h2 className="p-6 md:p-0 md:font-bold lg:font-bold text-black md:text-2xl lg:text-3xl md:pb-8">
        {curso.titulo}
      </h2>
      <p className="hidden md:block text-sm leading-relaxed text-gray-800 md:text-[17px] mt-3">
        {curso.descricao}
      </p>
      <p className="hidden md:block text-sm leading-relaxed text-gray-800 md:text-[16px] mt-2">
        ⏳ <strong>Duración total:</strong> {curso.horasTotales} horas
      </p>
    </div>
  );
}
