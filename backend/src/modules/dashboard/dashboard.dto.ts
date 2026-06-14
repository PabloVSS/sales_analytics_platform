export interface KpiDTO {
  total_orders: number;
  revenue: number;
  average_ticket: number;
}

export interface MonthlyRevenueDTO {
  month: string;
  revenue: number;
}

export interface TopCustomerDTO {
  customer_id: string;
  name: string;
  total_spent: number;
}

export interface TopProductDTO {
  product_id: string;
  name: string;
  total_sold: number;
}

export interface CategoryDTO {
  category: string;
  total: number;
}