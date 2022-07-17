import DateExtension from '@joi/date';
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;

import { CardData } from "../repositories/cardRepository.js";

const card = Joi.object<CardData>({
    title: Joi.string().min(1).required(),
    number: Joi.string().creditCard().required(),
    name: Joi.string().min(1).required(),
    securityCode: Joi.string().pattern(/^[0-9]{3}$/).required(),
    expirationDate: Joi.date().format("MM/YY").required(),
    password: Joi.string().pattern(/^[0-9]{4}$/).required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
});

const cardSchema = {
    card
};

export default cardSchema;