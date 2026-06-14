import { api } from "./axios";

export interface ProductFilters {
  search?: string;
  category?: string;
}

export const getProducts = async (
  page = 1,
  limit = 10,
  filters?: ProductFilters
) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  if (filters?.search) params.append("search", filters.search);
  if (filters?.category) params.append("category", filters.category);

  const res = await api.get("/products", { params });
  return res.data;
};