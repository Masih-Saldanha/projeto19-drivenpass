import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByEmail, insertUser, UserData } from "../repositories/authRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function createUser(userData: UserData) {
    const existUser = await findUserByEmail(userData.email);
    throwError(!!existUser, "Conflict", `The email: "${userData.email}" is already in use, try another one`);

    const encryptedPassword = encryptPassword(userData.password);

    await insertUser({ email: userData.email, password: encryptedPassword });
};

async function signInUser(userData: UserData) {
    const existUser = await findUserByEmail(userData.email);
    throwError(!existUser, "Not Found", `The email: "${userData.email}" isn't registered`);

    decryptPassword(userData.password, existUser.password, userData.email);

    const token = createToken(existUser);

    return token;
};

function encryptPassword(password: string) {
    return bcrypt.hashSync(password, +process.env.BCRYPT_SALT);
};

function decryptPassword(password: string, encryptedPassword: string, email: string) {
    const isPassword = bcrypt.compareSync(password, encryptedPassword);
    throwError(!isPassword, "Not Acceptable", `The password sent doesn't match with the e-mail: "${email}", try again`);
};

function createToken(userData: Users) {
    const tokenData = { id: userData.id, email: userData.email };
    return jwt.sign(tokenData, process.env.JWT_TOKEN);
};

const authService = {
    createUser,
    signInUser
};

export default authService;