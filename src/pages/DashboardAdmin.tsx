// import desktopImage from "../assets/LoginPage/large.jpg";
import { Footer } from "../componets/Footer";
import { HeaderDashboard } from "../componets/HeaderDashboard";
// import { HeaderDashboard } from "../componets/HeaderDashboard";
import { ImagemBanner } from "../componets/ImagemBanner";
import { Navbar } from "../componets/Navbar";

export function DashboardAdmin() {
  return (
    <div className="w-full mx-auto min-h-screen">
      <div className="w-[95%] mx-auto">
        <nav className="h-[3.375rem] md:h-[5.75rem] flex items-center justify-center rounded-2xl">
          <Navbar />
        </nav>
        <header className="bg-white text-black border-b-[3px] border-primary2 rounded-2xl">
          <div className="w-full h-full transition-all duration-500">
            <div className="relative w-full h-[40rem] overflow-hidden rounded-2xl">
              <ImagemBanner />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-0 md:px-[1rem] py-0 ">
                <div className="rounded-xl w-full h-[100%] py-[0.5rem] md:py-[2rem] mdpx-2 flex flex-col items-start justify-start gap-3 text-white text-[14px] md:text-[17px]">
                  <HeaderDashboard />   
                </div>
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
