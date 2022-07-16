import { Request, Response } from "express";

import { UserData } from "../repositories/authRepository.js";
import authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const userData: UserData = req.body;

    await authService.createUser(userData);

    res.sendStatus(201);
}

export async function signIn(req : Request, res : Response) {
    const userData: UserData = req.body;

    const token = await authService.signInUser(userData);

    res.status(200).send(token);
}