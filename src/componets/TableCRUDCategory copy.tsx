import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TableRowData {
  description: string;
}

const data: TableRowData[] = [
  { description: "Mercado" },
  { description: "Tecnologia" },
  { description: "Marketing e Empreendedorismo"},
  { description: "SuperProfs"},
];

export function TableCRUDCategory() {
  return (
    <div className="overflow-x-auto flex justify-center p-1">
      <table className="min-w-[95%]">
        <colgroup>
          <col /> 
          <col className="hidden md:table-cell lg:table-cell" /> 
          <col className="w-22" />{" "}
        </colgroup>
        <thead  className="border-b border-secondary">
          <tr className="px-6 py-4 text-left font-medium uppercase tracking-wider text-yellow md:text-lg lg:text-lg">
            <th scope="col" className="py-3">
              Descripção
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-sm lg:text-sm">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-2">{row.description}</td>
              <td className="whitespace-nowrap text-right flex flex-row gap-4 py-2 px-2 justify-end">
                <a href="#" className="">
                  <GrEdit 
                    size={18}
                    className=" opacity-90 hover:opacity-100 hover:text-yellow cursor-pointer transition-transform duration-500"
                    title="Editar"
                    aria-label="Editar"
                  />
                </a>
                <a href="#" className="">
                  <RiDeleteBin6Line 
                  size={18}
                  className=" opacity-90 hover:opacity-100 hover:text-red-500 cursor-pointer transition-transform duration-500"
                  title="Eliminar"
                  aria-label="Eliminar" 
                />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
