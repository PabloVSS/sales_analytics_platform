import { api } from "./axios";

export const getCustomers = async (page = 1, limit = 10) => {
  const res = await api.get("/customers", { params: { page, limit } });
  return res.data;
};

export const getCustomerById = async (id: string) => {
  const res = await api.get(`/customers/${id}`);
  return res.data;
};