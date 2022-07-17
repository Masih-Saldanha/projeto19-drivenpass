import { Cards } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CardData = Omit<Cards, "id">

export async function findCardByUserIdAndTitle(cardData: CardData) {
    return prisma.cards.findUnique({
        where: {
            userId_title: {
                userId: cardData.userId,
                title: cardData.title
            }
        }
    });
};

export async function insertCard(cardData: CardData) {
    await prisma.cards.create({ data: cardData });
};

export async function getAllCardsByUserId(userId: number) {
    return prisma.cards.findMany({
        where: {
            userId
        }
    });
};

export async function getCardByCardId(cardId: number) {
    return prisma.cards.findUnique({
        where: {
            id: cardId
        }
    });
};

export async function deleteCardByCardId(cardId: number) {
    await prisma.cards.delete({
        where: {
            id: cardId
        }
    });
};