import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../api/orders.api";
import { ExportButton } from "../../components/ui/ExportButton";

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  customer: {
    name: string;
    email: string;
  };
  order_items: OrderItem[];
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-6">Carregando detalhes do pedido...</div>;
  }

  if (error || !order) {
    return <div className="p-6 text-red-500">Erro ao carregar o pedido.</div>;
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Pedido #{order.id.slice(0, 8)}
        </h1>
        <ExportButton
          endpoint={`/orders/${order.id}/export/csv`}
          filename={`pedido_${order.id.slice(0, 8)}.csv`}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Cliente</h2>
          <p className="text-gray-800 dark:text-white">{order.customer.name}</p>
          <p className="text-gray-500 dark:text-gray-400">{order.customer.email}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Status</h2>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge(order.status)}`}>
            {order.status === "PAID" ? "Pago" : order.status === "PENDING" ? "Pendente" : "Cancelado"}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Data do pedido</h2>
          <p className="text-gray-800 dark:text-white">
            {new Date(order.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Total</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(order.total_amount))}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Itens do pedido</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Preço unitário
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {order.order_items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(item.unit_price))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.quantity * Number(item.unit_price))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}