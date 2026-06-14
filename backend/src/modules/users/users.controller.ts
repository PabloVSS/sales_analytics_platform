import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {
  async findAll(req: Request, res: Response) {
    const service = new UsersService();
    const users = await service.findAll();
    return res.json(users);
  }

  async findById(req: Request<{ id: string }>, res: Response) {
    const service = new UsersService();
    const user = await service.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }
}