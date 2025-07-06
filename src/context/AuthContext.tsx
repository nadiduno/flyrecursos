import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
  userId: string | null;
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
  login: (token: string, expiresIn: number) => boolean;
  logout: () => void;
  redirectToLogin: () => void;
  refreshToken: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isAdmin: boolean;
    userAuthorities: string[];
    userId: string | null;
    photoUrl: string;
  }>({
    isAuthenticated: false,
    isAdmin: false,
    userAuthorities: [],
    userId: null,
    photoUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const setPhotoUrl = (url: string) => {
    setAuthState((prev) => ({ ...prev, photoUrl: url }));
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      userAuthorities: [],
      userId: null,
      photoUrl: "",
    });
    navigate("/");
  }, [navigate]);

  const redirectToLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const decodeAndSetAuthState = useCallback(
    (token: string): boolean => {
      try {
        const decoded = jwtDecode<DecodedTokenPayload>(token);
        const isAdminUser =
          decoded.authorities?.includes("ROLE_ADMIN") || false;
        const authoritiesFromToken = decoded.authorities || [];

        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: true,
          isAdmin: isAdminUser,
          userAuthorities: authoritiesFromToken,
          userId: decoded.sub,
          photoUrl: prev.photoUrl || "",
        }));

        return isAdminUser;
      } catch (error) {
        console.error("AuthContext: Error al decodificar token JWT:", error);
        logout();
        return false;
      }
    },
    [logout]
  );

  const login = useCallback(
    (token: string, expiresIn: number): boolean => {
      const expirationTime = Date.now() + expiresIn * 1000;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("expirationTime", String(expirationTime));
      return decodeAndSetAuthState(token);
    },
    [decodeAndSetAuthState]
  );

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const expirationTime = localStorage.getItem("expirationTime");
        if (expirationTime && Date.now() < parseInt(expirationTime)) {
          decodeAndSetAuthState(token);
        } else {
          logout();
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          userAuthorities: [],
          userId: null,
          photoUrl: "",
        });
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [decodeAndSetAuthState, logout]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    // Por implementar si decides tener refresh
    return false;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        isAdmin: authState.isAdmin,
        userAuthorities: authState.userAuthorities,
        userId: authState.userId,
        photoUrl: authState.photoUrl,
        setPhotoUrl,
        login,
        logout,
        redirectToLogin,
        refreshToken,
        isLoading,
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