import { useState } from "react";
import { Navbar } from "../components/nav/Navbar";
import { Footer } from "../components/footer/Footer";
import { CourseDetails } from "../components/Cursos/CurseDetails";
import { Resource } from "../components/resourse/Resource";
import { CardVideoType } from "../components/Cursos/CardVideo";

interface Aula {
  id: number;
  titulo: string;
  duracaoEstimada: number;
  linkConteudo: string;
  moduloId: number;
  ordem: number;
  tipo: string;
  imagemCapa?: string;
}

interface Modulo {
  id: number;
  titulo: string;
  aulas: Aula[];
}

const modulosData: Modulo[] = [
  {
    id: 1,
    titulo: "Introducción",
    aulas: [
      {
        id: 1,
        titulo: "Bienvenida",
        duracaoEstimada: 10,
        linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        moduloId: 1,
        ordem: 1,
        tipo: "video",
        imagemCapa: "/default-image.jpg",
      },
    ],
  },
  {
    id: 2,
    titulo: "Frontend con React",
    aulas: [
      {
        id: 2,
        titulo: "JSX y componentes",
        duracaoEstimada: 15,
        linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        moduloId: 2,
        ordem: 1,
        tipo: "video",
        imagemCapa: "/default-image.jpg",
      },
    ],
  },
  {
    id: 3,
    titulo: "Backend con Node.js",
    aulas: [
      {
        id: 3,
        titulo: "Express básico",
        duracaoEstimada: 20,
        linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        moduloId: 3,
        ordem: 1,
        tipo: "video",
        imagemCapa: "/default-image.jpg",
      },
    ],
  },
  {
    id: 4,
    titulo: "Bases de datos",
    aulas: [
      {
        id: 4,
        titulo: "Conexión a MongoDB",
        duracaoEstimada: 25,
        linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        moduloId: 4,
        ordem: 1,
        tipo: "video",
        imagemCapa: "/default-image.jpg",
      },
    ],
  },
  {
    id: 5,
    titulo: "Proyecto Final",
    aulas: [
      {
        id: 5,
        titulo: "Preparación del entorno",
        duracaoEstimada: 30,
        linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        moduloId: 5,
        ordem: 1,
        tipo: "video",
        imagemCapa: "/default-image.jpg",
      },
    ],
  },
];

export function LessonsPage() {
  const [selectedVideo, setSelectedVideo] = useState<CardVideoType | null>(null);

  const handleVideoSelect = (video: CardVideoType) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const moduloFiltrado = selectedVideo
    ? modulosData.find((modulo) =>
        modulo.aulas.some((aula) => aula.id === selectedVideo.id)
      )
    : null;

  return (
    <div className="w-full mx-auto min-h-screen relative"><nav className="sticky z-30 top-0 h-[3.375rem] md:h-[5.75rem] flex items-center justify-center " style={{ backgroundColor: "#F8F5F5" }}>
          <Navbar />
        </nav>
      <div className="w-[95%] mx-auto">
        

        <CourseDetails
          curso={{
            nombre: "Curso FullStack con React + Node",
            descripcion: "Aprende a construir aplicaciones completas desde cero usando tecnologías modernas.",
            horasTotales: 60,
          }}
          modulos={modulosData.map((modulo) => ({
            id: modulo.id,
            titulo: modulo.titulo,
          }))}
        />

        {/* Mostrar todos los módulos */}
        {modulosData.map((modulo, index) => (
          <section
            key={modulo.id}
            id={`modulo-${modulo.id}`}
            className="mb-6 border-[3px] mt-[2rem] border-primary2 rounded-2xl p-4 bg-white shadow-sm transition-all duration-700 ease-in-out"
          >
            <h3 className="text-xl font-bold text-primary1 mb-4">
              {index + 1}. {modulo.titulo}
            </h3>
            <div className="space-y-4">
              {modulo.aulas.map((aula) => (
                <div key={aula.id} className="w-full">
                  <Resource resource={aula} onVideoSelect={handleVideoSelect} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Modal a pantalla completa */}
        {moduloFiltrado && selectedVideo && (
          <>
            {/* Fondo oscuro para bloquear clics */}
            <div className="fixed inset-0 z-40 bg-black bg-opacity-80 pointer-events-auto" />
            {/* Contenido modal */}
            <div className="fixed inset-0 z-50 flex justify-center items-start overflow-auto">
              <div className="w-full bg-white min-h-screen p-0 text-black">
                <div className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 border-b border-gray-300">
                  <h2 className="text-xl font-bold">{selectedVideo.titulo}</h2>
                  <button
                    onClick={closeVideo}
                    className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-500 transition"
                  >
                    Cerrar
                  </button>
                </div>

                <iframe
                  src={`${selectedVideo.linkConteudo}?controls=1`}
                  width="100%"
                  height="500"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={selectedVideo.titulo}
                  className="mb-0"
                />

                <section
                  key={moduloFiltrado.id}
                  className="p-6 bg-white"
                >
                  <h3 className="text-xl font-bold text-primary1 mb-4">
                    {moduloFiltrado.titulo}
                  </h3>
                  <div className="space-y-4">
                    {moduloFiltrado.aulas.map((aula) => (
                      <Resource
                        key={aula.id}
                        resource={aula}
                        onVideoSelect={handleVideoSelect}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
        )}

        <footer className="h-[5.375rem] md:h-[7.75rem]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}