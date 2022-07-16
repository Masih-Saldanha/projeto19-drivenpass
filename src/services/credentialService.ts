import cryptr from "../cryptrConfig.js";
import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CredentialData, findCredentialByUserIdAndTitle, getAllCredentialsByUserId, getCredentialByCredentialId, insertCredential } from "../repositories/credentialRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

function encryptData(data: string) {
    return cryptr.encrypt(data);
};

async function registerCredential(userDataFromToken: TokenData, dataFromBody: CredentialData) {
    dataFromBody.userId = userDataFromToken.id;

    const encryptedPassword = encryptData(dataFromBody.password);

    dataFromBody.password = encryptedPassword

    const existTitle = await findCredentialByUserIdAndTitle(dataFromBody);
    throwError(!!existTitle, "Conflict", `The title ${dataFromBody.title} is already in use on another credential on your account`);

    await insertCredential(dataFromBody);
};

function decryptData(data: string) {
    return cryptr.decrypt(data);
};

async function getAllCredentials(userId: number) {
    const allCredentials = await getAllCredentialsByUserId(userId);

    allCredentials.forEach(credential => {
        credential.password = decryptData(credential.password);
        delete credential.id;
        delete credential.userId;
    });

    return allCredentials;
};

async function getCredential(credentialId: number, userId: number) {
    const credentials = await getCredentialByCredentialId(credentialId);
    throwError(!credentials, "Not Found", `The credential with the ID: "${credentialId}" doesn't exist`);

    credentials.password = decryptData(credentials.password);
    throwError(credentials.userId !== userId, "Unauthorized", `You doesn't have access to a credential that's not yours`)

    delete credentials.id;
    delete credentials.userId;

    return credentials;
};

const credentialService = {
    registerCredential,
    getAllCredentials,
    getCredential
};

export default credentialService;