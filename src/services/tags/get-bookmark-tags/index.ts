import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const getBookmarkTags = async (bookmarkId: string) => {
  try {
    const tagLinksIds = await prisma.bookmarkTags.findMany({
      where: { bookmarkId },
      select: {
        tagId: true,
      },
    });

    const tagIds = tagLinksIds.map((tagId) => tagId.tagId);

    return await prisma.tag.findMany({
      where: { id: { in: tagIds } },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.error("Error getting bookmark tags:", error);
    return [];
  }
};
