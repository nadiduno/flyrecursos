import { ImagemBanner } from "../components/Dashboard/ImagemBanner";
import { Footer } from "../components/footer/Footer";
import { NavbarLoginPage } from "../components/nav/NavBarLoginPage";
import { TextUnauthorized } from "../components/text/TextUnauthorized";

export function Unauthorized() {
  return (
    <div className="w-full mx-auto min-h-screen">
      <div className="w-[95%] mx-auto">
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <NavbarLoginPage />
        </nav>
        <header className="bg-white text-black border-b-[3px] border-primary2 rounded-2xl">
          <div className="w-full h-[24rem] md:h-full transition-all duration-500">
            <div className="relative w-full h-full max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem] rounded-2xl">
              <ImagemBanner />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-[1rem] md:px-[5rem] ld:px-[5rem] py-4 md:py-0">
                <TextUnauthorized />
              </div>
            </div>
          </div>
        </header>

        <footer className="h-[5.375rem] md:h-[7.75rem] mt-10">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
