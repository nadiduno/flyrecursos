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
      <div>
        <div className="flex  flex-col md:flex-row lg:md:flex-row items-start justify-center gap-1 md:gap-7 lg:gap-7 p-3">
          <nav className="rounded-md z-20 w-full md:w-[220px] lg:w-[400px] md:mb-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {menuItemsConfig.map((item, index) => (
                <li
                  key={index}
                  className="leading-5 py-2 px-3 rounded-md ease-in-out cursor-pointer opacity-90 text-black bg-gray-100 hover:bg-primary1 hover:text-primary2 hover:translate-x-1 hover:opacity-100 transition-all duration-500 md:text-lg"
                  onClick={() => handleMenuClick(item.action)}
                >
                  <a>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-primary1 rounded-t-md w-full h-[20rem] md:h-[35rem] lg:h-[35rem] flex items-start justify-center font-bold md:text-2xl">
            {conteudoHeader ? (
              <div className="w-full h-full rounded-lg flex items-center p-1 md:p-4 lg:p-4">
                {conteudoHeader}
              </div>
              
            ) : (
              <p className="w-full h-full rounded-lg ">
                DASHBOARD DO ADMINISTRADOR
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
