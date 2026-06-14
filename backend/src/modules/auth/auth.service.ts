import bcrypt from "bcrypt";
import { prisma } from "../../config/database";
import { generateToken } from "../../utils/jwt";

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    return {
      token: generateToken({ id: user.id, role: user.role }),
    };
  }
}