import { Request, Response, NextFunction } from "express";
import { tagsApi } from "@/services";
import { AuthedRequest } from "@models/request";

export async function getAllTags(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    const tags = await tagsApi.getAllTags(userId);

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //TODO: fix it
    const userId = req.user?.id!;
    const { tagData, bookmarkId } = req.body;

    const { tag, bookmarkTag } = await tagsApi.createTag({
      userId,
      tagData,
      bookmarkId,
    });

    console.log(tag);
    res.status(200).json({ tag: bookmarkTag });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
