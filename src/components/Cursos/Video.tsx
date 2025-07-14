import { useEffect, useState } from "react";

interface VideoProps {
  id?: number;
  title?: string;
  src?: string;
  thumbnail?: string;
  imageUrlLarge?: string;
  onClose: () => void;
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
      className="w-full h-[17rem] max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] top-0 z-20  flex items-center justify-center"
      style={{
        backgroundImage: `url(${props.thumbnail})`,
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        opacity: 1,
        top: scrolled ? "0px" : "85px",
      }}
    >
      <button
        onClick={props.onClose}
        className="z-[11] absolute top-4 right-4 text-[30px] text-black opacity-50 hover:opacity-100 transition-all duration-300"
        aria-label="Fechar video"
        title="Fechar video"
      >
        &times;
      </button>

      <div className="z-10 w-full h-full">
        <div className="flex items-center justify-center w-full h-full md:h-full ml:h-full box-border bg-white/70">
          <div className="z-10 md:w-[80%]  ml:w-[80%] md:h-full ml:h-full">
            <div className="w-full md:h-[calc(100%-4.5rem)] ml:h-[calc(100%-4.5rem)]">
              <iframe
                width="100%"
                height="100%"
                src={props.src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="w-full h-full bg-primary1">
              <div className="ml-[1.25rem] md:ml-[2rem] ml:ml-[2rem]">
                <p className="pt-[0.5rem] md:pt-[1rem] ml:pt-[1rem] text-white text-xl">
                  {props.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
