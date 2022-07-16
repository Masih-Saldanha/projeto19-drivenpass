import { SecureNotes } from "@prisma/client";

import { prisma } from "../config/database.js";

export type SecureNoteData = Omit<SecureNotes, "id">

export async function findSecureNoteByUserIdAndTitle(secureNoteData: SecureNoteData) {
    return prisma.secureNotes.findUnique({
        where: {
            userId_title: {
                userId: secureNoteData.userId,
                title: secureNoteData.title
            }
        }
    });
};

export async function insertSecureNote(secureNoteData: SecureNoteData) {
    await prisma.secureNotes.create({ data: secureNoteData });
};

export async function getAllSecureNotesByUserId(userId: number) {
    return prisma.secureNotes.findMany({
        where: {
            userId
        }
    });
};

export async function getSecureNoteBySecureNoteId(secureNoteId: number) {
    return prisma.secureNotes.findUnique({
        where: {
            id: secureNoteId
        }
    });
};

export async function deleteSecureNoteBySecureNoteId(secureNoteId: number) {
    await prisma.secureNotes.delete({
        where: {
            id: secureNoteId
        }
    });
};