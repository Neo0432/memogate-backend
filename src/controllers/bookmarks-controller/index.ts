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

        const result = await bookmarksApi.getAllBookmarksByUserId({userId: userId})

        res.json({ data: result });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
