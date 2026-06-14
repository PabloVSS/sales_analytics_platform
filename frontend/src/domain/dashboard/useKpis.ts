import { useQuery } from "@tanstack/react-query";
import { getKpis } from "../../api/dashboard";
import type { DashboardFilters } from "../../api/dashboard";

export function useKpis(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ["kpis", filters],
    queryFn: () => getKpis(filters),
  });
}