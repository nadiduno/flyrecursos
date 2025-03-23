import { Footer } from "../componets/Footer";
import { HeaderMain } from "../componets/HeaderMain";
import { Navibar } from "../componets/Navibar";
import { Resource, ResourceType} from "../componets/Resource";
import { TopTen } from "../componets/TopTen";

const resources: ResourceType[] = [
    {
        id: 1,
        title: 'Mercado'
    },
    {
        id: 2,
        title: 'Tecnologia'
    },
    {
        id: 3,
        title: 'Marketing e Empreendedorismo'
    },
    {
        id: 4,
        title: 'SuperProfs'
    }
]

export function HomePage(){
    return(
        <div className="min-h-screen flex flex-col">
            <nav className="h-[5.375rem] md:h-[7.75rem]shadow-md">
                <Navibar />
            </nav>
            <header className="h-[23.5rem] md:h-[31.375rem] bg-white text-black">
                <HeaderMain />
            </header>
            <section className="h-[11.5rem] md:h-[38.25rem] text-primary2">
                <TopTen />
            </section>
            <section> 
                {resources.map((resource) => {
                    return (
                        <div 
                            key={resource.id} 
                            className={`h-[11.5rem] md:h-[38.25rem] border-t-[3px] border-primary2 odd:bg-white transition-all duration-300 hover:shadow-lg text-primary2 `}
                        >
                            <Resource key={resource.id} resource={resource} />
                        </div>

                    )
                })}
            </section>
            <footer className="h-[5.375rem] md:h-[7.75rem]">
                <Footer />
            </footer>
        </div>
    )
}