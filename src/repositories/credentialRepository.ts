import { Credentials } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CredentialData = Omit<Credentials, "id">

export async function findCredentialByUserIdAndTitle(credentialData: CredentialData) {
    return prisma.credentials.findUnique({
        where: {
            userId_title: {
                userId: credentialData.userId,
                title: credentialData.title
            }
        }
    });
};

export async function insertCredential(credentialData: CredentialData) {
    await prisma.credentials.create({ data: credentialData });
};

export async function getAllCredentialsByUserId(userId: number) {
    return prisma.credentials.findMany({
        where: {
            userId
        }
    });
};

export async function getCredentialByCredentialId(credentialId: number) {
    return prisma.credentials.findUnique({
        where: {
            id: credentialId
        }
    });
};

export async function deleteCredentialByCredentialId(credentialId: number) {
    await prisma.credentials.delete({
        where: {
            id: credentialId
        }
    });
};