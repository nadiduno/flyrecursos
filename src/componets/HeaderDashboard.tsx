import { ImagemBanner } from "./ImagemBanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Category } from "./Category";
import { Count } from "./Count";

export const menuItemsConfig = [
  { label: "CONTA", action: "CONTA" },
  { label: "CATEGORIA", action: "CATEGORIA" },
  { label: "VER RECURSOS", action: "RECURSOS" },
];

export function HeaderDashboard() {
  const navigate = useNavigate();
  const [conteudoHeader, setConteudoHeader] = useState<React.ReactNode | null>(null);

  const handleMenuClick = (action: string) => {
    if (action === "RECURSOS") {
      navigate("/");
    } else if (action === "CONTA") {
      setConteudoHeader(<Count />); // Renderize o componente Count
    } else if (action === "CATEGORIA") {
      setConteudoHeader(<Category />); // Renderize o componente Category
    } else {
      setConteudoHeader(null);
    }
  };

  return (
    <div className="w-full md:w-[87.5rem] lg:w-[87.5rem]">
      <div className="relative w-full h-[17rem] max-h-[28rem] overflow-hidden md:h-[28rem] lg:h-[28rem]">
        <ImagemBanner />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-start md:items-center px-[1rem] md:px-[5rem] ld:px-[5rem] py-4 md:py-0">
          <nav className="rounded-md z-20 w-full md:w-[220px] lg:w-[400px] mb-4 md:mb-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {menuItemsConfig.map((item, index) => (
                <li
                  key={index}
                  className="leading-5 py-2 px-3 rounded-md ease-in-out cursor-pointer opacity-90  bg-gray-100 hover:bg-primary1 hover:text-primary2 hover:translate-x-1 hover:opacity-100 transition-all duration-500 md:text-lg"
                  onClick={() => handleMenuClick(item.action)}
                >
                  <a>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-full h-[25rem] rounded-lg bg-primary1 p-[2rem] md:ml-[3rem] ld:ml-[13rem] text-xl flex items-center font-bold text-primary2 md:text-6xl">
            {conteudoHeader ? (
              <div className="w-full h-full rounded-lg border border-primary2 flex items-center p-4">{conteudoHeader}</div>
              
            ) : (
              <p className="w-full h-full rounded-lg border border-primary2">
                DASHBOARD DO ADMINISTRADOR
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
