import Joi from "joi";

import { UserData } from "../repositories/authRepository.js";

const user = Joi.object<UserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});

const authSchema = {
    user
}

export default authSchema;