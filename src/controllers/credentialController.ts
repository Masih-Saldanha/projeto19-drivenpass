import { NextFunction, Request, Response } from "express";

import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CredentialData } from "../repositories/credentialRepository.js";
import credentialService from "../services/credentialService.js";

export async function registerCredential(req: Request, res: Response, next: NextFunction) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const dataFromBody: CredentialData = req.body;

    await credentialService.registerCredential(userDataFromToken, dataFromBody);

    res.sendStatus(201);
}