import { BaseService } from "@core";
import { prisma } from "@db";

type User = typeof prisma.user;

export class UserService extends BaseService<User> {
  constructor() {
    super(prisma, prisma.user);
  }
}
