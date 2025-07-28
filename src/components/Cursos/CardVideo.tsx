import { useEffect, useState } from "react";
import imgDefault from "../../assets/imgDefault.png";

// Lista de imágenes predeterminadas de Firebase
const imagenesCapa = [
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fcurso%20Agil.png?alt=media&token=9bc85636-ce3a-48e3-874c-7607d9d4cc72",
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fcurso%20marketin%20digital.png?alt=media&token=7f8eb27e-9c98-4389-bb03-962ef8e398bb",
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fcurso%20portfolio%20github.png?alt=media&token=16f1c2df-62ad-4663-9fe0-4013a7995521",
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fcurso%20sindrome%20do%20impostor.png?alt=media&token=eace7677-7ed6-446d-89c1-5a0a39898216",
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fcurso%20reestructuracion%20de%20perfis%20na%20media.png?alt=media&token=71ed4a61-890e-4d0b-b001-cb595fc98206",
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fconstruir%20a%20marca.png?alt=media&token=548ab105-add4-4727-9718-ff1bfcadbec5",
  "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/cursos%2Fcurso%20solu%C3%A7oes%20bugs.png?alt=media&token=52f87b81-8246-49d0-b8bb-14257628a34e"
];

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

const getVideoPreview = (imagemCapa?: string) => {
  if (imagemCapa) return imagemCapa; 
  const imagenAleatoria = imagenesCapa[Math.floor(Math.random() * imagenesCapa.length)];
  return imagenAleatoria || imgDefault;
};

export function CardVideo({ cardVideo }: CardVideoProps) {
  const [imagenActual, setImagenActual] = useState<string>(getVideoPreview(cardVideo.imagemCapa));

  useEffect(() => {
    setImagenActual(getVideoPreview(cardVideo.imagemCapa));
  }, [cardVideo.imagemCapa]); 

  return (
    <div className="flex-shrink-0 w-[18%] mx-2">
      <img
        src={imagenActual} // Usamos la imagen almacenada en el estado
        alt={`Imagen - ${cardVideo.titulo}`}
        title={cardVideo.titulo}
        className="min-w-[247px] max-w-[380px] min-h-[200px] md:w-[264px] w-[200px] max-h-[150px] md:h-[150px] h-[114px] object-cover bg-lightgreen m-[5px] mx-[10px] cursor-pointer transition-transform duration-500 hover:scale-[1.4] rounded-xl"
      />
    </div>
  );
}
