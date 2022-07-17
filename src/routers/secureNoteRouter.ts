import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";
import { deleteSecureNoteBySecureNoteId, getAllSecureNotes, getSecureNoteBySecureNoteId, registerSecureNote } from "../controllers/secureNoteController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
const secureNoteRouter = Router();

secureNoteRouter.use(validateToken);
secureNoteRouter.post("/securenote/register", validateSchema(secureNoteSchema.secureNote), registerSecureNote);
secureNoteRouter.get("/securenote/getall", getAllSecureNotes);
secureNoteRouter.get("/securenote/get/:secureNoteId", getSecureNoteBySecureNoteId);
secureNoteRouter.delete("/securenote/delete/:secureNoteId", deleteSecureNoteBySecureNoteId);

export default secureNoteRouter;