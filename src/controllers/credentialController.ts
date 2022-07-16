import { NextFunction, Request, Response } from "express";

export async function registerCredential(req: Request, res: Response, next: NextFunction) {
    const userDataFromToken: { id: number, email: string, iat: number } = res.locals.userDataFromToken;
    console.log(userDataFromToken);
    res.sendStatus(200);
}