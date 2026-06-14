import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema } from "./auth.schemas";

export class AuthController {
  async login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Validation error", errors: parsed.error.flatten() });
    }

    const { email, password } = parsed.data;
    const service = new AuthService();
    const result = await service.login(email, password);
    return res.json(result);
  }
}