import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { registerCredential } from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter.post("/credential/register", registerCredential);

export default credentialRouter;