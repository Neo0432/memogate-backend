import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { IUser, IUserSighUpDTO } from "@/models";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const registerUser = async ({
  name,
  email,
  password,
}: IUserSighUpDTO) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) console.error("[ERROR] User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user: IUser = await prisma.user.create({
    data: { id: uuidv4(), name, email, password: hashedPassword },
  });

  return { ...user };
};
