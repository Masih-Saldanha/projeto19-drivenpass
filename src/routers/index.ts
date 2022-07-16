import { Router } from "express";

import authRouter from "./authRouter.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
import credentialRouter from "./credentialRouter.js";
import secureNoteRouter from "./secureNoteRouter.js";

const router = Router();

router.use(authRouter);
router.use(validateToken);
router.use(credentialRouter);
router.use(secureNoteRouter);
// router.use(cardRouter);
// router.use(wifiRouter);

export default router;