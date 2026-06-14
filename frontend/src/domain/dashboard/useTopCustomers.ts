import { useQuery } from "@tanstack/react-query";
import { getTopCustomers } from "../../api/dashboard";
import type { DashboardFilters } from "../../api/dashboard";

export function useTopCustomers(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ["topCustomers", filters],
    queryFn: () => getTopCustomers(filters),
  });
}