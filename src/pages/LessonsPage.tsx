import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import {
  HeaderMain,
} from "../components/nav/HeaderLessonPage";
import { Navbar } from "../components/nav/Navbar";
import { Resource } from "../components/resourse/Resource";
import { CardVideoType } from "../components/Cursos/CardVideo";
import {Aula} from "../types/interface";

const resourcesData: Aula[] = [
  {
    id: 1,
    titulo: "Modulo Inicial",
    duracaoEstimada: 30,
    linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    moduloId: 1,
    ordem: 1,
    tipo: "video",
    imagemCapa: "/default-image.jpg",
  },
  {
    id: 2,
    titulo: "Frontend React",
    duracaoEstimada: 20,
    linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    moduloId: 2,
    ordem: 1,
    tipo: "video",
    imagemCapa: "/default-image.jpg",
  },
  {
    id: 3,
    titulo: "Backend Node.js",
    duracaoEstimada: 25,
    linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    moduloId: 3,
    ordem: 1,
    tipo: "video",
    imagemCapa: "/default-image.jpg",
  },
  {
    id: 4,
    titulo: "Bases de Datos",
    duracaoEstimada: 35,
    linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    moduloId: 4,
    ordem: 1,
    tipo: "video",
    imagemCapa: "/default-image.jpg",
  },
  {
    id: 5,
    titulo: "Proyecto Final",
    duracaoEstimada: 40,
    linkConteudo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    moduloId: 5,
    ordem: 1,
    tipo: "video",
    imagemCapa: "/default-image.jpg",
  },
];

export default function LessonsPage() {
  const [selectedVideo, setSelectedVideo] = useState<CardVideoType | null>(null);

  const handleVideoSelect = (video: CardVideoType) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full mx-auto min-h-screen scroll-smooth">
      <div className="w-[95%] mx-auto">
        {/* Navbar */}
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <Navbar />
        </nav>

        {/* Header con video o banner */}
        <header className="bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20 rounded-2xl">
          <HeaderMain selectedVideo={selectedVideo} onCloseVideo={closeVideo} />
        </header>

        {/* Secciones por módulo */}
        {[1, 2, 3, 4, 5].map((moduloId, index) => {
          const moduleAulas = resourcesData.filter(
            (aula) => aula.moduloId === moduloId
          );
          const sectionId = `modulo${moduloId}`;
          return (
            <section
              key={moduloId}
              id={sectionId}
              className={`md:py-1 border-t-[3px] border-primary2 ${
                index % 2 === 0 ? "bg-white" : "bg-primary1 text-white"
              } transition-all duration-300 hover:shadow-lg text-primary2 mt-[0.25rem] md:mt-[1rem] mb-[1rem] md:mb-[1.5rem] rounded-2xl`}
            >
              {moduleAulas.map((aula) => (
                <Resource
                  key={aula.id}
                  resource={aula}
                  onVideoSelect={handleVideoSelect}
                />
              ))}
            </section>
          );
        })}

        {/* Footer */}
        <footer className="h-[5.375rem] md:h-[7.75rem]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}