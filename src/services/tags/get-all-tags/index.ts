import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { ITag } from "@models/tag";

dotenv.config();
const prisma = new PrismaClient();

export const getAllTags = async (userId: string) => {
  const tags: ITag[] = await prisma.tag.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      userId: true,
    },
  });

  return tags;
};
