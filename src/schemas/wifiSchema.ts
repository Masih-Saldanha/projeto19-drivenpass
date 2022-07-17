import Joi from "joi";

import { WifiData } from "../repositories/wifiRepository.js";

const wifi = Joi.object<WifiData>({
    title: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
});

const wifiSchema = {
    wifi
};

export default wifiSchema;