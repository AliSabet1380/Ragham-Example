// 3rd-party lib
import { Router } from "express";

// local modules
import auth from "@routes/auth/auth.route";
import user from "@routes/user/user.route";

// Root Router
const rootRouter = Router();

// Routes
rootRouter.use("/auth", auth);
rootRouter.use("/user", user);

// Export
export default rootRouter;
