import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../../api/customers.api";

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  created_at: string;
  orders: Order[];
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading, error } = useQuery<Customer>({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-6">Carregando detalhes do cliente...</div>;
  }

  if (error || !customer) {
    return <div className="p-6 text-red-500">Erro ao carregar cliente.</div>;
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      PAID: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6">
      <Link to="/customers" className="text-indigo-600 hover:underline mb-4 inline-block">
        ← Voltar para clientes
      </Link>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {customer.name}
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Email</h2>
          <p className="text-gray-800 dark:text-white">{customer.email}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Cliente desde</h2>
          <p className="text-gray-800 dark:text-white">
            {new Date(customer.created_at).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Pedidos ({customer.orders.length})
      </h2>

      {customer.orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Nenhum pedido encontrado.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pedido
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
              {customer.orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    <Link to={`/orders/${order.id}`} className="hover:underline">
                      #{order.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge(order.status)}`}>
                      {order.status === "PAID" ? "Pago" : order.status === "PENDING" ? "Pendente" : "Cancelado"}
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
      )}
    </div>
  );
}