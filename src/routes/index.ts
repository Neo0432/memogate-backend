import { Router } from "express";
import { registerController, signInController } from "../controllers";

const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/signin", signInController);

export default router;
