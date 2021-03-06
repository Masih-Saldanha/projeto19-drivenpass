import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";
import { deleteWifiByWifiId, getAllWifis, getWifiByWifiId, registerWifi } from "../controllers/wifiController.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
const wifiRouter = Router();

wifiRouter.post("/wifi/register", validateToken, validateSchema(wifiSchema.wifi), registerWifi);
wifiRouter.get("/wifi/getall", validateToken, getAllWifis);
wifiRouter.get("/wifi/get/:wifiId", validateToken, getWifiByWifiId);
wifiRouter.delete("/wifi/delete/:wifiId", validateToken, deleteWifiByWifiId);

export default wifiRouter;