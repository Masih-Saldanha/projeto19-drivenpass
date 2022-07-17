import { WifiPasswords } from "@prisma/client";

import { prisma } from "../config/database.js";

export type WifiData = Omit<WifiPasswords, "id">

export async function insertWifi(wifiData: WifiData) {
    await prisma.wifiPasswords.create({ data: wifiData });
};

export async function getAllWifisByUserId(userId: number) {
    return prisma.wifiPasswords.findMany({
        where: {
            userId
        }
    });
};

export async function getWifiByWifiId(wifiId: number) {
    return prisma.wifiPasswords.findUnique({
        where: {
            id: wifiId
        }
    });
};

export async function deleteWifiByWifiId(wifiId: number) {
    await prisma.wifiPasswords.delete({
        where: {
            id: wifiId
        }
    });
};