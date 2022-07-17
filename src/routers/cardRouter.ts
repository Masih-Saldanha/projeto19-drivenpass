import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
import { deleteCardByCardId, getAllCards, getCardByCardId, registerCard } from "../controllers/cardController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
const cardRouter = Router();

cardRouter.post("/card/register", validateToken, validateSchema(cardSchema.card), registerCard);
cardRouter.get("/card/getall", validateToken, getAllCards);
cardRouter.get("/card/get/:cardId", validateToken, getCardByCardId);
cardRouter.delete("/card/delete/:cardId", validateToken, deleteCardByCardId);

export default cardRouter;