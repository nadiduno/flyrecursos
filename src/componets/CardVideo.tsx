export interface CardVideoType{
    id: number
    title: string;
    imageUrl: string;
    videoUrl: string;
    teacher: string;
    trilha: string;
}

interface CardVideoProps {
    cardVideo: CardVideoType
  }

export function CardVideo({ cardVideo }: CardVideoProps){
    return(
        <div className="flex-shrink-0">
            <img
                src={cardVideo.imageUrl}
                alt={cardVideo.title}
                title={cardVideo.title}
                className="min-w-[147px] max-w-[200px] max-h-[114px] w-[200px] h-[114px] md:w-[264px] md:h-[150px]  object-cover bg-lightgreen m-[5px] mx-[10px] cursor-pointer transition-transform duration-500 hover:scale-[1.4] -10"
            />
            
        </div>
    )
}