import { BaseService } from "@core";
import { prisma } from "@db";

type Auth = typeof prisma.user;

export class AuthService extends BaseService<Auth> {
  constructor() {
    super(prisma, prisma.user);
  }
}
