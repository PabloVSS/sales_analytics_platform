import { KpiDTO } from "./dashboard.dto";

export class DashboardMapper {
  static toKpis(raw: any[]): KpiDTO {
    const row = raw[0];

    return {
      total_orders: Number(row.total_orders),
      revenue: Number(row.revenue),
      average_ticket: Number(row.average_ticket),
    };
  }

  static toList<T>(rows: any[]): T[] {
    return rows.map((r) => {
      const clean: any = {};

      for (const key of Object.keys(r)) {
        const value = r[key];

        clean[key] =
          typeof value === "bigint"
            ? Number(value)
            : value instanceof Date
            ? value.toISOString()
            : typeof value === "object" && value?.toString?.name === "toString"
            ? Number(value) // Prisma Decimal fallback
            : value;
      }

      return clean as T;
    });
  }
}