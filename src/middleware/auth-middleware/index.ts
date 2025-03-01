import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error("[ERROR] JWT_SECRET is not defined in environment variables");
        res.status(500).json({ error: "Internal server error" });
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string };
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Invalid token" });
        return;
    }
};