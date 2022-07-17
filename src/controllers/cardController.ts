import { NextFunction, Request, Response } from "express";

import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CardData } from "../repositories/cardRepository.js";
import cardService from "../services/cardService.js";

export async function registerCard(req: Request, res: Response, next: NextFunction) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const dataFromBody: CardData = req.body;

    await cardService.registerCard(userDataFromToken, dataFromBody);

    res.sendStatus(201);
};

export async function getAllCards(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;

    const cards = await cardService.getAllCards(userDataFromToken.id);

    res.status(200).send(cards);
};

export async function getCardByCardId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const cardId = parseInt(req.params.cardId);

    const card = await cardService.getCard(cardId, userDataFromToken.id);

    res.status(200).send(card);
};

export async function deleteCardByCardId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const cardId = parseInt(req.params.cardId);

    await cardService.deleteCard(cardId, userDataFromToken.id);

    res.sendStatus(200);
};