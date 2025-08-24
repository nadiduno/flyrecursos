import { useCursoActivo } from "../../utils/useCursoAtivo";

interface VideoProps {
  id?: number;
  title?: string;
  src?: string;
  thumbnail?: string;
  imageUrlLarge?: string;
  onClose: () => void;
}

export function Video(props: VideoProps) {
  const videoSrc = props.src || "";
  const isValidVideo = videoSrc.startsWith("https://www.youtube.com/embed/");
  console.log("Video src final:", videoSrc);
  const { error, nomeUsuario } = useCursoActivo();
  return (
    <div
      className="w-full h-[17rem] max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] top-0 z-20 flex items-center justify-center bg-black"
      style={{ opacity: 1 }}
    >
      <button
        onClick={props.onClose}
        className="z-[11] absolute top-4 right-4 text-[30px] text-white opacity-50 hover:opacity-100 transition-all duration-300"
        aria-label="Fechar video"
        title="Fechar video"
      >
        &times;
      </button>

      <div className="z-10 w-full h-full flex items-center justify-center">
        {isValidVideo ? (
          <div className="md:w-[80%] h-full">
            <div className="w-full md:h-[calc(100%-4.5rem)]">
              <iframe
                width="100%"
                height="100%"
                src={videoSrc}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full h-full bg-primary1">
              <div className="ml-[1.25rem] md:ml-[2rem]">
                <p className="pt-[0.5rem] md:pt-[1rem] text-white text-xl">
                  {props.title || "Vídeo"}
                </p>
              </div>
            </div>
          </div>
        ) : (
         <div className="max-w-[80%] text-red-600 bg-red-100 p-4 rounded-xl shadow-md min-w-[90vh]">
    <p className="font-semibold text-xl mb-1">Olá {nomeUsuario}!</p>
    <p>{error ? "Erro ao carregar a aula." : null}</p>
    <p className="max-w-[80%] mt-2 leading-relaxed line-clamp-3">
       Por favor, recarregue a página.
       Se o problema persistir, entre em contato com o suporte técnico pelo email: {" "}
      <a href="mailto:atendimento@flyeducacao.org" className="text-blue-600 underline">
        atendimento@flyeducacao.org
      </a>
    </p>
  </div>
        )}
      </div>
    </div>
  );
}