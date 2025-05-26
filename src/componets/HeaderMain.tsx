import { CardVideoType } from "./CardVideo";
import { ImagemBanner } from "./ImagemBanner";
import { TextMain } from "./TextMain";
import { Video } from "./Video";

interface MenuItem {
  label: string;
  href: string;
}

interface HeaderMainProps {
  selectedVideo: CardVideoType | null;
  onCloseVideo: () => void;
}

export const menuItems: MenuItem[] = [{ label: "Modulo", href: "#modulo" }];

export function HeaderMain({ selectedVideo, onCloseVideo }: HeaderMainProps) {
  return (
    <div className="w-full transition-all duration-500 rounded-2xl">
      {selectedVideo ? (
        // Renderiza o video no Header em caso de ser seleccionado
        <div className="relative w-full h-full overflow-hidden z-30">
          <Video
            id={selectedVideo.id}
            title={selectedVideo.titulo}
            src={selectedVideo.linkConteudo}
            thumbnail={selectedVideo.imagemCapa}
            onClose={onCloseVideo}
          />
        </div>
      ) : (
        // Senão renderiza o conteúdo principal
        <div className="relative w-full h-full max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] rounded-2xl">
          <ImagemBanner />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-[1rem] md:px-[5rem] ld:px-[5rem] py-4 md:py-0">
            <TextMain />

            <nav className="rounded-md z-20 w-full mb-4 md:mb-0">
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="leading-5 py-2 px-3 rounded-md ease-in-out cursor-pointer opacity-90  bg-gray-100 hover:bg-primary1 hover:text-primary2 hover:translate-x-1 hover:opacity-100 transition-all duration-500 md:text-lg"
                  >
                    <a href={item.href} className="block w-full h-full">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
