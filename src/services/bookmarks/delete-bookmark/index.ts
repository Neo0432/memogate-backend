import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const deleteBookmark = async ({ bookmarkId }: { bookmarkId: string }) => {
    try {
        const deletedBookmark = await prisma.bookmark.delete({
            where: { id: bookmarkId },
        });

        return deletedBookmark;
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        return null;
    }
};