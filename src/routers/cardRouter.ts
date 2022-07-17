import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
import { deleteCardByCardId, getAllCards, getCardByCardId, registerCard } from "../controllers/cardController.js";
const cardRouter = Router();

cardRouter.post("/card/register", validateSchema(cardSchema.card), registerCard);
cardRouter.get("/card/getall", getAllCards);
cardRouter.get("/card/get/:cardId", getCardByCardId);
cardRouter.delete("/card/delete/:cardId", deleteCardByCardId);

export default cardRouter;