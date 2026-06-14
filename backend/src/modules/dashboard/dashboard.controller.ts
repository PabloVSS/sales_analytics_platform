import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";
import { DashboardMapper } from "./dashboard.mapper";

export class DashboardController {
  async kpis(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const service = new DashboardService();
      const data = await service.getKpis({
        startDate: startDate as string,
        endDate: endDate as string,
      });
      return res.json(DashboardMapper.toKpis(data as any[]));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async monthlyRevenue(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
    const service = new DashboardService();
    const data = await service.getMonthlyRevenue({
      startDate: startDate as string,
      endDate: endDate as string,
    });
    return res.json(DashboardMapper.toList(data as any[]));
  }

  async topCustomers(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
    const service = new DashboardService();
    const data = await service.getTopCustomers({
      startDate: startDate as string,
      endDate: endDate as string,
    });
    return res.json(DashboardMapper.toList(data as any[]));
  }

  async topProducts(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
    const service = new DashboardService();
    const data = await service.getTopProducts({
      startDate: startDate as string,
      endDate: endDate as string,
    });
    return res.json(DashboardMapper.toList(data as any[]));
  }

  async categories(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
    const service = new DashboardService();
    const data = await service.getCategories({
      startDate: startDate as string,
      endDate: endDate as string,
    });
    return res.json(DashboardMapper.toList(data as any[]));
  }
}