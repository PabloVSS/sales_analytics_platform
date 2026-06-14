import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: any) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;

  return children;
}