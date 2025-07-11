import { z } from "zod";

export const UpdateUserSchema = z
  .object({
    password: z
      .string({
        required_error: "password اجباری است",
        invalid_type_error: "password باید string باشد",
      })
      .min(6, "password باید حداقل 6 کاراکتر باشد")
      .optional(),
    username: z
      .string({
        required_error: "username اجباری است",
        invalid_type_error: "username باید string باشد",
      })
      .min(3, "username باید حداقل 3 کاراکتر باشد")
      .max(15, "username باید حداکثر 15 کاراکتر باشد")
      .optional(),

    // Avatar update
  })
  .strict({
    message: "فقط مقادیر password و username مجاز هستند",
  });

export type UserUpdateType = z.infer<typeof UpdateUserSchema>;
