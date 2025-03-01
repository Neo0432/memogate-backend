import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
import {IBookmarkDto} from "../../../models/bookmark";

dotenv.config();
const prisma = new PrismaClient();

export const getAllBookmarksByUserId =  async({userId}: {userId: string}) => {
    const bookmarks: IBookmarkDto[] = await prisma.bookmark.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            description: true,
        },
    });

    return bookmarks;
}