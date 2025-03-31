import { Footer } from "../componets/Footer";
import { HeaderMain } from "../componets/HeaderMain";
import { Navibar } from "../componets/Navbar";
import { Resource, ResourceType} from "../componets/Resource";
import { TopTen } from "../componets/TopTen";

import { CreateAccount } from "../componets/CreateAccount";

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
        <div className=" min-h-screen flex flex-col">
            <nav className="h-[5.375rem] md:h-[7.75rem]shadow-md">
                <Navibar />
            </nav>
           {/*Login component */}
            <div className="h-[5.375rem] md:h-[7.75rem]">
               
            </div>
            {/*End of login component */}
            <header className="bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-10">
                <HeaderMain />
            </header>
            <CreateAccount />
            <section className="text-primary2">
                <TopTen />
            </section>
            <section> 
                {resources.map((resource) => {
                    return (
                        <div 
                            key={resource.id} 
                            className={`border-t-[3px] border-primary2 odd:bg-white transition-all duration-300 hover:shadow-lg text-primary2`}
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