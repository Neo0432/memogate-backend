import { Router } from "express";
import {
  registerController,
  signInController,
} from "@controllers/auth-controller";
import {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from "@controllers/bookmarks-controller";
import {
  getAllTags,
  addTagToBookmark,
  deleteTagFromBookmark,
  getBookmarkTags,
} from "@controllers/tag-controller";
import { authMiddleware } from "@/middleware";
import { parseTokenMiddleware } from "@middleware/parse-token-middleware";

const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/signin", signInController);

router.use("/bookmarks", authMiddleware, parseTokenMiddleware);
router.get("/bookmarks", getBookmarks);
router.get("/bookmarks/bookmark", getBookmarkById);
router.post("/bookmarks/create", createBookmark);
router.patch("/bookmarks/update", updateBookmark);
router.delete("/bookmarks/delete", deleteBookmark);

router.use("/tags", authMiddleware, parseTokenMiddleware);
router.get("/tags", getAllTags);
router.get("/tags/bookmark", getBookmarkTags);
router.post("/tags/add-tag", addTagToBookmark);
router.delete("/tags/delete", deleteTagFromBookmark);
export default router;
