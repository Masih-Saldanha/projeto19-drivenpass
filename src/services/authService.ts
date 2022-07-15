import bcrypt from "bcrypt";

import { findUserByEmail, insertUser, UserData } from "../repositories/authRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

function encryptPassword(password: string) {
    return bcrypt.hashSync(password, +process.env.BCRYPT_SALT);
};

async function verifyUser(email: string) {
    const existUser = await findUserByEmail(email);
    throwError(!!existUser, "Conflict", `The email: "${email}" is already in use, try another one`);
};

async function createUser(userData: UserData) {
    await verifyUser(userData.email);

    const encryptedPassword = encryptPassword(userData.password);

    await insertUser({ email: userData.email, password: encryptedPassword });
};

const authService = {
    createUser
};

export default authService;