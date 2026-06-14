import { prisma } from "../../config/database";
import { paginate, PaginationParams } from "../../utils/pagination";

export interface OrderFilters {
  status?: string;
  customerName?: string;
  startDate?: string;
  endDate?: string;
}

export class OrdersService {
  async findAll(filters: OrderFilters, pagination?: PaginationParams) {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status.toUpperCase();
    }
    if (filters.customerName) {
      where.customer = {
        name: { contains: filters.customerName, mode: "insensitive" },
      };
    }
    if (filters.startDate || filters.endDate) {
      where.created_at = {};
      if (filters.startDate) {
        const start = new Date(filters.startDate + "T00:00:00Z");
        if (!isNaN(start.getTime())) where.created_at.gte = start;
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate + "T23:59:59Z");
        if (!isNaN(end.getTime())) where.created_at.lte = end;
      }
    }

    return paginate(
      (args) =>
        prisma.orders.findMany({
          where,
          include: { customer: { select: { name: true } } },
          orderBy: { created_at: "desc" },
          ...args,
        }),
      () => prisma.orders.count({ where }),
      pagination || {}
    );
  }

  async findById(id: string) {
    return prisma.orders.findUnique({
      where: { id },
      include: {
        customer: { select: { name: true, email: true } },
        order_items: {
          include: { product: { select: { name: true } } },
        },
      },
    });
  }
}