import cryptr from "../config/cryptrConfig.js";
import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CardData, deleteCardByCardId, findCardByUserIdAndTitle, getAllCardsByUserId, getCardByCardId, insertCard } from "../repositories/cardRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerCard(userDataFromToken: TokenData, dataFromBody: CardData) {
    dataFromBody.userId = userDataFromToken.id;

    const encryptedPassword = cryptr.encrypt(dataFromBody.password);

    dataFromBody.password = encryptedPassword;

    const encryptedSecurityCode = cryptr.encrypt(dataFromBody.securityCode);

    dataFromBody.securityCode = encryptedSecurityCode;

    const existTitle = await findCardByUserIdAndTitle(dataFromBody);
    throwError(!!existTitle, "Conflict", `The title ${dataFromBody.title} is already in use on another card on your account`);

    await insertCard(dataFromBody);
};

async function getAllCards(userId: number) {
    const allCards = await getAllCardsByUserId(userId);

    allCards.forEach(card => {
        card.password = cryptr.decrypt(card.password);
        card.securityCode = cryptr.decrypt(card.securityCode);
        delete card.id;
        delete card.userId;
    });

    return allCards;
};

async function getCard(cardId: number, userId: number) {
    const card = await cardVerification(cardId, userId);

    card.password = cryptr.decrypt(card.password);
    card.securityCode = cryptr.decrypt(card.securityCode);
    delete card.id;
    delete card.userId;

    return card;
};

async function deleteCard(cardId: number, userId: number) {
    const card = await cardVerification(cardId, userId);

    await deleteCardByCardId(card.id);
};

async function cardVerification(cardId: number, userId: number) {
    const card = await getCardByCardId(cardId);
    throwError(!card, "Not Found", `The card with the ID: "${cardId}" doesn't exist`);
    throwError(card.userId !== userId, "Unauthorized", `You doesn't have access to a card that's not yours`);
    return card;
};

const cardService = {
    registerCard,
    getAllCards,
    getCard,
    deleteCard
};

export default cardService;