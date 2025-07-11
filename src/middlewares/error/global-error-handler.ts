import type { ErrorRequestHandler } from "express";

import { AppError } from "@utils/errors/app-error";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
    return; // Return void explicitly here
  }

  if (err.message === "request size did not match content length") {
    res.status(400).json({
      success: false,
      message: "در این متد مجاز به ارسال داده در بدنه درخواست نمی باشید.",
    });
  }
  res.status(500).json({
    success: false,
    message: "خطای سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.",
  });
};
