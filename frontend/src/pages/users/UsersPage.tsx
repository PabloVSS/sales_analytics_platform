import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/users.api";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Pagination } from "../../components/ui/Pagination";

export default function UsersPage() {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page, limit),
  });

  const users = data?.data || [];
  const meta = data?.meta;

  if (isLoading) return <div className="p-6">Carregando usuários...</div>;
  if (error) return <div className="p-6 text-red-500">Erro ao carregar usuários.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Usuários do Sistema</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Função</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {users.map((u: any) => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}