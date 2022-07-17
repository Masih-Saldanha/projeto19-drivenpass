import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";
import { deleteWifiByWifiId, getAllWifis, getWifiByWifiId, registerWifi } from "../controllers/wifiController.js";
const wifiRouter = Router();

wifiRouter.post("/wifi/register", validateSchema(wifiSchema.wifi), registerWifi);
wifiRouter.get("/wifi/getall", getAllWifis);
wifiRouter.get("/wifi/get/:wifiId", getWifiByWifiId);
wifiRouter.delete("/wifi/delete/:wifiId", deleteWifiByWifiId);

export default wifiRouter;