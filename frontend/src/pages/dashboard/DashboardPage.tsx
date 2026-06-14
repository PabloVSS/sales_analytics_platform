import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useKpis } from "../../domain/dashboard/useKpis";
import { useMonthlyRevenue } from "../../domain/dashboard/useMonthlyRevenue";
import { useTopCustomers } from "../../domain/dashboard/useTopCustomers";
import { useTopProducts } from "../../domain/dashboard/useTopProducts";
import { useCategories } from "../../domain/dashboard/useCategories";
import { KpiCard } from "../../components/ui/KpiCard";
import type { DashboardFilters } from "../../api/dashboard";

export default function DashboardPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filters, setFilters] = useState<DashboardFilters>({});

  const applyFilters = () => {
    setFilters({ startDate, endDate });
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilters({});
  };

  const { data: kpis, isLoading: kpisLoading, error: kpisError } = useKpis(filters);
  const { data: revenue, isLoading: revenueLoading } = useMonthlyRevenue(filters);
  const { data: topCustomers, isLoading: customersLoading } = useTopCustomers(filters);
  const { data: topProducts, isLoading: productsLoading } = useTopProducts(filters);
  const { data: categories, isLoading: categoriesLoading } = useCategories(filters);

  if (kpisLoading || !kpis) {
    return <div data-testid="dashboard-loading" className="p-6">Carregando KPIs...</div>;
  }
  if (kpisError) {
    return <div data-testid="dashboard-error" className="p-6 text-red-500">Erro ao carregar KPIs.</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Filtros de data */}
      <div className="flex items-end gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data inicial</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data final</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Filtrar
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Limpar
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div data-testid="kpi-orders">
          <KpiCard title="Total de Pedidos" value={kpis.total_orders} />
        </div>
        <div data-testid="kpi-revenue">
          <KpiCard
            title="Receita Total"
            value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(kpis.revenue))}
          />
        </div>
        <div data-testid="kpi-avg-ticket">
          <KpiCard
            title="Ticket Médio"
            value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(kpis.average_ticket))}
          />
        </div>
      </div>

      {/* Gráfico de Receita Mensal */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Receita Mensal</h2>
        {revenueLoading ? (
          <div className="h-64 flex items-center justify-center text-gray-400">Carregando gráfico...</div>
        ) : revenue && revenue.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">Sem dados de receita.</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Clientes */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Top 10 Clientes</h2>
          {customersLoading ? (
            <div className="text-gray-400">Carregando...</div>
          ) : topCustomers && topCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2">Cliente</th>
                    <th className="text-right py-2">Total Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((c: any) => (
                    <tr key={c.id} className="border-b dark:border-gray-700">
                      <td className="py-2">{c.name}</td>
                      <td className="text-right py-2">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(c.revenue))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-400">Nenhum cliente encontrado.</div>
          )}
        </div>

        {/* Top Produtos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Top 10 Produtos</h2>
          {productsLoading ? (
            <div className="text-gray-400">Carregando...</div>
          ) : topProducts && topProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2">Produto</th>
                    <th className="text-right py-2">Unidades Vendidas</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p: any) => (
                    <tr key={p.id} className="border-b dark:border-gray-700">
                      <td className="py-2">{p.name}</td>
                      <td className="text-right py-2">{p.units_sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-400">Nenhum produto encontrado.</div>
          )}
        </div>
      </div>

      {/* Vendas por Categoria */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Vendas por Categoria</h2>
        {categoriesLoading ? (
          <div className="h-64 flex items-center justify-center text-gray-400">Carregando gráfico...</div>
        ) : categories && categories.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">Sem dados de categorias.</div>
        )}
      </div>
    </div>
  );
}