import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../api/dashboard";
import type { DashboardFilters } from "../../api/dashboard";

export function useTopProducts(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ["topProducts", filters],
    queryFn: () => getTopProducts(filters),
  });
}