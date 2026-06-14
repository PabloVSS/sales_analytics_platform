import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/dashboard";
import type { DashboardFilters } from "../../api/dashboard";

export function useCategories(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ["categories", filters],
    queryFn: () => getCategories(filters),
  });
}