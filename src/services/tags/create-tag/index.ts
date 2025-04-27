import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

import { IBookmarkRelatedTag, ICreateTagDTO, ITag } from "@models/tag";

dotenv.config();
const prisma = new PrismaClient();

export const createTag = async ({
  userId,
  bookmarkId,
  tagData,
}: {
  tagData: ICreateTagDTO;
  userId: string;
  bookmarkId: string;
}) => {
  try {
    const tag: ITag = await prisma.tag.create({
      data: {
        id: uuidv4(),
        name: tagData.name,
        userId: userId,
      },
    });

    const bookmarkTag: IBookmarkRelatedTag = await prisma.bookmarkTags.create({
      data: {
        tagId: tag.id,
        bookmarkId: bookmarkId,
      },
    });

    return {
      tag,
      bookmarkTag,
    };
  } catch (error) {
    throw new Error(`Cant create tag: ${error}`);
  }
};
