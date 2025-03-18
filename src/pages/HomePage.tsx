import { Footer } from "../componets/Footer";
import { HeaderMain } from "../componets/HeaderMain";
import { Navibar } from "../componets/Navibar";
import { Resource } from "../componets/Resource";
import { TopTen } from "../componets/TopTen";

export function HomePage(){
    return(
        <>
            <Navibar />
            <HeaderMain />
            <TopTen />
            <Resource />
            <Footer />
        </>
    )
}