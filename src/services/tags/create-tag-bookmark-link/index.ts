import { IBookmarkRelatedTag, ICreateTagDTO } from "@models/tag";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const createTagBookmarkLink = async ({
  bookmarkId,
  tagId,
}: {
  tagId: string;
  userId: string;
  bookmarkId: string;
}) => {
  try {
    const bookmarkTagLink: IBookmarkRelatedTag =
      await prisma.bookmarkTags.create({
        data: {
          tagId,
          bookmarkId,
        },
      });

    return bookmarkTagLink;
  } catch (e) {
    throw new Error(`Error creating bookmark tag link: ${e}`);
  }
};
