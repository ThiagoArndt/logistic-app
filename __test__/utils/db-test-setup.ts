import prisma from "./client";

export const cleanUp = async (): Promise<void> => {
    await prisma.users.deleteMany({});
};