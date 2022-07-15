import Joi from "joi";

const user = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});

const authSchema = {
    user
}

export default authSchema;