import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { IGetAllTagsResponseDto } from "@models/tag";

dotenv.config();
const prisma = new PrismaClient();

export const getAllTags = async (userId: string) => {
  const tags = await prisma.tag.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      userId: true,
      bookmarkTags: true,
    },
  });

  const response: IGetAllTagsResponseDto[] = tags.map((tag) => {
    return {
      ...tag,
      bookmarkIds: tag.bookmarkTags.map(
        (bookmarkTag) => bookmarkTag.bookmarkId
      ),
    };
  });

  return response;
};
