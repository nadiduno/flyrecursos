import { useEffect, useState } from "react";

interface VideoProps {
  id?: number
  title?: string;
  src?: string;
  thumbnail?: string;
  onClose: any;
}


export function Video(props: VideoProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed w-full h-[25rem] max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] top-0 left-0 z-[999]"
      style={{
        background: `url(${props.thumbnail}) right center no-repeat, white`,
        opacity: 1,
        top: scrolled ? "0px" : "85px"
      }}
    >
      <button
        onClick={props.onClose}
        className="z-[11] absolute top-4 right-4 text-[30px] text-black"
        aria-label="Fechar"
      >
        &times;
      </button>
      <div className="relative z-[10] flex items-center justify-center w-full h-[calc(100%-40px)] pt-10 box-border bg-white"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}
      
      >
        <div className="z-10 w-1/2 h-full">
          {/* <video className="w-full h-[calc(100%-88px)]" controls>
            <source src={props.src} type="video/mp4" />
          </video> */}
          <div className="w-full h-[calc(100%-88px)]">
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


