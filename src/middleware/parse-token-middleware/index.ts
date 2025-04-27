import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthedRequest } from "@models/request";

export const parseTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token is not provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    if (typeof decoded === "object" && "userId" in decoded) {
      req.user = {
        id: decoded.userId as string,
        email: decoded.email as string | undefined,
      };

      //TODO: переписать вот эту штуку нормально, по человечески, без костылей

      if (!req.userId || req.userId.trim() === "") {
        res.status(400).json({ error: "userId is required" });
        return;
      }

      req.userId = decoded.userId as string;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is invalid" });
  }
};
