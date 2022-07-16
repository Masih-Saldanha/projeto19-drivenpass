import { Credentials } from "@prisma/client";

export type CredentialData = Omit<Credentials, "id">