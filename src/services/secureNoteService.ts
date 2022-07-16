import { TokenData } from "../middlewares/validateTokenMiddleware.js";
import { SecureNoteData, deleteSecureNoteBySecureNoteId, findSecureNoteByUserIdAndTitle, getAllSecureNotesByUserId, getSecureNoteBySecureNoteId, insertSecureNote } from "../repositories/secureNoteRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerSecureNote(userDataFromToken: TokenData, dataFromBody: SecureNoteData) {
    dataFromBody.userId = userDataFromToken.id;

    const existTitle = await findSecureNoteByUserIdAndTitle(dataFromBody);
    throwError(!!existTitle, "Conflict", `The title ${dataFromBody.title} is already in use on another secure note on your account`);

    await insertSecureNote(dataFromBody);
};

async function getAllSecureNotes(userId: number) {
    const allSecureNotes = await getAllSecureNotesByUserId(userId);

    allSecureNotes.forEach(secureNote => {
        delete secureNote.id;
        delete secureNote.userId;
    });

    return allSecureNotes;
};

async function getSecureNote(secureNoteId: number, userId: number) {
    const secureNote = await secureNoteVerification(secureNoteId, userId);

    delete secureNote.id;
    delete secureNote.userId;

    return secureNote;
};

async function deleteSecureNote(secureNoteId: number, userId: number) {
    const secureNote = await secureNoteVerification(secureNoteId, userId);

    await deleteSecureNoteBySecureNoteId(secureNote.id);
};

async function secureNoteVerification(secureNoteId: number, userId: number) {
    const secureNote = await getSecureNoteBySecureNoteId(secureNoteId);
    throwError(!secureNote, "Not Found", `The secure note with the ID: "${secureNoteId}" doesn't exist`);
    throwError(secureNote.userId !== userId, "Unauthorized", `You doesn't have access to a secure note that's not yours`);
    return secureNote;
};

const secureNoteService = {
    registerSecureNote,
    getAllSecureNotes,
    getSecureNote,
    deleteSecureNote
};

export default secureNoteService;