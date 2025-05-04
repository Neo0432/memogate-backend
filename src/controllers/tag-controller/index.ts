import { Request, Response } from "express";
import { tagsApi } from "@/services";
import { deleteTagFromBookmarkById } from "@services/tags/delete-tag-from-bookmark";

export async function getAllTags(req: Request, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ error: "UserId not found" });
      return;
    }

    const tags = await tagsApi.getAllTags(userId);

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getBookmarkTags(req: Request, res: Response) {
  try {
    const { bookmarkId } = req.query;

    if (!bookmarkId || typeof bookmarkId !== "string") {
      res.status(400).json({ error: "BookmarkId is required" });
      return;
    }

    const tags: string[] = await tagsApi.getBookmarkTags(bookmarkId);

    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addTagToBookmark(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { tagData, bookmarkId } = req.body;

    if (!userId) {
      res.status(400).json({ error: "UserId not found" });
      return;
    }

    const { tag, bookmarkTagLink } = await tagsApi.addTagToBookmark({
      userId,
      tagData,
      bookmarkId,
    });

    res.status(200).json({ tagInBookmark: bookmarkTagLink, tag: tag });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTagFromBookmark(req: Request, res: Response) {
  try {
    const { tagId, bookmarkId } = req.query;

    if (!tagId || !bookmarkId) {
      res.status(400).json({ error: "Tag id and bookmark id are required" });
      return;
    }

    const response = await deleteTagFromBookmarkById({
      tagId: tagId as string,
      bookmarkId: bookmarkId as string,
    });

    res.status(200).json({ response });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error deleting tag from bookmark: ${error}` });
  }
}
