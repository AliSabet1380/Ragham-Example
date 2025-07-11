import { Router } from "express";

import { authController } from "@controllers/auth.controller";
import { validate } from "@middlewares/validate/request-validate";
import { AuthenticationSchema, VerificationSchema } from "@schemas/auth.schema";

const router = Router();

router.post(
  "/authentication",
  validate({
    body: AuthenticationSchema,
  }),
  authController.authentication
);

router.post(
  "/verification",
  validate({
    body: VerificationSchema,
  }),
  authController.verification
);

export default router;
