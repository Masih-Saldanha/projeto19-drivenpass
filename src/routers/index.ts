import { Router } from "express";

import authRouter from "./authRouter.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
import credentialRouter from "./credentialRouter.js";

const router = Router();

router.use(authRouter);
router.use(validateToken);
router.use(credentialRouter);

export default router;