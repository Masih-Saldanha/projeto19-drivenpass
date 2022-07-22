import bcrypt from "bcrypt";

import { prisma } from "../src/config/database.js";

export const email = "default@email.com";
export const decryptedPassword = "0123456789";
export const password = bcrypt.hashSync(decryptedPassword, +process.env.BCRYPT_SALT);

async function main() {
    await prisma.users.upsert({
        where: {
            email
        },
        update: {},
        create: {
            email,
            password
        }
    });
};

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});