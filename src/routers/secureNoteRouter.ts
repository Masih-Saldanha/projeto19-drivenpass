import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";
import { deleteSecureNoteBySecureNoteId, getAllSecureNotes, getSecureNoteBySecureNoteId, registerSecureNote } from "../controllers/secureNoteController.js";
const secureNoteRouter = Router();

secureNoteRouter.post("/securenote/register", validateSchema(secureNoteSchema.secureNote), registerSecureNote);
secureNoteRouter.get("/securenote/getall", getAllSecureNotes);
secureNoteRouter.get("/securenote/get/:secureNoteId", getSecureNoteBySecureNoteId);
secureNoteRouter.delete("/securenote/delete/:secureNoteId", deleteSecureNoteBySecureNoteId);

export default secureNoteRouter;