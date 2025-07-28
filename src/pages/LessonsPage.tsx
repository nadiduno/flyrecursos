import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import { HeaderMain } from "../components/nav/HeaderLessonPage";
import { Navbar } from "../components/nav/Navbar";
import { Resource } from "../components/resourse/Resource";
import { CardVideoType } from "../components/Cursos/CardVideo";
import { useCursoActivo } from "../utils/useCursoAtivo";

export default function LessonsPage() {
  const [selectedVideo, setSelectedVideo] = useState<CardVideoType | null>(null);
  const { curso, loading, error } = useCursoActivo();

  const handleVideoSelect = (video: CardVideoType) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full mx-auto min-h-screen scroll-smooth bg-white">
      <div className="w-[95%] mx-auto">
        {/* Navbar */}
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <Navbar />
        </nav>

        {/* Header */}
        <header className="bg-white border-b-[3px] border-primary2 sticky top-0 z-20 rounded-2xl">
          <HeaderMain selectedVideo={selectedVideo} onCloseVideo={closeVideo} />
        </header>

        {/* Mensajes de carga y error */}
        {loading && (
          <p className="text-gray-500 text-center my-4">Carregando curso...</p>
        )}
        {error && (
          <p className="text-red-600 text-center my-4">
            Erro ao carregar curso: {error}
          </p>
        )}

    {curso && <Resource onVideoSelect={handleVideoSelect} />}


        {/* Footer */}
        <footer className="mt-12">
          <Footer />
        </footer>
      </div>
    </div>
  );
}