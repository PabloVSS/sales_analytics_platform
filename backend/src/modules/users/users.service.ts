import { prisma } from "../../config/database";

export class UsersService {
  async findAll() {
    return prisma.users.findMany({
      select: { id: true, email: true, role: true, created_at: true, updated_at: true },
    });
  }

  async findById(id: string) {
    return prisma.users.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, created_at: true, updated_at: true },
    });
  }
}