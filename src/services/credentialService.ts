import cryptr from "../cryptrConfig.js";
import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { CredentialData, findCredentialByUserIdAndTitle, getAllCredentialsByUserId, insertCredential } from "../repositories/credentialRepository.js";
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

const credentialService = {
    registerCredential,
    getAllCredentials
};

export default credentialService;