import { Footer } from "../components/footer/Footer";
import { HeaderMain, menuItems as headerMenuItems } from "../components/nav/HeaderMain";
import { Navbar } from "../components/nav/Navbar";
import { Resource } from "../components/resourse/Resource";
import { CardVideoType } from "../components/Cursos/CardVideo";
import { useState } from "react";

interface Aula {
  id: number;
  titulo: string;
  duracaoEstimada: number;
  linkConteudo: string;
  moduloId: number;
  ordem: number;
  tipo: string;
  imagemCapa?: string;
  modulo?: string;
}

const resourcesData: Aula[] = [
  {
    id: 1,
    titulo: "Modulo Inicial",
    duracaoEstimada: 30,
    linkConteudo: "#",
    moduloId: 1,
    ordem: 1,
    tipo: "video",
    imagemCapa: "/default-image.jpg",
  },
];

export function LessonsPage() {
  const [selectedVideo, setSelectedVideo] = useState<CardVideoType | null>(
    null
  );

  const handleVideoSelect = (video: CardVideoType) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full mx-auto min-h-screen">
      <div className="w-[95%] mx-auto">
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <Navbar />
        </nav>
        <header className="bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20 rounded-2xl">
          <HeaderMain selectedVideo={selectedVideo} onCloseVideo={closeVideo} />
        </header>
        {headerMenuItems.map((item, index) => {
          const sectionId = item.label.toLowerCase().replace(/ /g, "-");
          let sectionContent = null;
          if (sectionId === "modulo") {
            sectionContent = (
              <Resource
                key={1}
                resource={resourcesData[0]}
                onVideoSelect={handleVideoSelect}
              />
            );
          }

          return (
            <section
              key={index}
              id={sectionId}
              className={`md:py-1 border-t-[3px] border-primary2 ${
                index % 2 === 0 ? "bg-white" : "odd:bg-primary1 text-white"
              } transition-all duration-300 hover:shadow-lg text-primary2 mt-[0.25rem] md:mt-[1rem] mb-[1rem] md:mb-[1.5rem] rounded-2xl`}
            >
              {sectionContent}
            </section>
          );
        })}

        <footer className="h-[5.375rem] md:h-[7.75rem]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
