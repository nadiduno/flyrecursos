import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TableRowData {
  name: string;
  email: string;
}

const data: TableRowData[] = [
  { name: "Rosa Nascimento", email: "email1@fly.com" },
  { name: "Ana Paula Lopes", email: "email2@fly.com" },
  { name: "Josefina Simoões", email: "email3@fly.com" },
  { name: "Jõa Galvão", email: "email4@fly.com" },
];

export function Table() {
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
              Nome Completo
            </th>
            <th scope="col" className="py-3 hidden md:table-cell lg:table-cell">
              E-mail
            </th>
            <th scope="col" className="flex justify-end py-3 px-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y border-b divide-secondary md:text-sm lg:text-sm">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-2">{row.name}</td>
              <td className="whitespace-nowrap py-2 hidden md:table-cell lg:table-cell">
                {row.email}
              </td>
              <td className="whitespace-nowrap text-right flex flex-row gap-4 py-2 px-2 justify-end">
                <a href="#" className="">
                  <GrEdit size={18} />
                </a>
                <a href="#" className="">
                  <RiDeleteBin6Line size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
