import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { getAllCredentials, registerCredential } from "../controllers/credentialController.js";
const credentialRouter = Router();

credentialRouter.post("/credential/register", validateSchema(credentialSchema.credential), registerCredential);
credentialRouter.get("/credential/getall", getAllCredentials);

export default credentialRouter;