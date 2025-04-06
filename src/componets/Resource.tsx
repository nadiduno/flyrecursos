import { useRef, useState, useEffect } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { CardVideo} from "./CardVideo";
import { cardVideos } from "./ResourseData";

export interface ResourceType {
  id: number;
  title: string;
  quantity?: number;
}

interface ResourceProps {
  resource: ResourceType;
}

export function Resource({ resource }: ResourceProps) {
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
        setIsAtEnd(currentScroll >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 1); // Adicionada pequena tolerância
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll);
      handleScroll(); // Verificar a posição inicial
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const sliderScrollLeft = () => {
    if (carouselRef.current) {
      const newScrollAmount = Math.max(0, scrollAmount - scrollPerClick);
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const slideScrollRight = () => {
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newScrollAmount = Math.min(maxScroll, scrollAmount + scrollPerClick);
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-[80%] relative mx-auto">
      <h1 className="text-xl md:text-2xl pt-[0.5rem] md:pt-[1rem] md:px-1">
        {resource.title}
      </h1>
      <div
        ref={carouselRef}
        className="h-[250px] w-full overflow-hidden whitespace-nowrap flex items-center scroll-smooth"
      >
        {cardVideos.map((cardVideo) => (
          <div
            key={cardVideo.id}
            className={`transition-all duration-300 hover:shadow-lg text-primary2 relative`}
          >
            <div className="relative cursor-pointer hover:scale-[1.4] transition-transform duration-500 hover:z-20">
              <CardVideo key={cardVideo.id} cardVideo={cardVideo} />
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
        className={`absolute left-[-10%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${isAtStart ? 'hidden' : ''} md:left-[-50px] ml:left-[-50px]`}
        disabled={isAtStart}
      >
        <GoChevronLeft size={24}/>
      </button>
      <button
        onClick={slideScrollRight}
        className={`absolute right-[-10%] top-[60%] transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${isAtEnd ? 'hidden' : ''} md:right-[-50px] ml:right-[-50px]`}
        disabled={isAtEnd}
      >
        <GoChevronRight size={24}/>
      </button>
    </div>
  );
}