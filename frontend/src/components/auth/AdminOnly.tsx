import { useRole } from "../../context/RoleContext";

export function AdminOnly({ children }: any) {
  const { role } = useRole();

  if (role !== "ADMIN") return null;

  return children;
}