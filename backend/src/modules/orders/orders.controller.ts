import { Request, Response } from "express";
import { OrdersService } from "./orders.service";
import { jsonToCsv } from "../../utils/csv";

export class OrdersController {
  async findAll(req: Request, res: Response) {
    try {
      const { status, customerName, startDate, endDate, page, limit } = req.query;
      const service = new OrdersService();
      const orders = await service.findAll(
        {
          status: status as string | undefined,
          customerName: customerName as string | undefined,
          startDate: startDate as string | undefined,
          endDate: endDate as string | undefined,
        },
        {
          page: page ? parseInt(page as string) : undefined,
          limit: limit ? parseInt(limit as string) : undefined,
        }
      );
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    try {
      const service = new OrdersService();
      const order = await service.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar pedido" });
    }
  }
  async exportCsv(req: Request, res: Response) {
  try {
    const { status, customerName, startDate, endDate } = req.query;
    const service = new OrdersService();
    // Buscar sem paginação (limite alto)
    const result = await service.findAll(
      {
        status: status as string | undefined,
        customerName: customerName as string | undefined,
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined,
      },
      { limit: 10000, page: 1 }
    );
    const orders = result.data;
    const csvData = orders.map((order: any) => ({
      ID: order.id,
      Cliente: order.customer.name,
      Status: order.status,
      Valor: Number(order.total_amount),
      Data: new Date(order.created_at).toLocaleDateString("pt-BR"),
    }));
    const csv = jsonToCsv(csvData);
    res.header("Content-Type", "text/csv");
    res.attachment("pedidos.csv");
    return res.send(csv);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao exportar CSV" });
  }
}

async exportCsvById(req: Request<{ id: string }>, res: Response) {
  try {
    const service = new OrdersService();
    const order = await service.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

    const items = order.order_items.map((item: any) => ({
      Produto: item.product.name,
      Quantidade: item.quantity,
      Preco_Unitario: Number(item.unit_price).toFixed(2),
      Subtotal: (item.quantity * Number(item.unit_price)).toFixed(2),
    }));

    // Cabeçalho com informações do pedido
    const header = [
      `Pedido: ${order.id}`,
      `Cliente: ${order.customer.name} (${order.customer.email})`,
      `Status: ${order.status}`,
      `Data: ${new Date(order.created_at).toLocaleDateString("pt-BR")}`,
      `Total: ${Number(order.total_amount).toFixed(2)}`,
      "",
    ].join("\n");

    const csvItems = jsonToCsv(items);
    const csv = header + "\n" + csvItems;

    res.header("Content-Type", "text/csv");
    res.attachment(`pedido_${order.id.slice(0, 8)}.csv`);
    return res.send(csv);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao exportar CSV" });
  }
}
}