import { toast } from "react-hot-toast";
import NaviLogo from "../assets/Navi.png";

export const toastCustomEditSuccess = (studentName: string, message?: string): void => {
  const displayMessage = message || "Foi editado com sucesso!!!"; 
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-8 w-8 rounded-full"
              src={NaviLogo}
              alt="Logo"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-secondary3">
              Usuário{" "}
              <span className="mt-1 text-sm text-primary2">
                {" "}{studentName}{" "}
              </span>
            </p>
            <p className="mt-1 text-sm text-green-900">
              {displayMessage}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-m border-secondary">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary3 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Fechar
        </button>
      </div>
    </div>
  ));
};

export const toastCustomEditError = (studentName: string, errorMessage?: string): void => {
  const displayMessage = errorMessage || "Não editado. Por favor, tente novamente!!!";
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-8 w-8 rounded-full"
              src={NaviLogo}
              alt="Logo"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-secondary3">
              Usuário{" "}
              <span className="mt-1 text-sm text-primary2">
                {" "}{studentName}{" "}
              </span>
            </p>
            <p className="mt-1 text-sm text-red-600">
              {displayMessage}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-m border-secondary">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-secondary hover:text-secondary3 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Fechar
        </button>
      </div>    
    </div>
  ));
};
export function ToastCustom() {
  return <></>;
}