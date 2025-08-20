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
          <div className="text-white text-center p-4 bg-red-600 rounded-xl shadow-md max-w-md">
            <p className="text-lg font-semibold">Problemas para carregar sua aula</p>
            <p className="text-sm mt-2">
              Por favor, recarregue a página. Se o problema persistir, entre em contato com o suporte técnico.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}