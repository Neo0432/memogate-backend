import { Router } from "express";
import {getBookmarksByUserId, registerController, signInController} from "../controllers";
import {authMiddleware} from "../middleware";

const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/signin", signInController);

router.use('/bookmarks', authMiddleware);
router.get("/bookmarks", getBookmarksByUserId);

export default router;
