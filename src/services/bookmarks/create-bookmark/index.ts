import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { IBookmark, IBookmarkCreate } from "@models/bookmark";

dotenv.config();
const prisma = new PrismaClient();

export const createBookmark = async ({
  title,
  description,
  url,
  userId,
}: IBookmarkCreate) => {
  const bookmark: IBookmark = await prisma.bookmark.create({
    data: {
      id: uuidv4(),
      title: title,
      description: description,
      url: url,
      userId: userId,
    },
  });

  return bookmark;
};
