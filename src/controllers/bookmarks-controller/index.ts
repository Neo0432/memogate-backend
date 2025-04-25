import { Request, Response } from "express";
import {bookmarksApi} from "../../services";

export async function getBookmarks(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }

        const bookmarks = await bookmarksApi.getAllBookmarksByUserId({userId: userId})

        res.json({bookmarks});
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function createBookmark(req: Request, res: Response): Promise<void> {
    try {
        const {bookmarkData} = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: "userId is required" });
            return;
        }

        console.log(bookmarkData);
        if (!bookmarkData) {
            res.status(400).json({ error: "BookmarkData is required" });
            return;
        }

        const bookmark = await bookmarksApi.createBookmark(
            {
                title: bookmarkData.title,
                description: bookmarkData.description,
                userId: userId,
                url: bookmarkData.url
            }
        );
        res.status(200).json({bookmark});
    } catch (error) {
        console.error("Error creating bookmark:", error);
        res.status(500).json({ error: "Cant create bookmark" });
    }
}

export async function getBookmarkById(req: Request, res: Response): Promise<void> {
    try {
        const { bookmarkId } = req.query;

        if (!bookmarkId) {
            res.status(400).json({ error: "BookmarkId is required" });
            return
        } else if (typeof bookmarkId !== "string") {
            res.status(400).json({ error: "BookmarkId must be a string" });
            return;
        }

        const bookmark = await bookmarksApi.getBookmarksByBookmarkId({bookmarkId: bookmarkId})

        if (!bookmark) {
            res.status(400).json({ error: `Bookmark with id ${bookmarkId} not found` });
        }

        res.status(200).json({bookmark: bookmark[0]});


    } catch (e) {
        console.error("Error fetching bookmark by id:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateBookmark(req: Request, res: Response): Promise<void> {
    try {
        const {bookmark} = req.body;

        if (!bookmark) {
            res.status(400).json({ error: "BookmarkId is required" });
        }

        const updatedBookmark = await bookmarksApi.updateBookmark({bookmark: bookmark})

        res.status(200).json({bookmark: updatedBookmark});
    } catch (e) {
        res.status(500).json({ error: `Internal server error: ${e}` });
    }
}

export async function deleteBookmark(req: Request, res: Response): Promise<void> {
    try {
        const {bookmarkId} = req.query;
        if (!bookmarkId) {
            res.status(400).json({ error: "BookmarkId is required" });
            return;
        } else if (typeof bookmarkId !== "string") {
            res.status(400).json({ error: "bookmarkId must be a string" });
            return;
        }

        const deletedBookmark = await bookmarksApi.deleteBookmark({bookmarkId});

        if (!deletedBookmark) {
            res.status(500).json({ error: `Cant delete bookmark with id ${bookmarkId}` });
            return;
        }

        res.status(200).json({bookmarkId});
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}