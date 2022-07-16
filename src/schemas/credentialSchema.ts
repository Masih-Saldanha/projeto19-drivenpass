import Joi from "joi";

import { CredentialData } from "../repositories/credentialRepository.js";

const credential = Joi.object<CredentialData>({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    user: Joi.string().required(),
    password: Joi.string().required()
});

const credentialSchema = {
    credential
};

export default credentialSchema;