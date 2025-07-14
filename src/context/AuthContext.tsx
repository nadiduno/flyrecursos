// AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { get } from "../services/api";

interface DecodedTokenPayload {
  sub: string;
  exp: number;
  iat: number;
  iss: string;
  authorities?: string[];
}

interface UserProfile {
  nome: string;
  email: string;
  fotoPerfilUrl: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userAuthorities: string[];
  userId: string | null;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  login: (token: string, expiresIn: number) => Promise<boolean>;
  logout: () => void;
  redirectToLogin: () => void;
  refreshToken: () => Promise<boolean>;
  isLoading: boolean;
  syncUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    userAuthorities: [] as string[],
    userId: null as string | null,
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      userAuthorities: [],
      userId: null,
    });
    setUserProfile(null);
    navigate("/");
  }, [navigate]);

  const redirectToLogin = useCallback(() => navigate("/"), [navigate]);

  const decodeAndSetAuthState = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        const decoded = jwtDecode<DecodedTokenPayload>(token);
        const isAdminUser =
          decoded.authorities?.includes("ROLE_ADMIN") || false;

        setAuthState({
          isAuthenticated: true,
          isAdmin: isAdminUser,
          userAuthorities: decoded.authorities || [],
          userId: decoded.sub,
        });

        const response = await get<UserProfile>("/usuarios/me");
        // console.log("🧠 Perfil actualizado desde backend:", response.data);
        setUserProfile(response.data);

        return isAdminUser;
      } catch (error) {
        console.error("Error al decodificar token:", error);
        logout();
        return false;
      }
    },
    [logout]
  );

  const login = useCallback(
    async (token: string, expiresIn: number): Promise<boolean> => {
      const expirationTime = Date.now() + expiresIn * 1000;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("expirationTime", String(expirationTime));
      return decodeAndSetAuthState(token);
    },
    [decodeAndSetAuthState]
  );

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("accessToken");
      const expirationTime = localStorage.getItem("expirationTime");
      if (token && expirationTime && Date.now() < parseInt(expirationTime)) {
        await decodeAndSetAuthState(token);
      } else {
        logout();
      }
      setIsLoading(false);
    };
    checkAuthStatus();
  }, [decodeAndSetAuthState, logout]);

  const syncUserProfile = async () => {
    try {
      const response = await get<UserProfile>("/usuarios/me");
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error al sincronizar perfil:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        userProfile,
        setUserProfile,
        login,
        logout,
        redirectToLogin,
        refreshToken: async () => false,
        isLoading,
        syncUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
