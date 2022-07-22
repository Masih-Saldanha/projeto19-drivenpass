import supertest from "supertest";

import app from "../src/config/app.js";
import { prisma } from "../src/config/database.js";
import { findUserByEmail } from "../src/repositories/authRepository.js";
import authFactory from "./factories/authFactory.js";

// type CardType = "credit" | "debit" | "both";

// interface BodyRequisition {
//     title: string;
//     url?: string;
//     user?: string;
//     password?: string;
//     note?: string;
//     number?: string;
//     name?: string;
//     securityCode?: string;
//     expirationDate?: string;
//     isVirtual?: string;
//     type?: CardType;
// }

// const arrElements = [
//     {
//         name: "Credentials",
//         prismaName: "credentials",
//         routeName: "credential",
//         bodyRequisition: {
//             title: "Teste",
//             url: "http://teste.com.br",
//             user: "Teste",
//             password: "teste"
//         }
//     },
//     {
//         name: "Secure Notes",
//         prismaName: "secureNotes",
//         routeName: "securenote",
//         bodyRequisition: {
//             title: "Teste",
//             note: "Teste"
//         }
//     },
//     {
//         name: "Cards",
//         prismaName: "cards",
//         routeName: "card",
//         bodyRequisition: {
//             title: "Teste",
//             number: "1234 1234 1234 1234",
//             name: "Teste",
//             securityCode: "123",
//             expirationDate: "10/27",
//             password: "1234",
//             isVirtual: false,
//             type: "credit"
//         }
//     },
//     {
//         name: "Wi-fis",
//         prismaName: "wifiPasswords",
//         routeName: "wifi",
//         bodyRequisition: {
//             title: "Teste",
//             name: "Teste",
//             password: "teste"
//         }
//     }
// ];
// const email = "email@email.com";
// const password = "0123456789"
// const userBody = {
//     email,
//     password
// };
// let token = "";

beforeEach(async () => {
    await prisma.$executeRaw`
        TRUNCATE TABLE users CASCADE;
    `
});

describe("Auth requisitions", () => {
    it("Given an e-mail and password, register a user", async () => {
        const userBody = await authFactory.createRandomUser();

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
// for (let i = 0; i < arrElements.length; i++) {
//     const { name, prismaName, routeName, bodyRequisition } = arrElements[i];
//     describe(`${name} requisitions`, () => {
//         it(`Given a body, return 201`, async () => {
//             await prisma.$executeRawUnsafe(`
//                 TRUNCATE TABLE "${prismaName}" CASCADE;
//             `)

//             const { statusCode } = await supertest(app)
//                 .post(`/${routeName}/register`)
//                 .set("Authorization", `Bearer ${token}`)
//                 .send(bodyRequisition);
//             expect(statusCode).toBe(201);
//         });

//         it(`Given a Token in Header, get all ${name}`, async () => {
//             const { body } = await supertest(app)
//                 .get(`/${routeName}/getall`)
//                 .set("Authorization", `Bearer ${token}`);

//             expect(body).toStrictEqual([bodyRequisition]);
//         });
//     });
// };

afterAll(async () => {
    await prisma.$disconnect();
});