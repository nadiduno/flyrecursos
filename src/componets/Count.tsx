import { CiSearch } from "react-icons/ci";
import { TableCRUDCount } from "./TableCRUDCount";
import { CreateAccount } from "./cadastro/CreateAccount";
import { useState, useEffect } from "react"; // Importar useEffect
import { ButtonFly } from "./ButtonFly";
import { CgAdd } from "react-icons/cg";
import { get } from "../services/api";

interface TableRowData {
  id: number;
  nome: string;
  email?: string; 
}

export function Count() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [students, setStudents] = useState<TableRowData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<TableRowData[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCreateAccount = (): void => {
    setShowCreateAccount(true);
  };

  const handleDelete = () => {
    // Lógica para deletar o usuário (ex: chamada à API)
    console.log("Usuário deletado!");
    // fetchStudents();
  };

  // Ler data API - students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get("/alunos");
      const fetchedData = response.data.content;
      setStudents(fetchedData);
      setFilteredStudents(fetchedData);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      setError("Não foi possível carregar os dados dos alunos.");
      setStudents([]); 
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Buscar alunos
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = students.filter((student) =>
        student.nome.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredStudents(results);
    }
  };

  useEffect(() => {
    handleSearch(); // Chama a buscar quando se digita
  }, [searchTerm, students]);


  return (
    <div className="w-full flex-row text-xs m-2 my-3 p-1 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Conta</p>
          <div className="flex-shrink-1">
            <ButtonFly
              text="Criar Conta"
              onClick={handleCreateAccount}
              icon={CgAdd}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end h-[3.5rem] md:h-[7rem] lg:h-[7rem] pb-2 md:pb-4 lg:pb-4">
        <div className="flex flex-row items-end gap-1 md:gap-4 lg:gap-4">
          <input
            type="text"
            placeholder="Digite o nome para consultar"
            className="w-[10rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] lg:w-[20rem] lg:h-[2.5rem] rounded-[4rem] rounded-br-none border-whitebg-white p-3 text-black"
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza buscar
            value={searchTerm} // Controla o valor do input
            autoComplete="name"
          />
          <CiSearch
            size={28}
            className=" opacity-90 hover:opacity-100 cursor-pointer transition-transform duration-500"
            title="Buscar"
            aria-label="Buscar"
            onClick={handleSearch} 
          />
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto">
        <TableCRUDCount
          onDelete={handleDelete}
          students={filteredStudents}
          loading={loading}
          error={error}
        />
      </div>

      <div className="">
        {showCreateAccount && (
          <CreateAccount
            isVisible={showCreateAccount}
            setIsVisible={setShowCreateAccount}
          />
        )}
      </div>
    </div>
  );
}