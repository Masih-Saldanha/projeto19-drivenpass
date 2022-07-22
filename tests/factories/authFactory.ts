import { faker } from "@faker-js/faker";
// import bcrypt from "bcrypt";

// import { prisma } from "../../src/config/database.js";
// import { UserData } from "../../src/repositories/authRepository.js";

function createRandomUser() {
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password(10);
    const userBody = { email, password };
    return userBody;
};

function createRandomUserWithShortPassword() {
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password(9);
    const userBody = { email, password };
    return userBody;
};

const authFactory = {
    createRandomUser,
    createRandomUserWithShortPassword
};

export default authFactory;