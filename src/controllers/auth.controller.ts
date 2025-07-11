// Local Modules
import { catchAsync } from "@utils/catch-async";
import { AppError } from "@utils/errors/app-error";
import { AuthService } from "@services/auth.service";
import { comparePassword, hashPassword } from "@utils/crypt";
import { encode } from "@utils/cookie";

//  Local Types
import type {
  AuthenticationType,
  VerificationType,
} from "@schemas/auth.schema";

class AuthController {
  authentication = catchAsync<AuthenticationType>(async (req, res, next) => {
    const { username, password, email } = req.body; // type safety

    const authService = new AuthService(); //

    const hashedPassword = await hashPassword(password);

    const newUser = await authService.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    if (!newUser) return next(new AppError("خطا در ایجاد کاربر", 500));

    const token = await encode({ userId: newUser.id, role: newUser.role });

    res.status(201).json({
      status: "success",
      message: "کاربر ایجاد شد",
      data: { ...newUser, password: undefined },
      token,
    });
  });

  verification = catchAsync<VerificationType>(async (req, res, next) => {
    const { email, password } = req.body; // type safety

    const authService = new AuthService();

    const user = await authService.findUnique({
      where: {
        email,
      },
    });
    if (!user) return next(new AppError("کاربر یافت نشد", 404));

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect)
      return next(new AppError("کلمه عبور اشتباه است", 400));

    const token = await encode({ userId: user.id, role: user.role });

    res.status(200).json({
      status: "success",
      message: "کاربر تایید شد",
      data: { ...user, password: undefined },
      token,
    });
  });
}

export const authController = new AuthController();
