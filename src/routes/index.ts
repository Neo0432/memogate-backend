import { Router } from "express";
import {getBookmarksByUserId, getBookmarkById, registerController, signInController, createBookmark, updateBookmark, deleteBookmark} from "../controllers";
import {authMiddleware} from "../middleware";

const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/signin", signInController);

router.use('/bookmarks', authMiddleware);
router.get("/bookmarks", getBookmarksByUserId);
router.get("/bookmarks/:id", getBookmarkById);
router.post("/bookmarks/create", createBookmark)
router.patch("/bookmarks/update", updateBookmark);
router.delete("/bookmarks/delete", deleteBookmark);

export default router;
