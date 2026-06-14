import { api } from "./axios";

export interface OrderFilters {
  status?: string;
  customerName?: string;
  startDate?: string;
  endDate?: string;
}

export const getOrders = async (filters: OrderFilters, page = 1, limit = 10) => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.customerName) params.append("customerName", filters.customerName);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  params.append("page", String(page));
  params.append("limit", String(limit));

  const res = await api.get("/orders", {
    params,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const getOrderById = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/orders/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};