import { NextFunction, Request, Response } from "express";

import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { WifiData } from "../repositories/wifiRepository.js";
import wifiService from "../services/wifiService.js";

export async function registerWifi(req: Request, res: Response, next: NextFunction) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const dataFromBody: WifiData = req.body;

    await wifiService.registerWifi(userDataFromToken, dataFromBody);

    res.sendStatus(201);
};

export async function getAllWifis(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;

    const wifis = await wifiService.getAllWifis(userDataFromToken.id);

    res.status(200).send(wifis);
};

export async function getWifiByWifiId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const wifiId = parseInt(req.params.wifiId);

    const wifi = await wifiService.getWifi(wifiId, userDataFromToken.id);

    res.status(200).send(wifi);
};

export async function deleteWifiByWifiId(req: Request, res: Response) {
    const userDataFromToken: TokenData = res.locals.userDataFromToken;
    const wifiId = parseInt(req.params.wifiId);

    await wifiService.deleteWifi(wifiId, userDataFromToken.id);

    res.sendStatus(200);
};