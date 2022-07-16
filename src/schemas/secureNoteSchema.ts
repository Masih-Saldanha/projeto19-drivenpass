import Joi from "joi";

import { SecureNoteData } from "../repositories/secureNoteRepository.js";

const secureNote = Joi.object<SecureNoteData>({
    title: Joi.string().max(50).required(),
    note: Joi.string().max(1000).required()
});

const secureNoteSchema = {
    secureNote
};

export default secureNoteSchema;