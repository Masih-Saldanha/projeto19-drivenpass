import { Router } from "express";

import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import secureNoteRouter from "./secureNoteRouter.js";
import cardRouter from "./cardRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;