import imgDefault from "../../assets/imgDefault.png";

export interface CardVideoType {
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
  cardVideo: CardVideoType;
}
const getVideoPreview = (link: string) => {
  const match = link.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  return match
    ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    : imgDefault;
};
export function CardVideo({ cardVideo }: CardVideoProps) {
  return (
    <div className="flex-shrink-0">
      <img
        src={getVideoPreview(cardVideo.linkConteudo)}
        alt={`Imagen - ${cardVideo.titulo}`}
        title={cardVideo.titulo}
        className="min-w-[147px] max-w-[350px] md:w-[264px] w-[200px] max-h-[150px] md:h-[150px] h-[114px] object-cover bg-lightgreen m-[5px] mx-[10px] cursor-pointer transition-transform duration-500 hover:scale-[1.4] rounded-xl"
      />
    </div>
  );
}
