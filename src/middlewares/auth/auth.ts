import { prisma } from "@db";
import { catchAsync } from "@utils/catch-async";
import { veifySession } from "@utils/cookie";
import { AppError } from "@utils/errors/app-error";

import { Errors } from "@errors"; // Can Be A Reach Error Object

class Auth {
  authentication = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("اطلاعات احراز هویت شما معتبر نیست", 401));
    }

    const token = authHeader.split(" ")[1];

    const payload = await veifySession(token);

    if (!payload) return next(new AppError("token شما معتبر نیست", 403));

    const user = await prisma.user.findUnique({
      where: {
        deletedAt: null,
        id: payload.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return next(new AppError("کاربر یافت نشد", 404));

    (req.userId = user.id), (req.role = user.role);

    next();
  });

  authorization = (roles: string[] | string) =>
    catchAsync(async (req, res, next) => {
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!req.role) {
        return next(new AppError(...Errors.Unauthorized));
      }

      if (!allowedRoles.includes(req.role))
        return next(new AppError(...Errors.Forbidden));

      next();
    });

  optionalAuthentication = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      this.authentication(req, res, next);
    } else {
      next();
    }
  });
}

export const auth = new Auth();
