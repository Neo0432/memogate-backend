import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const getBookmarkTags = async (bookmarkId: string) => {
  try {
    const tagIds = await prisma.bookmarkTags.findMany({
      where: { bookmarkId },
      select: {
        tagId: true,
      },
    });

    return tagIds.map((tagId) => tagId.tagId);
  } catch (error) {
    console.error("Error getting bookmark tags:", error);
    return [];
  }
};
