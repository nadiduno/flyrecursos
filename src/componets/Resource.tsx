import { useRef, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import { CardVideo, CardVideoType } from "./CardVideo";

const cardVideos: CardVideoType[] = [
  {
    id: 1,
    title: 'Video 1',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU',
    teacher: 'Professora 1',
    trilha: 'Front-end'
  },
  {
    id: 2,
    title: 'Video 2',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=VR5SNLu6fJI',
    teacher: 'Professora 2',
    trilha: 'Front-end'
  },
  {
    id: 3,
    title: 'Video 3',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU',
    teacher: 'Professora 3',
    trilha: 'Front-end'
  },
  {
    id: 4,
    title: 'Video 4',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=VR5SNLu6fJI',
    teacher: 'Professora 4',
    trilha: 'Front-end'
  },
  {
    id: 5,
    title: 'Video 5',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU',
    teacher: 'Professora 5',
    trilha: 'Front-end'
  },
  
  {
    id: 6,
    title: 'Video 6',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=VR5SNLu6fJI',
    teacher: 'Professora 6',
    trilha: 'Front-end'
  },

];

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
  const scrollPerClick = 400;

  const sliderScrollLeft = () => {
    if (carouselRef.current) {
      const newScrollAmount = Math.max(0, scrollAmount - scrollPerClick);
      carouselRef.current.scrollTo({
        top: 0,
        left: newScrollAmount,
        behavior: 'smooth',
      });
      setScrollAmount(newScrollAmount);
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
      setScrollAmount(newScrollAmount);
    }
  };

  return (
    <div className="w-[80%] relative mx-auto">
      <h1 className="text-xl md:text-2xl pt-[0.5rem] md:pt-[1rem] md:px-1">
        {resource.title}
      </h1> 
      <div
        ref={carouselRef}
        className="h-[250px] w-auto overflow-hidden whitespace-nowrap flex items-center"
      >
      <div className="carouselbox h-[250px] w-auto overflow-hidden whitespace-nowrap flex items-center">
        {cardVideos.map((cardVideo) => (
          <div
            key={cardVideo.id}
            className={`transition-all duration-300 hover:shadow-lg text-primary2 relative`}
          >
            <div className="relative cursor-pointer hover:scale-[1.4] transition-transform duration-500  hover:z-20">
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
      </div>
      <button
        onClick={sliderScrollLeft}
        className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        <GoChevronLeft size={24}/>
      </button>
      <button
        onClick={slideScrollRight}
        className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
      >
        <GoChevronRight size={24}/>
      </button>
    </div>
  );
}