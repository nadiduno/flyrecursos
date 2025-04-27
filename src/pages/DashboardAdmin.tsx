import desktopImage from "../assets/LoginPage/large.jpg";
import { Footer } from "../componets/Footer";
import { HeaderDashboard } from "../componets/HeaderDashboard";
import { Navbar } from "../componets/Navbar";

export function DashboardAdmin() {
  return (
    <>
      <div className="overflow-hidden h-screen flex flex-col bg-primary1 font-roboto">
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
        <div className="md:fixed md:mt-[100px] md:left-1/2 md:transform md:-translate-x-1/2 md:z-50 md:flex md:justify-between md:items-start md:gap-10 md:max-w-[1400px] md:w-full md:px-10 ">
          <HeaderDashboard />
          {/* <div className="hidden md:block md:max-w-[699px]">
            1 Texto
          </div>
          <div className="flex flex-col items-center justify-center  max-w-[400px] xl:min-w-[55rem] xl:h-[550px]"
          >
            
            <div className="bg-[#004054] rounded-t-md w-full h-full">
              {/* <HeaderDashboard /> */}
            {/* </div>
              
          </div>  */}
        </div>

        <footer className="h-[2.375rem] md:h-[7.75rem]">
          <Footer />
        </footer>
      </div>
    </>
  );
}

// import { Footer } from "../componets/Footer";
// import { HeaderDashboard } from "../componets/HeaderDashboard";
// import { Navbar } from "../componets/Navbar";

// export function DashboardAdmin() {
//   return (
//     <div 
//     className="min-h-screen w-full max-w-[1400px] flex flex-col bg-primary1"
//     >
//      <div className="w-full">
//      <nav className="h-[5.375rem] md:h-[7.75rem] shadow-md">
//         <Navbar />
//       </nav>
//       <header className="w-full bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20">
//         <HeaderDashboard />
//       </header>
//       <footer className="h-[5.375rem] md:h-[7.75rem]">
//         <Footer />
//       </footer>
//      </div>
//     </div>
//   );
// }
