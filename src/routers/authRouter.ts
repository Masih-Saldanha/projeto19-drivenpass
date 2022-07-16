import { Router } from "express";

import authSchema from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { signIn, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema.user), signUp);
authRouter.post("/signin", validateSchema(authSchema.user), signIn);

export default authRouter;