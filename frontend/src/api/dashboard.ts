import { api } from "./axios";

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
}

const buildParams = (filters?: DashboardFilters) => {
  const params = new URLSearchParams();
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  return params;
};

export const getKpis = async (filters?: DashboardFilters) => {
  const res = await api.get("/dashboard/kpis", { params: buildParams(filters) });
  return res.data;
};

export const getMonthlyRevenue = async (filters?: DashboardFilters) => {
  const res = await api.get("/dashboard/monthly-revenue", { params: buildParams(filters) });
  return res.data;
};

export const getTopCustomers = async (filters?: DashboardFilters) => {
  const res = await api.get("/dashboard/top-customers", { params: buildParams(filters) });
  return res.data;
};

export const getTopProducts = async (filters?: DashboardFilters) => {
  const res = await api.get("/dashboard/top-products", { params: buildParams(filters) });
  return res.data;
};

export const getCategories = async (filters?: DashboardFilters) => {
  const res = await api.get("/dashboard/categories", { params: buildParams(filters) });
  return res.data;
};