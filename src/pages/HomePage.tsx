import { Footer } from "../componets/Footer";
import { HeaderMain } from "../componets/HeaderMain";
import  {Navbar}  from "../componets/Navbar";
import { Resource} from "../componets/Resource";
import { TopTen } from "../componets/TopTen";

// **Importe o menuItems do HeaderMain para manter a consistência**
import { menuItems as headerMenuItems } from "../componets/HeaderMain";

// **Adapte a interface ResourceType para incluir um id (opcional, mas útil)**
interface ResourceType {
  id: number;
  title: string;
  quantity?: number;
}

// **Crie um array de dados para os seus Resources (se necessário)**
const resourcesData: ResourceType[] = [
  { id: 1, title: 'Mercado' },
  { id: 2, title: 'Tecnologia' },
  { id: 3, title: 'Marketing e Empreendedorismo' },
  { id: 4, title: 'SuperProfs' },
  {id: 5, title: 'Colorindo'}
];

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-primary1">
      <nav className="h-[5.375rem] md:h-[7.75rem]shadow-md">
        <Navbar />
      </nav>
      <header className="bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20">
        <HeaderMain />
      </header>
      <section id="top-ten" className="text-primary2 py-10">
        <TopTen />
      </section>
      {headerMenuItems.map((item, index) => {
        const sectionId = item.label.toLowerCase().replace(/ /g, '-');
        let sectionContent = null;
        if (sectionId === 'mercado') {
          sectionContent = <Resource key={1} resource={resourcesData.find(r => r.title === 'Mercado')!} />;
        } else if (sectionId === 'tecnologia') {
          sectionContent = <Resource key={2} resource={resourcesData.find(r => r.title === 'Tecnologia')!} />;
        } else if (sectionId === 'marketing-e-empreendedorismo') {
          sectionContent = <Resource key={3} resource={resourcesData.find(r => r.title === 'Marketing e Empreendedorismo')!} />;
        } else if (sectionId === 'superprofs') {
          sectionContent = <Resource key={4} resource={resourcesData.find(r => r.title === 'SuperProfs')!} />;
        }else if (sectionId === 'colorindo') {
            sectionContent = <Resource key={5} resource={resourcesData.find(r => r.title === 'Colorindo')!} />;
        }

        return (
          <section
            key={index}
            id={sectionId}
            className={`py-1 border-t-[3px] border-primary2 ${index % 2 === 0 ? 'bg-white' : 'odd:bg-primary1'} transition-all duration-300 hover:shadow-lg text-primary2`}
          >
            {sectionContent}
          </section>
        );
      })}

      <footer className="h-[5.375rem] md:h-[7.75rem]">
        <Footer />
      </footer>
    </div>
  );
}