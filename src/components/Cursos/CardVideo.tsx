import imgDefault from "../assets/imgDefault.png";

export interface CardVideoType{
    id: number;
    duracaoEstimada: number;
    linkConteudo: string;
    moduloId: number;
    ordem: number;
    tipo: string;
    titulo: string;
    imagemCapa?: string;
    modulo?: string;
}

interface CardVideoProps {
    cardVideo: CardVideoType
  }

export function CardVideo({ cardVideo }: CardVideoProps){
    return(
        <div className="flex-shrink-0">
            <img
                src={cardVideo.imagemCapa || imgDefault}
                alt={`Imagen - ${cardVideo.titulo}`}
                title={cardVideo.titulo}
                className="min-w-[147px] max-w-[350px] md:w-[264px] w-[200px] max-h-[150px] md:h-[150px] h-[114px] object-cover bg-lightgreen m-[5px] mx-[10px] cursor-pointer transition-transform duration-500 hover:scale-[1.4] rounded-xl"
            />
            
        </div>
    )
}