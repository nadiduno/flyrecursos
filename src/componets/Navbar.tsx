import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CreateAccount } from "./CreateAccount";
import LoginModal from "./LoginModal";

interface User {
    photoUrl?: string;
}

interface NavibarProps {
    user?: User;
}

export function Navibar({ user }: NavibarProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showSignupLogin, setShowSignupLogin] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el input de búsqueda
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false); // Controla la visibilidad del menú desplegable
    const [isCreateAccountVisible, setIsCreateAccountVisible] = useState<boolean>(false);
     const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = (): void => {
        setIsLoggedIn(false);
        setShowSignupLogin(true);
        setIsDropdownVisible(false); // Cierra el menú desplegable al cerrar sesión
    };

    const handleSearch = (): void => {
        if (searchQuery.trim() !== "") {
            console.log("Buscando por:", searchQuery);
            alert(`Buscando por: ${searchQuery}`);
        }
    };

    const toggleDropdown = (): void => {
        setIsDropdownVisible((prevState) => !prevState); // Alterna la visibilidad del menú desplegable
    };

    //Alternar visibilidade do componente de criar conta
    const createAccountToggleVisibility = () => {
        //console.log("toggle")
        setIsCreateAccountVisible(true);
        //console.log(isCreateAccountVisible)
      };

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const handleLogin = (username: string, password: string) => {
        console.log('Inicio de sesión:', username, password);
        handleCloseModal();
      };

    return (
        <div className="flex justify-between py-4 px-8 items-center">
            <div className="w-12 h-12">
                <img
                    className="h-12 w-12 object-cover"
                    src="https://static.wixstatic.com/media/d7a054_004284127742499c88a4914992b6e3fa~mv2.png/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/d7a054_004284127742499c88a4914992b6e3fa~mv2.png"
                    alt=""
                />
            </div>
            <div className="flex gap-6 items-center">
                {showSignupLogin ? (
                    <>
                        <button
                            className="bg-secondary px-2 py-1 rounded-xl text-primary1"
                            onClick={createAccountToggleVisibility}
                        >
                            Criar conta
                            <CreateAccount isVisible={isCreateAccountVisible} setIsVisible={setIsCreateAccountVisible} />
                        </button>
                        <button
                            className="bg-secondary px-2 py-1 rounded-xl text-primary1"
                            onClick={handleOpenModal}
                        >
                            Entrar
                        </button>
                        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} onLogin={handleLogin} />
                    </>
                ) : isLoggedIn ? (
                    <>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border px-4 py-2 rounded-tl-full rounded-tr-full rounded-bl-full border-gray-300 focus:outline-none text-primary1"
                                placeholder="Buscar..."
                            />
                            <button
                                onClick={handleSearch}
                                className=" rounded-full p-2 flex items-center justify-center"
                            >
                                <AiOutlineSearch className="text-white w-10 h-10" />
                            </button>
                        </div>
                        <div className="relative">
                            <img
                                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                src={user?.photoUrl || "../../public/user.png"}
                                alt="User"
                                onClick={toggleDropdown} // Muestra/oculta el menú desplegable
                            />
                            {isDropdownVisible && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
                                    <button
                                        className="bg-red-500 px-4 py-2 text-white rounded-lg"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
