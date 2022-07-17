import cryptr from "../config/cryptrConfig.js";
import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { WifiData, deleteWifiByWifiId, getAllWifisByUserId, getWifiByWifiId, insertWifi } from "../repositories/wifiRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerWifi(userDataFromToken: TokenData, dataFromBody: WifiData) {
    dataFromBody.userId = userDataFromToken.id;

    const encryptedPassword = cryptr.encrypt(dataFromBody.password);

    dataFromBody.password = encryptedPassword;

    await insertWifi(dataFromBody);
};

async function getAllWifis(userId: number) {
    const allWifis = await getAllWifisByUserId(userId);

    allWifis.forEach(wifi => {
        wifi.password = cryptr.decrypt(wifi.password);
        delete wifi.id;
        delete wifi.userId;
    });

    return allWifis;
};

async function getWifi(wifiId: number, userId: number) {
    const wifi = await wifiVerification(wifiId, userId);

    wifi.password = cryptr.decrypt(wifi.password);
    delete wifi.id;
    delete wifi.userId;

    return wifi;
};

async function deleteWifi(wifiId: number, userId: number) {
    const wifi = await wifiVerification(wifiId, userId);

    await deleteWifiByWifiId(wifi.id);
};

async function wifiVerification(wifiId: number, userId: number) {
    const wifi = await getWifiByWifiId(wifiId);
    throwError(!wifi, "Not Found", `The wifi with the ID: "${wifiId}" doesn't exist`);
    throwError(wifi.userId !== userId, "Unauthorized", `You doesn't have access to a wifi that's not yours`);
    return wifi;
};

const wifiService = {
    registerWifi,
    getAllWifis,
    getWifi,
    deleteWifi
};

export default wifiService;