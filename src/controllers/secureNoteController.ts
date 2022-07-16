import { NextFunction, Request, Response } from "express";

import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { SecureNoteData } from "../repositories/secureNoteRepository.js";
import secureNoteService from "../services/secureNoteService.js";

export async function registerSecureNote(req: Request, res: Response, next: NextFunction) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const dataFromBody: SecureNoteData = req.body;

    await secureNoteService.registerSecureNote(userDataFromToken, dataFromBody);

    res.sendStatus(201);
};

export async function getAllSecureNotes(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;

    const secureNotes = await secureNoteService.getAllSecureNotes(userDataFromToken.id);

    res.status(200).send(secureNotes);
};

export async function getSecureNoteBySecureNoteId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const secureNoteId = parseInt(req.params.secureNoteId);

    const secureNote = await secureNoteService.getSecureNote(secureNoteId, userDataFromToken.id);

    res.status(200).send(secureNote);
};

export async function deleteSecureNoteBySecureNoteId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const secureNoteId = parseInt(req.params.secureNoteId);

    await secureNoteService.deleteSecureNote(secureNoteId, userDataFromToken.id);

    res.sendStatus(200);
};