import { Users } from "@prisma/client";

import { prisma } from "../database.js";

export type UserData = Omit<Users, "id">;

export async function findUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email
        }
    });
};

export async function insertUser(userData: UserData) {
    await prisma.users.create({ data: userData });
}