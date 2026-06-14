import { prisma } from "../../config/database";
import { paginate, PaginationParams } from "../../utils/pagination";

export class CustomersService {
  async findAll(params?: PaginationParams) {
    return paginate(
      (args) =>
        prisma.customers.findMany({
          ...args,
          orderBy: { created_at: "desc" },
        }),
      () => prisma.customers.count(),
      params || {}
    );
  }

  async findById(id: string) {
    return prisma.customers.findUnique({
      where: { id },
      include: { orders: true },
    });
  }
}