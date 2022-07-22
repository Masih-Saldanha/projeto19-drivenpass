import supertest from "supertest";

import app from "../src/config/app.js";
import { prisma } from "../src/config/database.js";
import { findUserByEmail } from "../src/repositories/authRepository.js";
import authFactory from "./factories/authFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`
        TRUNCATE TABLE users CASCADE;
    `
});

describe("Auth requisitions", () => {
    it("Given an e-mail and password, register a user", async () => {
        const userBody = authFactory.createRandomUser();

        await supertest(app)
            .post("/signup")
            .send(userBody);

        const createdUser = await findUserByEmail(userBody.email);

        expect(createdUser.email).toBe(userBody.email);
        expect(createdUser.password).not.toBe(userBody.password);
    });

    it("Given an e-mail and password, return a token", async () => {
        const userBody = authFactory.createRandomUser();

        await supertest(app)
            .post("/signup")
            .send(userBody);
        
        const { text } = await supertest(app)
            .post("/signin")
            .send(userBody);
        
        expect(typeof text).toBe("string");
        expect(text.length).toBeGreaterThan(100);
    });

    it("Given an e-mail and a short password, return 406", async () => {
        const userBody = authFactory.createRandomUserWithShortPassword();

        const { statusCode } = await supertest(app)
            .post("/signup")
            .send(userBody);

        expect(statusCode).toBe(406);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});