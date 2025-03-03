import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const getBookmarksByBookmarkId =  async({bookmarkId}: {bookmarkId: string}) => {
    return prisma.bookmark.findMany({where: { id : bookmarkId },})
}