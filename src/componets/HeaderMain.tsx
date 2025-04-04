import desktopImage from '../assets/large.jpg';
import mobileImage from '../assets/small.jpg';

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: 'Mercado', href: '#' },
  { label: 'Tecnologia', href: '#' },
  { label: 'Marketing e Empreendedorismo', href: '#' },
  { label: 'SuperProfs', href: '#' },
  { label: 'Colorindo', href: '#' },
  { label: 'Vídeo Cursos', href: '#' },
  { label: 'Artigos', href: '#' },
];

export function HeaderMain() {
  return (
    <div className='w-full'>
      <div className='relative w-full h-[25rem] max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem]'>
        <img
          src={mobileImage}
          alt='Banner mobile'
          className="w-full h-full object-cover object-center top-0 left-0 block md:hidden"
        />
        <img
          src={desktopImage}
          alt='Banner principal'
          className="w-full h-full object-cover absolute top-0 left-0 hidden md:block"
        />

        <div className='absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-[1rem] md:px-[10rem] py-4 md:py-0'>
          <nav className="rounded-md z-20 w-full md:w-[220px] lg:w-[400px] mb-4 md:mb-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className='leading-5 py-2 px-3 rounded-md transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-100 hover:text-primary2 hover:translate-x-1'
                >
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className='rounded-md p-[0.25rem] md:p-[3rem] z-20 h-fit w-full md:max-w-[380px] lg:max-w-[620px] text-xs'>
            <div className='hidden lg:block'>
              <h1 className='text-2xl font-bold text-primary2 md:text-3xl '>
                Aprenda Mais com Nossos Recursos
              </h1>
              <p className='text-sm leading-relaxed text-black mt-3 md:text-base'>
                Amplie seus horizontes educacionais! Nesta seção, você encontrará uma rica coleção de vídeos explicativos, artigos relevantes e aulas gravadas, cuidadosamente selecionados para enriquecer o processo de ensino e aprendizagem.
              </p>
            </div>
          </div>
        </div>
        {/* {videosData.map((video) =>{
          return(
            <Video
              src={video.src}
              title={video.title}
              thumbnail={video.thumbnail}
            />
          )
        })} */}
      </div>
    </div>
  );
}