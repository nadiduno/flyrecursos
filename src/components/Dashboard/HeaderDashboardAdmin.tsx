import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Account } from "../forms/account/Account";
import { Course } from "../forms/course/Course";
import { Module } from "../forms/module/Module";
import { Lesson } from "../forms/lesson/Lesson";
import { Toaster } from "react-hot-toast";
import { Matricular } from "../forms/Matricula";

export const menuItemsConfig = [
  { label: "Conta", action: "Conta" },
  { label: "Curso", action: "Curso" },
  { label: "Módulo", action: "Modulo" },
  { label: "Aula", action: "Aula" },
  { label: "Matricular", action: "Matricular" },
  { label: "Ver recursos", action: "Recursos" },
];

export function HeaderDashboard() {
  const navigate = useNavigate();
  const [conteudoHeader, setConteudoHeader] = useState<React.ReactNode | null>(
    null
  );

  const handleMenuClick = (action: string) => {
    if (action === "Recursos") {
      navigate("/aulas");
    } else if (action === "Conta") {
      setConteudoHeader(<Account />); // Renderize o componente Count
    } else if (action === "Curso") {
      setConteudoHeader(<Course />);
    } else if (action === "Modulo") {
      setConteudoHeader(<Module />);
    } else if (action === "Aula") {
      setConteudoHeader(<Lesson />);
    }else if (action === "Matricular") {
      setConteudoHeader(<Matricular />);
    } else {
      setConteudoHeader(null);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="flex  flex-col md:flex-row lg:md:flex-row items-start justify-center gap-1 md:gap-7 lg:gap-7 p-3">
          <nav className="rounded-md z-20 w-full md:w-[220px] lg:w-[400px] md:mb-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {menuItemsConfig.map((item, index) => (
                <li
                  key={index}
                  className={`
                    leading-5 py-2 px-3 rounded-md ease-in-out cursor-pointer 
                    opacity-90 text-black bg-gray-100 hover:bg-primary1 
                  hover:text-white hover:translate-x-1 hover:opacity-100 
                    transition-all duration-500 md:text-lg
                    ${
                      index === menuItemsConfig.length - 1
                        ? "mb-4 md:mt-16"
                        : ""
                    }
                  `}
                  onClick={() => handleMenuClick(item.action)}
                >
                  <a>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-primary1 w-full h-[22rem] md:h-[35rem] lg:h-[35rem] flex items-start justify-center font-bold md:text-2xl rounded-2xl">
            {conteudoHeader ? (
              <div className="w-full h-full rounded-lg flex items-center p-1 md:p-4 lg:p-4">
                {conteudoHeader}
              </div>
            ) : (
              <div className="w-full h-full rounded-lg ">
                <Account />
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
