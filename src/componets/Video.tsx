interface VideoProps {
  id?: number
  title?: string;
  src?: string;
  thumbnail?: string;
  onClose: () => void;
}


export function Video(props: VideoProps) {

  return (
    <div
    className="fixed w-full md:w-[87.5rem] ml:w-[87.5rem] h-[22.5rem] max-h-[33.5rem] md:h-[33.5rem] lg:h-[33.5rem] overflow-hidden top-0 z-20  flex items-center justify-center bg-white/90"
    style={{
      // backgroundImage: `url(${props.thumbnail})`,
      backgroundPosition: 'right center',
      backgroundRepeat: 'no-repeat',
    }}
  >
      <button
        onClick={props.onClose}
        className="absolute top-4 right-4 text-[30px] text-black"
        aria-label="Fechar"
      >
        &times;
      </button>
      <div className="flex items-center justify-center w-full h-full md:h-[calc(100%-40px)] ml:md:h-[calc(100%-40px)] md:pt-10 ml:pt-10 box-border bg-white/70">
        <div className="z-10 md:w-1/2  ml:w-1/2 md:h-full ml:h-full">
          {/* <video className="w-full h-[calc(100%-88px)]" controls>
            <source src={props.src} type="video/mp4" />
          </video> */}
          <div className="w-full md:h-[calc(100%-88px)] ml:h-[calc(100%-88px)]">
            <iframe 
              width="100%"
              height="100%" 
              src={props.src} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
            </iframe>
          </div>

          <div className="w-full bg-primary1" >
            <div className="ml-[29px]">
              <p className="pt-[15px] text-primary2">{props.title}</p>
              <p className="text-white pb-[25px]">Outros detalhes do video</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};


