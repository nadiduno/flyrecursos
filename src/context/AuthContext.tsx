import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

interface AuthContextType{
    isAuthenticated: boolean;
    isAdmin: boolean;
    allowedCategories: string;
    login: (token: string, expiresIn: number) => void;
    logout: () => void;
    redirectToLogin: () => void;
}

//context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate(); // Initialize navigate
    // const para verificar se o usuario esta autenticado
    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean; 
        isAdmin: boolean; 
        allowedCategories: string;
    }> ({
        isAuthenticated: false, 
        isAdmin: false, 
        allowedCategories: ''
    }); 

    // verificar token no localStorage e se o token é válido
    // se o token for válido, atualizar o estado de autenticação
    useEffect(()=>{
        // obter token do localStorage
        const token = localStorage.getItem('accessToken');
        // caso o token exista
        if(token){
            // verificar se o token é valido para uso ainda
            const experationTime = localStorage.getItem('expirationTime');
            if(experationTime && Date.now() < parseInt(experationTime)){
                // decodificar o token para obter os dados do usuário
                const {scope, allowedCategories} = jwtDecode<{
                    scope: string; // ver 'admin' ou 'aluno'
                    allowedCategories: string; // categorias permitidas dos cursos
                }>(token);
                //setIsAuthenticated(true);

                // atualizar o estado de autenticação com os dados do token
                setAuthState({
                    isAuthenticated: true,
                    isAdmin: scope === 'ADMIN', // Verifica se o usuário é admin
                    allowedCategories: allowedCategories
                })
            } else{
                logout(); 
            }
        }
        else {
            // caso o token nao exista ou seja inválido, redirecionar para a tela de login
            redirectToLogin();
        }
    },[]);

    const login = (token: string, expiresIn: number) => {
        const expirationTime = Date.now() + expiresIn * 1000; // expiresIn is in seconds, convert to ms
        localStorage.setItem('accessToken', token);
        localStorage.setItem('expirationTime', String(expirationTime));
        
        // decodificar o token para obter os dados do usuário
        const {scope, allowedCategories} = jwtDecode<{
            scope: string;
            allowedCategories: string;
        }>(token);

        setAuthState({
            isAuthenticated: true,
            isAdmin: scope === 'ADMIN', // Verifica se o usuário é admin
            allowedCategories: allowedCategories
        })

    }

    const logout = () =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
        setAuthState({
            isAuthenticated: false,
            isAdmin: false,
            allowedCategories: "",
          });
    
    }

    const redirectToLogin = () => {
        navigate('/login'); 
    }

      return (<AuthContext.Provider value = {{...authState, login, logout, redirectToLogin}}>
            {children}
      </AuthContext.Provider>)
}

// Hook personalizado para uso
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };