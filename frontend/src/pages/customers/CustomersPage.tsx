import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../api/customers.api";
import { Pagination } from "../../components/ui/Pagination";
import { Link } from "react-router-dom";

interface Customer {
  id: string;
  name: string;
  email: string;
}

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["customers", page],
    queryFn: () => getCustomers(page, limit),
  });

  const customers: Customer[] = data?.data || [];
  const meta = data?.meta;

  if (isLoading || !data) {
    return (
      <div data-testid="customers-loading" className="p-6">
        Carregando clientes...
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="customers-error" className="p-6 text-red-500">
        Erro ao carregar clientes.
      </div>
    );
  }

  return (
    <div data-testid="customers-list" className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Clientes
      </h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Link to={`/customers/${customer.id}`} className="hover:underline">
                  {customer.name}
                </Link>
                </td>
         
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {customer.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {customers.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
          Nenhum cliente encontrado.
        </p>
      )}

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