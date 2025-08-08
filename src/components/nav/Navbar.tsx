// Navbar.tsx
import { useState } from "react";
import logo from "../../assets/logo.png";
import { CreateAccount } from "../forms/account/CreateAccount";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UploadImgem } from "../uploadImg/UploadImgem";
import { UpdatePassword } from "../Login/UpdatePassword";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout, userProfile } = useAuth();
  // console.log("userProfile", userProfile);

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  // 1. Crie o estado para controlar a visibilidade do modal de alteração de senha
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  
  // 2. Crie a função para abrir o modal de alteração de senha e fechar o dropdown
  const handleOpenUpdatePassword = () => {
    setShowUpdatePassword(true);
    setIsDropdownVisible(false); // Opcional: fechar o dropdown ao abrir o modal
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
            Panel do Administrador
          </button>
        )}

        {showCreateAccount && (
          <CreateAccount
            isVisible={showCreateAccount}
            setIsVisible={setShowCreateAccount}
          />
        )}

        {isAuthenticated && userProfile && (
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              src={userProfile.fotoPerfilUrl}
              alt="Foto de perfil"
              onClick={toggleDropdown}
            />
            {isDropdownVisible && (
              <div className="w-[18rem] absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
                <span className="text-black mt-4 flex justify-center">
                  Olá, {userProfile.nome}!
                </span>
                <span className="text-secondary text-xs flex justify-center">
                  {userProfile.email}
                </span>

                <button
                  onClick={() => setShowUploader((prev) => !prev)}
                  className="w-full border border-gray-300 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 my-2"
                >
                  {showUploader ? "Cerrar editor" : "Editar imagen"}
                </button>

                {showUploader && (
                  <div className="mt-2 flex flex-col items-center gap-2">
                    <UploadImgem
                      estilos="perfil"
                      onUploadComplete={() => setShowUploader(false)}
                    />
                  </div>
                )}

                {/* 3. Vincule a nova função ao evento onClick */}
                <button
                  onClick={handleOpenUpdatePassword}
                  className="w-full border border-gray-300 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-full my-4"
                >
                  Alterar senha
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full border border-gray-300 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1 rounded-full my-4"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Renderize o modal de forma condicional */}
      {showUpdatePassword && (
        <UpdatePassword
          isVisible={showUpdatePassword}
          setIsVisible={setShowUpdatePassword}
        />
      )}
    </div>
  );
}