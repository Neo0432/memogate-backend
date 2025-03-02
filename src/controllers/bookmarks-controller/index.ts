import { Request, Response } from "express";
import {bookmarksApi} from "../../services";

export async function getBookmarksByUserId(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.query;

        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        } else if (typeof userId !== "string") {
            res.status(400).json({ error: "userId must be a string" });
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
        if (!bookmarkData) {
            res.status(400).json({ error: "BookmarkData is required" });
            return;
        }

        const bookmark = await bookmarksApi.createBookmark(
            {
                title: bookmarkData.title,
                description: bookmarkData.description,
                userId: bookmarkData.userId,
                url: bookmarkData.url
            });

        res.status(200).json({bookmark});
    } catch (error) {
        console.error("Error creating bookmark:", error);
        res.status(500).json({ error: "Internal server error" });
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

        console.log(deletedBookmark);
        res.status(200).json({bookmarkId});
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}