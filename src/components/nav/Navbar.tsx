import { useState } from "react";
import logo from "../../assets/logo.png";
import { CreateAccount } from "../forms/account/CreateAccount";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadImage from "../uploadImg/UploadImg";

interface User {
  photoUrl?: string;
}

interface NavbarProps {
  user?: User;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const showSignupLogin = !isAuthenticated;
  const isLoggedIn = isAuthenticated;
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [showUploader, setShowUploader] = useState(false);
  // const handleCreateAccount = (): void => {
  //   setShowCreateAccount(true);
  // };

  const { isAdmin, logout } = useAuth();

  // const handleLogin = (): void => {
  //     setIsLoggedIn(true);
  //     setShowSignupLogin(false);
  // };

  const handleLogout = () => {
    logout();
    // setIsLoggedIn(false);
    // setShowSignupLogin(true);
    // setIsDropdownVisible(false);
  };

  // const handleSearch = (): void => {
  //   if (searchQuery.trim() !== "") {
  //     console.log("Buscando por:", searchQuery);
  //     alert(`Buscando por: ${searchQuery}`);
  //   }
  // };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const toggleDropdown = (): void => {
    setIsDropdownVisible((prevState) => !prevState); // Alterna la visibilidad del menú desplegable
  };

  return (
    <div className="w-full h-[80px] flex justify-between py-4 px-3 items-center">
      <div className="lg:w-[6%] h-[100%] flex items-center justify-start xs:w-[20%]">
        <img
          className="h-full w-full object-contain"
          src={logo}
          alt="fly logo"
        />
      </div>
      <div className="flex justify-end lg:w-[40%] gap-3 items-center sm:w-[85%] md:w-[60%] xs:w-[80%]">
        {isAdmin && (
          <button
            className="border-2 border-secondary px-3 md:px-8 py-2 rounded-3xl text-primary1 font-bold hover:bg-yellow hover:border-yellow hover:text-black transition duration-300 text-[0.75rem] md:text-[1.125rem] mt-1"
            onClick={handleDashboard}
          >
            {" "}
            Panel do Administrador
          </button>
        )}
        {showCreateAccount && (
          <CreateAccount
            isVisible={showCreateAccount}
            setIsVisible={setShowCreateAccount}
          />
        )}

        {showSignupLogin ? (
          <>
            {/* <button
              className="border-4 border-white px-8 py-2 rounded-3xl text-white font-bold hover:bg-yellow hover:border-yellow hover:text-black transition duration-300 sm:text-base"
              // onClick={handleLogin}
            >
              <Link to="/login" className="block w-full h-full">
                Entrar
              </Link>
            </button> */}
          </>
        ) : isLoggedIn ? (
          <>
            {/* <div className="flex items-center lg:gap-2 xs:gap-0 ">
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
            </div> */}
            <div className="relative">
             
              <img
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                src={user?.photoUrl || "../../public/user.png"}
                alt="User"
                onClick={toggleDropdown}
              />
              {isDropdownVisible && (
                <div className="w-[18rem] absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
                  <span className="text-black mt-4 flex justify-center">
                    Olá, Nombre!
                  </span>
                  <span className="text-secondary text-xs flex justify-center">
                    <br />
                    Email
                  </span>
<button
  onClick={() => setShowUploader((prev) => !prev)}
  className="w-full border border-gray-300 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 my-2"
>
  {showUploader ? "Cerrar editor" : "Editar imagen"}
</button>
{showUploader && (
  <div className="mt-2">
    <UploadImage estilos="perfil" onUploadComplete={() => setShowUploader(false)} />
  </div>
)}
                  <button
                    className="w-full border rounded-tl-full rounded-tr-full rounded-bl-full border-gray-300 focus:outline-none  text-red-500 hover:bg-red-500 hover:text-white  px-4 py-1 rounded-lg my-4 "
                    onClick={handleLogout}
                  >
                    Sair
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
