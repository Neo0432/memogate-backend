import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const deleteBookmark = async ({
  bookmarkId,
}: {
  bookmarkId: string;
}) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const bookmarkTags = await tx.bookmarkTags.findMany({
        where: { bookmarkId },
        select: { tagId: true },
      });

      const tagIds = bookmarkTags.map((tag) => tag.tagId);

      const deletedBookmark = await tx.bookmark.delete({
        where: { id: bookmarkId },
      });

      const tagUsageCounts = await tx.bookmarkTags.groupBy({
        by: ["tagId"],
        where: {
          tagId: { in: tagIds },
        },
        _count: {
          tagId: true,
        },
      });

      const usedTagIds = new Set(tagUsageCounts.map((t) => t.tagId));
      const unusedTagIds = tagIds.filter((id) => !usedTagIds.has(id));

      await tx.tag.deleteMany({
        where: {
          id: { in: unusedTagIds },
        },
      });

      return deletedBookmark;
    });

    return result;
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return null;
  }
};
