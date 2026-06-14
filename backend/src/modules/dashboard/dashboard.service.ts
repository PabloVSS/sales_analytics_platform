import { prisma } from "../../config/database";

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
}

export class DashboardService {
  async getKpis(filters?: DashboardFilters) {
    let where = "";
    if (filters?.startDate) where += ` AND o.created_at >= '${filters.startDate}T00:00:00Z'`;
    if (filters?.endDate) where += ` AND o.created_at <= '${filters.endDate}T23:59:59Z'`;

    return prisma.$queryRawUnsafe(`
      SELECT
        COUNT(*) AS total_orders,
        SUM(total_amount) AS revenue,
        AVG(total_amount) AS average_ticket
      FROM sales.orders o
      WHERE o.status = 'PAID' ${where}
    `);
  }

  async getMonthlyRevenue(filters?: DashboardFilters) {
    let where = "";
    if (filters?.startDate) where += ` AND o.created_at >= '${filters.startDate}T00:00:00Z'`;
    if (filters?.endDate) where += ` AND o.created_at <= '${filters.endDate}T23:59:59Z'`;

    return prisma.$queryRawUnsafe(`
      SELECT
        TO_CHAR(o.created_at, 'YYYY-MM') AS month,
        SUM(o.total_amount) AS revenue
      FROM sales.orders o
      WHERE o.status = 'PAID' ${where}
      GROUP BY month
      ORDER BY month
    `);
  }

  async getTopCustomers(filters?: DashboardFilters) {
    let where = "";
    if (filters?.startDate) where += ` AND o.created_at >= '${filters.startDate}T00:00:00Z'`;
    if (filters?.endDate) where += ` AND o.created_at <= '${filters.endDate}T23:59:59Z'`;

    return prisma.$queryRawUnsafe(`
      SELECT
        c.id,
        c.name,
        SUM(o.total_amount) AS revenue
      FROM sales.customers c
      JOIN sales.orders o ON c.id = o.customer_id
      WHERE o.status = 'PAID' ${where}
      GROUP BY c.id, c.name
      ORDER BY revenue DESC
      LIMIT 10
    `);
  }

  async getTopProducts(filters?: DashboardFilters) {
    let where = "";
    if (filters?.startDate) where += ` AND o.created_at >= '${filters.startDate}T00:00:00Z'`;
    if (filters?.endDate) where += ` AND o.created_at <= '${filters.endDate}T23:59:59Z'`;

    return prisma.$queryRawUnsafe(`
      SELECT
        p.id,
        p.name,
        SUM(oi.quantity) AS units_sold
      FROM sales.products p
      JOIN sales.order_items oi ON p.id = oi.product_id
      JOIN sales.orders o ON oi.order_id = o.id
      WHERE o.status = 'PAID' ${where}
      GROUP BY p.id, p.name
      ORDER BY units_sold DESC
      LIMIT 10
    `);
  }

  async getCategories(filters?: DashboardFilters) {
    let where = "";
    if (filters?.startDate) where += ` AND o.created_at >= '${filters.startDate}T00:00:00Z'`;
    if (filters?.endDate) where += ` AND o.created_at <= '${filters.endDate}T23:59:59Z'`;

    return prisma.$queryRawUnsafe(`
      SELECT
        p.category,
        SUM(oi.total_price) AS revenue
      FROM sales.products p
      JOIN sales.order_items oi ON p.id = oi.product_id
      JOIN sales.orders o ON oi.order_id = o.id
      WHERE o.status = 'PAID' ${where}
      GROUP BY p.category
      ORDER BY revenue DESC
    `);
  }
}