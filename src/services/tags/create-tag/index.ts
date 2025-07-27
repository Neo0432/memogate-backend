import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

import { ICreateTagDTO, ITag } from "@models/tag";

dotenv.config();
const prisma = new PrismaClient();

export const createTag = async ({
  userId,
  tagData,
}: {
  tagData: ICreateTagDTO;
  userId: string;
}) => {
  try {
    const tag: ITag = await prisma.tag.create({
      data: {
        id: uuidv4(),
        name: tagData.name,
        userId: userId,
      },
    });

    return tag;
  } catch (error) {
    throw new Error(`Cant create tag: ${error}`);
  }
};
