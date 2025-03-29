export interface CardVideoType{
    id: number
    title: string;
    imageUrl: string;
    videoUrl: string;
}

interface CardVideoProps {
    cardVideo: CardVideoType
  }

export function CardVideo({ cardVideo }: CardVideoProps){
    return(
        <div>
            <img
                src={cardVideo.imageUrl}
                alt={cardVideo.title}
                className="min-w-[147px] max-w-[147px] h-[200px] object-cover bg-lightgreen m-[5px] mx-[10px] cursor-pointer transition-transform duration-500 hover:scale-[1.4] z-10"
            />
        </div>
    )
}