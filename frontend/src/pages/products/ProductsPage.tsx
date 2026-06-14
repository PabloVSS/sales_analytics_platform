import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products";
import { Pagination } from "../../components/ui/Pagination";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, search, category],
    queryFn: () => getProducts(page, limit, { search, category }),
  });

  const products: Product[] = data?.data || [];
  const meta = data?.meta;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setPage(1);
  };

  if (isLoading || !data) {
    return (
      <div data-testid="products-loading" className="p-6">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="products-error" className="p-6 text-red-500">
        Erro ao carregar produtos.
      </div>
    );
  }

  return (
    <div data-testid="products-list" className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Produtos
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buscar</label>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Nome do produto"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Categoria</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="">Todas</option>
            {/* Você pode popular dinamicamente ou deixar fixo */}
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Móveis">Móveis</option>
            <option value="Software">Software</option>
            <option value="Serviços">Serviços</option>
            <option value="Books">Books</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Limpar filtros
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Preço
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
          Nenhum produto encontrado.
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