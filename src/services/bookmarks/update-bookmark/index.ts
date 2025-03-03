import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
import {IBookmarkUpdate} from "../../../models/bookmark";

dotenv.config();
const prisma = new PrismaClient();

export const updateBookmark = async ({bookmark} : {bookmark: IBookmarkUpdate} ) => {
    try {
        return await prisma.bookmark.update({where: {id: bookmark.id}, data: {
            title: bookmark.title,
            description: bookmark.description,
            url: bookmark.url,
        }})
    } catch (e) {
        throw new Error(`[ERROR] Failed to update bookmark in DB: ${e}`);
    }


}