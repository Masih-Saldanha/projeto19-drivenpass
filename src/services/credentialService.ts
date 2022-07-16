import cryptr from "../cryptrConfig.js";
import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CredentialData, deleteCredentialByCredentialId, findCredentialByUserIdAndTitle, getAllCredentialsByUserId, getCredentialByCredentialId, insertCredential } from "../repositories/credentialRepository.js";
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

async function credentialVerification(credentialId: number, userId: number) {
    const credential = await getCredentialByCredentialId(credentialId);
    throwError(!credential, "Not Found", `The credential with the ID: "${credentialId}" doesn't exist`);
    throwError(credential.userId !== userId, "Unauthorized", `You doesn't have access to a credential that's not yours`);
    return credential;
};

async function getCredential(credentialId: number, userId: number) {
    const credential = await credentialVerification(credentialId, userId);

    credential.password = decryptData(credential.password);
    delete credential.id;
    delete credential.userId;

    return credential;
};

async function deleteCredential(credentialId: number, userId: number) {
    const credential = await credentialVerification(credentialId, userId);

    await deleteCredentialByCredentialId(credential.id);
};

const credentialService = {
    registerCredential,
    getAllCredentials,
    getCredential,
    deleteCredential
};

export default credentialService;