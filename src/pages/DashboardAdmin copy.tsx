import desktopImage from "../assets/LoginPage/large.jpg";
import { Footer } from "../componets/Footer";
import { HeaderDashboard } from "../componets/HeaderDashboard";
import { Navbar } from "../componets/Navbar";

export function DashboardAdmin() {
  return (
    <>
      <div className="w-full mx-auto bg-[#0f0f0f] flex flex-col"
      // overflow-hidden h-screen flex flex-col bg-primary1 font-roboto"
      >
        <nav className="h-[5.375rem] md:h-[7.75rem]shadow-md">
        <Navbar />
        </nav>
        <header className="bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20">
          <div className="w-full">
            <div className=" w-full">
              <img
                src={desktopImage}
                alt="Banner principal"
                className="w-full min-h-[606px] object-cover  top-0 left-0 hidden md:block object-[80%_center]"
              />
            </div>
          </div>
        </header>
        <div className="md:fixed md:mt-[100px] md:left-1/2 md:transform md:-translate-x-1/2 md:z-50 md:flex md:justify-between md:items-start md:gap-10 md:max-w-[1400px] md:w-full md:px-10 lg:px-10 ">
          <HeaderDashboard />
        </div>
        <footer className="h-[2.375rem] md:h-[7.75rem]">
          <Footer />
        </footer>
      </div>
    </>
  );
}