import { Router } from "express";

import { userController } from "@controllers/user.controller";

import { auth } from "@middlewares/auth/auth";

import { UpdateUserSchema } from "@schemas/user.schema";
import {
  AdminDeleteUser,
  AdminFindAllQuerySchema,
  AdminFindOneParamsSchema,
  AdminUpdateUser,
} from "@schemas/admin.schema";
import { validate } from "@middlewares/validate/request-validate";

const router = Router();

router.get(
  "/",
  auth.authentication,
  auth.authorization("admin"),
  validate({
    query: AdminFindAllQuerySchema,
  }),
  userController.findAll
);
router.get(
  "/:userId",
  auth.authentication,
  auth.authorization("admin"),
  validate({
    params: AdminFindOneParamsSchema,
  }),
  userController.findOne
);
router.get("/profile", auth.authentication, userController.profile);

router.patch(
  "/",
  auth.authentication,
  validate({
    body: UpdateUserSchema,
  }),
  userController.updateUser
);
router.delete("/", auth.authentication, userController.deleteUser);

router.patch(
  "/admin",
  auth.authentication,
  auth.authorization("admin"),
  validate({
    body: AdminUpdateUser,
  }),
  userController.adminUpdateUser
);
router.delete(
  "/admin",
  auth.authentication,
  auth.authorization("admin"),
  validate({
    body: AdminDeleteUser,
  }),
  userController.adminDeleteUser
);

export default router;
