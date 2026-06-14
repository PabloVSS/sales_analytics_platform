import { useQuery } from "@tanstack/react-query";
import { getMonthlyRevenue } from "../../api/dashboard";
import type { DashboardFilters } from "../../api/dashboard";

export function useMonthlyRevenue(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ["monthlyRevenue", filters],
    queryFn: () => getMonthlyRevenue(filters),
  });
}