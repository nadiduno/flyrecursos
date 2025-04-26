import { Footer } from "../componets/Footer";
import { HeaderDashboard } from "../componets/HeaderDashboard";
import { Navbar } from "../componets/Navbar";

export function DashboardAdmin() {
  return (
    <div 
    className="min-h-screen w-full max-w-[1400px] flex flex-col bg-primary1"
    >
     <div className="w-full">
     <nav className="h-[5.375rem] md:h-[7.75rem] shadow-md">
        <Navbar />
      </nav>
      <header className="w-full bg-white text-black border-b-[3px] border-primary2 sticky top-0 z-20">
        <HeaderDashboard />
      </header>
      <footer className="h-[5.375rem] md:h-[7.75rem]">
        <Footer />
      </footer>
     </div>
    </div>
  );
}
