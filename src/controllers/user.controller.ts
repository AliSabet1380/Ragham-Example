import { Errors } from "@errors";
import { hashPassword } from "@utils/crypt";
import { catchAsync } from "@utils/catch-async";
import { AppError } from "@utils/errors/app-error";
import { UserService } from "@services/user.service";

import type {
  AdminDeleteUserType,
  AdminFindAllQueryType,
  AdminFindOneParamsType,  AdminUpdateUserType,
} from "@schemas/admin.schema";
import type { UserUpdateType } from "@schemas/user.schema";

class UserController {
  profile = catchAsync(async (req, res, next) => {
    const userService = new UserService();

    const user = await userService.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!user) return next(new AppError(...Errors.Internal));

    res.status(200).json({
      status: "success",
      message: "اطالاعات کاربر با موفقیت یافت شد",
      data: user,
    });
  });

  updateUser = catchAsync<UserUpdateType>(async (req, res, next) => {
    const data = req.body;

    // TODO: Avatar Update

    const userService = new UserService();

    const updatedUser = await userService.update({
      where: {
        id: req.userId,
      },
      data,
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

    if (!updatedUser) return next(new AppError(...Errors.Internal));

    res.status(200).json({
      status: "success",
      message: "اطلاعات کاربر با موفقیت به روز رسانی شد",
      data: updatedUser,
    });
  });

  deleteUser = catchAsync(async (req, res, next) => {
    const userService = new UserService();

    const user = await userService.delete({
      id: req.userId,
    });

    if (!user) return next(new AppError(...Errors.Internal));

    res.status(200).json({
      status: "success",
      message: "کاربر با موفقیت حذف شد",
      data: user,
    });
  });

  adminUpdateUser = catchAsync<AdminUpdateUserType>(async (req, res, next) => {
    const data = req.body;

    // TODO: Avatar Update

    const useService = new UserService();

    let hashedPassword;
    if (data.password) {
      hashedPassword = await hashPassword(data.password);
    }

    const user = await useService.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user) return next(new AppError(...Errors.NotFound));

    const updatedUser = await useService.update({
      where: {
        id: data.userId,
      },
      data: {
        username: data.username || user.username,
        password: hashedPassword || user.password,
        // Avatar
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

    if (!updatedUser) return next(new AppError(...Errors.Internal));

    res.status(200).json({
      status: "success",
      message: "اطلاعات کاربر با موفقیت به روزرسانی شد",
      data: updatedUser,
    });
  });

  adminDeleteUser = catchAsync<AdminDeleteUserType>(async (req, res, next) => {
    const { userId } = req.body;

    const userService = new UserService();

    const deletedUser = await userService.delete({
      id: userId,
    });
    if (!deletedUser) return next(new AppError(...Errors.Internal));

    res.status(200).json({
      status: "success",
      message: "کاربر با موفقیت حذف شد",
      data: deletedUser,
    });
  });

  findAll = catchAsync<any, any, AdminFindAllQueryType>(
    async (req, res, next) => {
      const userService = new UserService();

      const data = await userService.paginate({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        where: {
          deletedAt: null,
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

      res.status(200).json({
        status: "success",
        message: "کاربران با موفقیت یافت شدند",
        data,
      });
    }
  );

  findOne = catchAsync<any, AdminFindOneParamsType>(
    async (req, res, next) => {
      const userService = new UserService();

      const user = await userService.findUnique({
        where: {
          id: req.params.userId,
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

      if (!user) return next(new AppError(...Errors.NotFound));

      res.status(200).json({
        status: "success",
        message: "کاربر با موفقیت یافت شد",
        data: user,
      });
    }
  );
}

export const userController = new UserController();
