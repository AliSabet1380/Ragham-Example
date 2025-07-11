import { z } from "zod";

export const AdminUpdateUser = z
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

    userId: z.string({
      required_error: "userId اجباری است",
      invalid_type_error: "userId باید string باشد",
    }),

    /// Avatar Update
  })
  .strict({
    message: "فقط مقادیر password, username و userId مجاز هستند",
  });

export const AdminDeleteUser = z
  .object({
    userId: z.string({
      required_error: "userId اجباری است",
      invalid_type_error: "userId باید string باشد",
    }),
  })
  .strict({
    message: "فقط مقادیر userId مجاز هستند",
  });

export const AdminFindAllQuerySchema = z
  .object({
    page: z.string().optional(),
    limit: z.string().optional(),
  })
  .strict({
    message: "فقط مقادیر page و limit مجاز هستند",
  });
export const AdminFindOneParamsSchema = z
  .object({
    userId: z.string({
      required_error: "id اجباری است",
      invalid_type_error: "id باید string باشد",
    }),
  })
  .strict({
    message: "فقط مقادیر userId مجاز هستند",
  });

export type AdminUpdateUserType = z.infer<typeof AdminUpdateUser>;
export type AdminDeleteUserType = z.infer<typeof AdminDeleteUser>;
export type AdminFindAllQueryType = z.infer<typeof AdminFindAllQuerySchema>;
export type AdminFindOneParamsType = z.infer<typeof AdminFindOneParamsSchema>;
