import { useRef, useState, useEffect } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { CardVideo, CardVideoType } from "../components/Cursos/CardVideo";
import { cardVideos } from "./ResourseData";

interface TopTenProps {
  onVideoSelect: (video: CardVideoType) => void; // Recebe a prop onVideoSelect
}

export function TopTen({ onVideoSelect }: TopTenProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState<number>(0);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  const scrollPerClick = 400;

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const currentScroll = carouselRef.current.scrollLeft;
        setScrollAmount(currentScroll);
        setIsAtStart(currentScroll === 0);
        setIsAtEnd(
          currentScroll >=
            carouselRef.current.scrollWidth -
              carouselRef.current.clientWidth -
              1
        );
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const sliderScrollLeft = () => {
    if (carouselRef.current) {
      const newScrollAmount = Math.max(0, scrollAmount - scrollPerClick);
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: "smooth",
      });
    }
  };

  const slideScrollRight = () => {
    if (carouselRef.current) {
      const maxScroll =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newScrollAmount = Math.min(
        maxScroll,
        scrollAmount + scrollPerClick
      );
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[90%] relative mx-auto">
      <h2 className="text-3xl pt-[0.125rem] md:pt-[0.5rem] md:px-1 md:text-5xl transform -rotate-3">
        Top 10
      </h2>
      <div
        ref={carouselRef}
        className="h-[250px] w-full overflow-hidden whitespace-nowrap flex items-center scroll-smooth pl-4 gap-16"
      >
        {cardVideos.map((cardVideo) => (
          <div
            key={cardVideo.id}
            className={`transition-all duration-300 hover:shadow-lg text-primary2 relative cursor-pointer`}
            onClick={() => onVideoSelect(cardVideo)} // Chame a prop onVideoSelect
          >
            <div className="relative cursor-pointer hover:scale-[1.4] transition-transform duration-500 hover:z-10">
              <CardVideo key={cardVideo.id} cardVideo={cardVideo} />
              <div className="absolute top-0 left-0 text-[9rem] md:text-[12rem] ml:text-[12rem] font-bold text-white/75 leading-none tracking-[-0.358px] transform translate-x-[-40%] translate-y-[-8%] z-10">
                {cardVideo.id}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-end text-white opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="text-base mt-2 text-center">
                  {cardVideo.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={sliderScrollLeft}
        className={`absolute left-[-3%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${
          isAtStart ? "hidden" : ""
        } `}
        disabled={isAtStart}
      >
        <GoChevronLeft size={24} />
      </button>
      <button
        onClick={slideScrollRight}
        className={`absolute right-[-3%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${
          isAtEnd ? "hidden" : ""
        } `}
        disabled={isAtEnd}
      >
        <GoChevronRight size={24} />
      </button>
    </div>
  );
}
