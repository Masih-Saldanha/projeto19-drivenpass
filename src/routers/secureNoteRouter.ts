import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";
import { deleteSecureNoteBySecureNoteId, getAllSecureNotes, getSecureNoteBySecureNoteId, registerSecureNote } from "../controllers/secureNoteController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
const secureNoteRouter = Router();

secureNoteRouter.post("/securenote/register", validateToken, validateSchema(secureNoteSchema.secureNote), registerSecureNote);
secureNoteRouter.get("/securenote/getall", validateToken, getAllSecureNotes);
secureNoteRouter.get("/securenote/get/:secureNoteId", validateToken, getSecureNoteBySecureNoteId);
secureNoteRouter.delete("/securenote/delete/:secureNoteId", validateToken, deleteSecureNoteBySecureNoteId);

export default secureNoteRouter;