import { CiSearch } from "react-icons/ci";
import { TableCRUDAccount } from "./TableCRUDAccount";
import { CreateAccount } from "./CreateAccount";
import { useState, useEffect } from "react";
import { ButtonFly } from "../../componets/ButtonFly";
import { CgAdd } from "react-icons/cg";
import { get } from "../../services/api";
import { EditAccount } from "./EditAccount";
import { DeleteAccount } from "./DeleteAccount";

export interface TableRowData {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: boolean;
  dataNascimento: string;
}

export function Account() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TableRowData | null>(null);
  const [students, setStudents] = useState<TableRowData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCreateAccount = (): void => {
    setShowCreateAccount(true);
  };

  // Eliminar
  const handleDelete = (student: TableRowData): void => {
  setSelectedStudent(student);
  setShowDeleteAccount(true);
};
   const handleDeleteSuccess = () => {
    fetchStudents(); // Recarrega a lista de alunos
    setShowDeleteAccount(false);
    setSelectedStudent(null);
  };

  // Ler data API - students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<{ content: TableRowData[] }>("/alunos");
      const fetchedData = response.data.content;
      // console.log("Resposta do backend:", fetchedData);

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

  // Editar
  const handleEditSuccess = () => {
    // console.log("Edição bem-sucedida! Recarregando a lista de alunos...");
    fetchStudents();
    setShowEditAccount(false);
    setSelectedStudent(null);
  };

  const handleEditAccount = (student: TableRowData): void => {
    // console.log("Iniciando edição para o aluno:", student.nome);
    setSelectedStudent(student);
    setShowEditAccount(true);
  };

  return (
    <div className="w-full flex-row text-xs my-3 p-1 md:p-3 lg:p-3">
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
            className="w-[14rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] lg:w-[20rem] lg:h-[2.5rem] rounded-[4rem] rounded-br-none border-whitebg-white p-3 text-black"
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza buscar
            value={searchTerm} // Controla o valor do input
            autoComplete="name"
          />
          <CiSearch
            size={28}
            className=" opacity-90 hover:opacity-100 cursor-pointer transition-transform duration-500"
            title="Buscar"
            aria-label="Buscar"
            // onClick={handleSearch}
          />
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto">
        {error ? (
          <div className="p-4 text-red-600 text-center">{error}</div>
        ) : (
          <TableCRUDAccount
            onEdit={handleEditAccount}
            onDelete={handleDelete}
            students={filteredStudents}
            loading={loading}
            error={error}
          />
        )}
      </div>

      <div className="">
        {showCreateAccount && (
          <CreateAccount
            isVisible={showCreateAccount}
            setIsVisible={setShowCreateAccount}
          />
        )}

        {showEditAccount && selectedStudent && (
          <EditAccount
            isVisible={showEditAccount}
            setIsVisible={setShowEditAccount}
            studentData={selectedStudent}
            onEditSuccess={handleEditSuccess}
          />
        )}

         {showDeleteAccount && selectedStudent && (
          <DeleteAccount
            isVisible={showDeleteAccount}
            setIsVisible={setShowDeleteAccount}
            studentData={selectedStudent}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}
