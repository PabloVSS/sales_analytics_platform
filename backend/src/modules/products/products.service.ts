import { prisma } from "../../config/database";
import { paginate, PaginationParams } from "../../utils/pagination";

export interface ProductFilters {
  search?: string;
  category?: string;
}

export class ProductsService {
  async findAll(filters?: ProductFilters, params?: PaginationParams) {
    const where: any = {};

    if (filters?.search) {
      where.name = { contains: filters.search, mode: "insensitive" };
    }
    if (filters?.category) {
      where.category = { equals: filters.category, mode: "insensitive" };
    }

    return paginate(
      (args) =>
        prisma.products.findMany({
          where,
          ...args,
          orderBy: { created_at: "desc" },
        }),
      () => prisma.products.count({ where }),
      params || {}
    );
  }

  async findById(id: string) {
    return prisma.products.findUnique({ where: { id } });
  }
}