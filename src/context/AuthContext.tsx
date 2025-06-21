// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

interface DecodedTokenPayload {
    sub: string;
    exp: number;
    iat: number;
    iss: string;
    authorities?: string[];
}

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    userAuthorities: string[];
    // allowedCategories: string; 
    login: (token: string, expiresIn: number) => boolean;
    logout: () => void;
    redirectToLogin: () => void;
    refreshToken: () => Promise<boolean>;
}

//context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        isAdmin: boolean;
        userAuthorities: string[];
        // allowedCategories: string;
    }>({
        isAuthenticated: false,
        isAdmin: false,
        userAuthorities: []
        // allowedCategories: '' 
    });

    // 1. Defina `logout` PRIMEIRO com useCallback
    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expirationTime');
        setAuthState({
            isAuthenticated: false,
            isAdmin: false,
            userAuthorities: [] 
            // allowedCategories: "",
        });
        navigate('/');
    }, [navigate]); 

    // 2. Defina `redirectToLogin` com useCallback (depende de navigate)
    const redirectToLogin = useCallback(() => {
        navigate('/');
    }, [navigate]);

    // 3. Defina `decodeAndSetAuthState` com useCallback (depende de logout)
    const decodeAndSetAuthState = useCallback((token: string): boolean => {
        try {
            const decoded = jwtDecode<DecodedTokenPayload>(token);
            // console.log("Token decodificado no AuthContext:", decoded);

            const isAdminUser = decoded.authorities?.includes('ROLE_ADMIN') || false;
            const authoritiesFromToken = decoded.authorities || [];

            setAuthState({
                isAuthenticated: true,
                isAdmin: isAdminUser,
                userAuthorities: authoritiesFromToken,
                // allowedCategories: "",
            });
            return isAdminUser; 
        } catch (error) {
            console.error("Erro ao decodificar token JWT:", error);
            logout(); 
            return false;
        }
    }, [logout]); 

    // 4. Defina `login` com useCallback (depende de decodeAndSetAuthState)
    const login = useCallback((token: string, expiresIn: number): boolean => {
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('expirationTime', String(expirationTime));

        const isUserAdmin = decodeAndSetAuthState(token);
        return isUserAdmin;
    }, [decodeAndSetAuthState]); 

    // 5. O `useEffect` para verificar o token inicial (depende de decodeAndSetAuthState e logout)
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const expirationTime = localStorage.getItem('expirationTime');
            // Verifica se o token ainda é válido
            if (expirationTime && Date.now() < parseInt(expirationTime)) {
                decodeAndSetAuthState(token);
            } else {
                // Se expirado, faz logout
                logout();
            }
        } 
    }, [decodeAndSetAuthState, logout, redirectToLogin]); 

    const refreshToken = useCallback(async (): Promise<boolean> => {
        // console.warn("Função refreshToken não implementada.");
        // try {
        //     const response = await post('/auth/refresh-token', { refreshToken: localStorage.getItem('refreshToken') });
        //     if (response.data?.accessToken) {
        //         login(response.data.accessToken, response.data.expiresIn);
        //         return true;
        //     }
        //     logout();
        //     return false;
        // } catch (error) {
        //     console.error("Erro ao refrescar token:", error);
        //     logout();
        //     return false;
        // }
        return false;
    }, [login, logout]);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, redirectToLogin, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para uso
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};