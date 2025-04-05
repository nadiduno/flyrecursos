import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/Navi.png";
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

    const handleLogin = (): void => {
        setIsLoggedIn(true);
        setShowSignupLogin(false);
    };

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

    return (
        <div className="w-full h-[80px]  flex justify-between py-4 px-4 items-center">
            <div className="bg-white w-[15%] h-[100%] flex items-center justify-center" >
                <img
                    className="h-full w-full object-contain"
                    src={logo}
                    alt="fly logo"
                />
            </div>
            <div className="flex justify-end lg:w-[40%] gap-3 items-center lg:bg-white sm:w-[85%] sm:bg-red-200 md:bg-blue-200 md:w-[60%] xs:bg-red-400">
                {showSignupLogin ? (
                    <>
                        <button
                            className="border-4 border-white px-8 py-2 rounded-3xl text-white font-bold hover:bg-yellow hover:border-yellow hover:text-black transition duration-300 sm:px-6 sm:py-2 sm:text-base"
                            onClick={() => setShowSignupLogin(false)}
                        >
                            Criar conta
                        </button>
                        <button
                            className="border-4 border-white px-8 py-2 rounded-3xl text-white font-bold hover:bg-yellow hover:border-yellow hover:text-black transition duration-300"
                            onClick={handleLogin}
                        >
                            Entrar
                        </button>
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
