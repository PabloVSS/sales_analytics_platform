import { Request, Response } from "express";
import { CustomersService } from "./customers.service";

export class CustomersController {
  async findAll(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;
      const service = new CustomersService();
      const result = await service.findAll({
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar clientes" });
    }
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    const service = new CustomersService();
    const customer = await service.findById(req.params.id);
    return res.json(customer);
  }
}