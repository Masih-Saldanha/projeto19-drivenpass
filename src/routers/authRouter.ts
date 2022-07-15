import { Router } from "express";

import authSchema from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema.user), signUp);
// authRouter.post(SIGNIN);

export default authRouter;