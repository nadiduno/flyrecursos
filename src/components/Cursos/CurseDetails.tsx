interface CursoInfo {
  nombre: string;
  descripcion: string;
  horasTotales: number;
}

interface Modulo {
  id: number;
  titulo: string;
}

interface Props {
  curso: CursoInfo;
  modulos: Modulo[];
}

export function CourseDetails({ curso, modulos }: Props) {
  return (
    <section className="rounded-2xl p-4 bg-white text-black shadow-lg mb-6 border-primary2 border-[3px] transition-all hover:shadow-2xl scroll-smooth">
      {/* Detalles del Curso */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-primary1">{curso.nombre}</h2>
        <p className="text-gray-700 text-lg mt-2">{curso.descripcion}</p>
        <p className="text-sm mt-1 text-primary2 font-semibold">
          ⏳ Duración total: {curso.horasTotales} horas
        </p>
      </div>

      {/* Lista de Módulos con links */}
      <div>
        <h3 className="text-xl font-bold text-primary2 mb-2">📦 Módulos del curso</h3>
        <ul className="list-none list-inside space-y-2">
          {modulos.map((modulo, index) => (
            <li key={modulo.id}>
              <a
                href={`#modulo-${modulo.id}`}
                className="block bg-gray-100 p-3 rounded-md text-black hover:bg-primary1 hover:text-white transition duration-300"
              >
                {index + 1}. {modulo.titulo}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}