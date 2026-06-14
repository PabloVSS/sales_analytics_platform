import { createContext, useContext, useState, useCallback } from "react";
import { login as loginApi } from "../api/auth";

interface User {
  id: string;
  role: string;
  email: string; // adicionado
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as any);

function parseJwt(token: string): User | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return {
      id: payload.id,
      role: payload.role,
      email: payload.email, // extrai email do payload
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(
    token ? parseJwt(token) : null
  );

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginApi(email, password);
    const newToken = data.token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decoded = parseJwt(newToken);
    // Garante que o email usado no login seja incluído no objeto user
    if (decoded) {
      decoded.email = email;
    }
    setUser(decoded);
  }, []);

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: !!token,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);