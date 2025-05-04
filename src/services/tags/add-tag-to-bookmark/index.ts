import { ICreateTagDTO } from "@models/tag";
import { createTag } from "@services/tags";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { createTagBookmarkLink } from "@services/tags/create-tag-bookmark-link";

dotenv.config();
const prisma = new PrismaClient();

interface AddTagToBookmarkParams {
  tagData: ICreateTagDTO;
  userId: string;
  bookmarkId: string;
}

export const addTagToBookmark = async ({
  tagData,
  userId,
  bookmarkId,
}: AddTagToBookmarkParams) => {
  if (!tagData?.name) {
    throw new Error("No tag name provided");
  }
  try {
    const existingTag = await prisma.tag.findFirst({
      where: { name: tagData.name, userId },
      select: { id: true, name: true },
    });

    const tag = existingTag ?? (await createTag({ userId, tagData }));

    const bookmarkTagLink = await createTagBookmarkLink({
      tagId: tag.id,
      bookmarkId,
      userId,
    });

    return { tag, bookmarkTagLink };
  } catch (error) {
    throw new Error(`Failed to add tag to bookmark: ${error}`);
  }
};
