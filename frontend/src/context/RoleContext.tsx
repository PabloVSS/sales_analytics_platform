import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

interface RoleContextType {
  role: string;
}

const RoleContext = createContext<RoleContextType>({ role: "" });

export function RoleProvider({ children }: any) {
  const { user } = useAuth();
  const role = user?.role || "";

  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);