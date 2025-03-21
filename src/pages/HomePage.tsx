import { Footer } from "../componets/Footer";
import { HeaderMain } from "../componets/HeaderMain";
import { Navibar } from "../componets/Navbar";
import { Resource } from "../componets/Resource";
import { TopTen } from "../componets/TopTen";

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
            <section className="h-[11.5rem] md:h-[38.25rem] text-primary2">
                <Resource />
            </section>
            <footer className="h-[5.375rem] md:h-[7.75rem]">
                <Footer />
            </footer>
        </div>
    )
}