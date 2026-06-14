import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../api/orders.api";
import type { OrderFilters } from "../../api/orders.api";
import { Pagination } from "../../components/ui/Pagination";
import { ExportButton } from "../../components/ui/ExportButton";

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  customer: {
    name: string;
  };
}

export default function OrdersPage() {
  const [filters, setFilters] = useState<OrderFilters>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", filters, page],
    queryFn: () => getOrders(filters, page, limit),
  });

  const orders: Order[] = data?.data || [];
  const meta = data?.meta;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // resetar para primeira página ao filtrar
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      PAID: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      PENDING:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (error) {
    return (
      <div data-testid="orders-error" className="p-6 text-red-500">
        Erro ao carregar pedidos. {(error as any)?.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Pedidos
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status || ""}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="">Todos</option>
            <option value="PAID">Pago</option>
            <option value="PENDING">Pendente</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Cliente
          </label>
          <input
            type="text"
            name="customerName"
            placeholder="Nome do cliente"
            value={filters.customerName || ""}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Data inicial
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate || ""}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Data final
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate || ""}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>
        

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Limpar filtros
        </button>
    

        
  <ExportButton endpoint="/orders/export/csv" filename="pedidos.csv" />


  </div>

      {isLoading || !data ? (
        <div
          data-testid="orders-loading"
          className="text-gray-500 dark:text-gray-400"
        >
          Carregando pedidos...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center py-10">
          Nenhum pedido encontrado com os filtros selecionados.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      <Link
                        to={`/orders/${order.id}`}
                        className="hover:underline"
                      >
                        #{order.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.customer?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge(
                          order.status
                        )}`}
                      >
                        {order.status === "PAID"
                          ? "Pago"
                          : order.status === "PENDING"
                          ? "Pendente"
                          : "Cancelado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(order.total_amount))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </td>
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
        </>
      )}
    </div>
  );
}