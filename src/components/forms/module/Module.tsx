import { CiSearch } from "react-icons/ci";
import { TableCRUDModule } from "./TableCRUDModule";
import { CreateModule } from "./CreateModule";
import { useState, useEffect } from "react";
import { ButtonFly } from "../../botoes/ButtonFly";
import { CgAdd } from "react-icons/cg";
import { get } from "../../../services/api";
import { EditModule } from "./EditModule";
import { DeleteModule } from "./DeleteModule";

export interface TableRowDataModule {
  id: number;
  titulo: string;
}

export function Module() {
  const [showCreateModule, setShowCreateModule] = useState(false);
  const [showEditModule, setShowEditModule] = useState(false);
  const [showDeleteModule, setShowDeleteModule] = useState(false);
  const [selectedModule, setSelectedModule] =
    useState<TableRowDataModule | null>(null);
  const [modulesData, setModulesData] = useState<TableRowDataModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<TableRowDataModule[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCreateModule = (): void => {
    setShowCreateModule(true);
  };

  const handleDelete = (module: TableRowDataModule): void => {
    setSelectedModule(module);
    setShowDeleteModule(true);
  };

  const handleDeleteSuccess = () => {
    fetchModules(); // Recarrega a lista de módulos
    setShowDeleteModule(false);
    setSelectedModule(null);
  };

  // Ler data API - modules
  const fetchModules = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await get<{ content: TableRowDataModule[] }>(
        "/api/modulos"
      );
      const fetchedData = response.data.content  || [];
      // console.log("Resposta do backend (módulos):", fetchedData);

      setModulesData(fetchedData);
      setFilteredModules(fetchedData);
    } catch (err) {
      console.error("Erro ao buscar módulos:", err);
      setError("Não foi possível carregar os dados dos módulos.");
      setModulesData([]);
      setFilteredModules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // Buscar módulos
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredModules(modulesData);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = modulesData.filter(
        (module) => module.titulo.toLowerCase().includes(lowerCaseSearchTerm) // Buscar por 'titulo'
      );
      setFilteredModules(results);
    }
  };

  useEffect(() => {
    handleSearch(); // Chama a buscar quando se digita ou modulesData muda
  }, [searchTerm, modulesData]); // Adicionado modulesData nas dependências

  // Editar
  const handleEditSuccess = () => {
    fetchModules();
    setShowEditModule(false);
    setSelectedModule(null);
  };

  const handleEditModule = (module: TableRowDataModule): void => {
    setSelectedModule(module);
    setShowEditModule(true);
  };

  return (
    <div className="w-full flex-row text-xs my-3 p-1 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Módulo</p>
          <div className="flex-shrink-1">
            <ButtonFly
              text="Criar Módulo"
              onClick={handleCreateModule}
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
            placeholder="Digite o título do módulo para consultar"
            className="w-[14rem] h-[1.5rem] md:w-[20rem] md:h-[2.5rem] lg:w-[20rem] lg:h-[2.5rem] rounded-[4rem] rounded-br-none border-whitebg-white p-3 text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <CiSearch
            size={28}
            className=" opacity-90 hover:opacity-100 cursor-pointer transition-transform duration-500"
            title="Buscar"
            aria-label="Buscar"
          />
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto">
        {error ? (
          <div className="p-4 text-red-600 text-center">{error}</div>
        ) : (
          <TableCRUDModule
            onEdit={handleEditModule}
            onDelete={handleDelete}
            modules={filteredModules}
            loading={loading}
            error={error}
          />
        )}
      </div>

      <div className="">
        {showCreateModule && (
          <CreateModule
            isVisible={showCreateModule}
            setIsVisible={setShowCreateModule}
            onModuleCreated={fetchModules}
          />
        )}

        {showEditModule && selectedModule && (
          <EditModule
            isVisible={showEditModule}
            setIsVisible={setShowEditModule}
            moduleData={selectedModule}
            onEditSuccess={handleEditSuccess}
          />
        )}

        {showDeleteModule && selectedModule && (
          <DeleteModule
            isVisible={showDeleteModule}
            setIsVisible={setShowDeleteModule}
            moduleData={selectedModule}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}
