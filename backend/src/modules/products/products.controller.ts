import { Request, Response } from "express";
import { ProductsService } from "./products.service";

export class ProductsController {
  async findAll(req: Request, res: Response) {
    try {
      const { page, limit, search, category } = req.query;
      const service = new ProductsService();
      const result = await service.findAll(
        {
          search: search as string | undefined,
          category: category as string | undefined,
        },
        {
          page: page ? parseInt(page as string) : undefined,
          limit: limit ? parseInt(limit as string) : undefined,
        }
      );
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    const service = new ProductsService();
    const product = await service.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });
    return res.json(product);
  }
}