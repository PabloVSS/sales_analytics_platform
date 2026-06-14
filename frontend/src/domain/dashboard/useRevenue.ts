import { useQuery } from "@tanstack/react-query";
import { getMonthlyRevenue } from "../../api/dashboard";

export function useRevenue() {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: getMonthlyRevenue,
  });
}