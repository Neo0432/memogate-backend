import { Router } from "express";
import {getBookmarks, getBookmarkById, registerController, signInController, createBookmark, updateBookmark, deleteBookmark} from "../controllers";
import {authMiddleware} from "../middleware";
import {parseTokenMiddleware} from "../middleware/parse-token-middleware";

const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/signin", signInController);

router.use('/bookmarks', authMiddleware, parseTokenMiddleware);
router.get("/bookmarks", getBookmarks);
router.get("/bookmarks/:id", getBookmarkById);
router.post("/bookmarks/create", createBookmark)
router.patch("/bookmarks/update", updateBookmark);
router.delete("/bookmarks/delete", deleteBookmark);

export default router;
