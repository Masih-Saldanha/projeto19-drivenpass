import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { deleteCredentialByCredentialId, getAllCredentials, getCredentialByCredentialId, registerCredential } from "../controllers/credentialController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
const credentialRouter = Router();

credentialRouter.post("/credential/register", validateToken, validateSchema(credentialSchema.credential), registerCredential);
credentialRouter.get("/credential/getall", validateToken, getAllCredentials);
credentialRouter.get("/credential/get/:credentialId", validateToken, getCredentialByCredentialId);
credentialRouter.delete("/credential/delete/:credentialId", validateToken, deleteCredentialByCredentialId);

export default credentialRouter;