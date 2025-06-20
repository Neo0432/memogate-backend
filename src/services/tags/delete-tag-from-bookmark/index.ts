import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const deleteTagFromBookmarkById = async ({
  tagId,
  bookmarkId,
}: {
  tagId: string;
  bookmarkId: string;
}) => {
  try {
    await prisma.bookmarkTags.delete({
      where: { bookmarkId_tagId: { bookmarkId, tagId } },
    });

    const bookmarksWithTag = await prisma.bookmarkTags.findMany({
      where: { tagId: tagId },
      include: {
        bookmark: true,
      },
    });

    if (bookmarksWithTag.length === 0) {
      await prisma.tag.delete({
        where: { id: tagId },
      });
    }

    return { tagId, bookmarkId };
  } catch (error) {
    console.error("Error deleting tag from bookmark:", error);
    throw new Error(`Error deleting tag ${tagId} from bookmark ${bookmarkId}`);
  }
};
