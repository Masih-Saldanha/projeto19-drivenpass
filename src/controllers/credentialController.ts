import { NextFunction, Request, Response } from "express";

import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CredentialData } from "../repositories/credentialRepository.js";
import credentialService from "../services/credentialService.js";

export async function registerCredential(req: Request, res: Response, next: NextFunction) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const dataFromBody: CredentialData = req.body;

    await credentialService.registerCredential(userDataFromToken, dataFromBody);

    res.sendStatus(201);
};

export async function getAllCredentials(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;

    const credentials = await credentialService.getAllCredentials(userDataFromToken.id);

    res.status(200).send(credentials);
};

export async function getCredentialByCredentialId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const credentialId = parseInt(req.params.credentialId);

    const credential = await credentialService.getCredential(credentialId, userDataFromToken.id);

    res.status(200).send(credential);
};