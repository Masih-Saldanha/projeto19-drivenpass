import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { deleteCredentialByCredentialId, getAllCredentials, getCredentialByCredentialId, registerCredential } from "../controllers/credentialController.js";
const credentialRouter = Router();

credentialRouter.post("/credential/register", validateSchema(credentialSchema.credential), registerCredential);
credentialRouter.get("/credential/getall", getAllCredentials);
credentialRouter.get("/credential/get/:credentialId", getCredentialByCredentialId);
credentialRouter.delete("/credential/delete/:credentialId", deleteCredentialByCredentialId);

export default credentialRouter;