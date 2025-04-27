import { Response } from "express";
import { bookmarksApi } from "@/services";
import { AuthedRequest } from "@models/request";

export async function getBookmarks(
  req: AuthedRequest,
  res: Response,
): Promise<void> {
  try {
    const userId = req.userId;

    const bookmarks = await bookmarksApi.getAllBookmarksByUserId({
      userId: userId,
    });

    res.json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createBookmark(
  req: AuthedRequest,
  res: Response,
): Promise<void> {
  try {
    const userId = req.userId;
    const { bookmarkData } = req.body;

    if (!bookmarkData) {
      res.status(400).json({ error: "BookmarkData is required" });
      return;
    }

    const bookmark = await bookmarksApi.createBookmark({
      title: bookmarkData.title,
      description: bookmarkData.description,
      userId: userId,
      url: bookmarkData.url,
    });
    res.status(200).json({ bookmark });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({ error: "Cant create bookmark" });
  }
}

export async function getBookmarkById(
  req: AuthedRequest,
  res: Response,
): Promise<void> {
  try {
    const { bookmarkId } = req.query;

    if (!bookmarkId) {
      res.status(400).json({ error: "BookmarkId is required" });
      return;
    } else if (typeof bookmarkId !== "string") {
      res.status(400).json({ error: "BookmarkId must be a string" });
      return;
    }

    const bookmark = await bookmarksApi.getBookmarksByBookmarkId({
      bookmarkId: bookmarkId,
    });

    if (!bookmark) {
      res
        .status(400)
        .json({ error: `Bookmark with id ${bookmarkId} not found` });
    }

    res.status(200).json({ bookmark: bookmark[0] });
  } catch (e) {
    console.error("Error fetching bookmark by id:", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateBookmark(
  req: AuthedRequest,
  res: Response,
): Promise<void> {
  try {
    const { bookmarkId } = req.query;
    const { bookmark } = req.body;

    if (!bookmarkId || typeof bookmarkId !== "string") {
      res.status(400).json({ error: "Bookmark id is required" });
      return;
    } else if (!bookmark) {
      res.status(400).json({ error: "Bookmark data is required" });
      return;
    }

    const updatedBookmark = await bookmarksApi.updateBookmark({
      bookmark: bookmark,
      id: bookmarkId,
    });

    res.status(200).json({ bookmark: updatedBookmark });
  } catch (e) {
    res.status(500).json({ error: `Internal server error: ${e}` });
  }
}

export async function deleteBookmark(
  req: AuthedRequest,
  res: Response,
): Promise<void> {
  try {
    const { bookmarkId } = req.query;
    if (!bookmarkId) {
      res.status(400).json({ error: "BookmarkId is required" });
      return;
    } else if (typeof bookmarkId !== "string") {
      res.status(400).json({ error: "bookmarkId must be a string" });
      return;
    }

    const deletedBookmark = await bookmarksApi.deleteBookmark({ bookmarkId });

    if (!deletedBookmark) {
      res
        .status(500)
        .json({ error: `Cant delete bookmark with id ${bookmarkId}` });
      return;
    }

    res.status(200).json({ bookmarkId });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
