import { z } from "zod";

export const AuthenticationSchema = z.object({
  username: z
    .string({
      required_error: "username اجباری است",
      invalid_type_error: "username باید string باشد",
    })
    .min(3, "username باید حداقل 3 کاراکتر باشد")
    .max(15, "username باید حداکثر 15 کاراکتر باشد"),
  email: z
    .string({
      required_error: "email اجباری است",
      invalid_type_error: "email باید string باشد",
    })
    .email("email باید یک ایمیل باشد"),
  password: z
    .string({
      required_error: "password اجباری است",
      invalid_type_error: "password باید string باشد",
    })
    .min(6, "password باید حداقل 6 کاراکتر باشد"),
}).strict({
  message: "فقط مقادیر username, email و password مجاز هستند",
})

export const VerificationSchema = z.object({
  email: z
    .string({
      required_error: "email اجباری است",
      invalid_type_error: "email باید string باشد",
    })
    .email("email باید یک ایمیل باشد"),
  password: z
    .string({
      required_error: "password اجباری است",
      invalid_type_error: "password باید string باشد",
    })
    .min(6, "password باید حداقل 6 کاراکتر باشد"),
}).strict({
  message: "فقط مقادیر email و password مجاز هستند",
})

export type AuthenticationType = z.infer<typeof AuthenticationSchema>;
export type VerificationType = z.infer<typeof VerificationSchema>;
