import { useRef, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import { CardVideo, CardVideoType } from "./CardVideo";

const cardVideos: CardVideoType[] = [
  {
    id: 1,
    title: 'Video 1',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU'
  },
  {
    id: 2,
    title: 'Video 2',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU'
  },
  {
    id: 3,
    title: 'Video 3',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU'
  },
  {
    id: 4,
    title: 'Video 4',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU'
  },
  {
    id: 5,
    title: 'Video 5',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU'
  },
  {
    id: 6,
    title: 'Video 6',
    imageUrl: 'src/assets/imgprevvideo.png',
    videoUrl: 'https://www.youtube.com/watch?v=DE488HhysSU'
  }
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
      <h1>{resource.title}</h1>
      <div
        ref={carouselRef}
        className="h-[250px] w-auto overflow-hidden whitespace-nowrap flex items-center pb-[10px]"
      >
        {cardVideos.map((cardVideo) => (
          <div
            key={cardVideo.id}
            className={`transition-all duration-300 hover:shadow-lg text-primary2`}
          >
            <CardVideo key={cardVideo.id} cardVideo={cardVideo} />
          </div>
        ))}
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