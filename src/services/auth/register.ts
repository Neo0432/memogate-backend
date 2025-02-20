import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { IUserSighUpDTO } from "../../models";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const registerUser = async ({
  username,
  email,
  password,
}: IUserSighUpDTO) => {
  console.log(username);
  console.log(email);
  console.log(password);
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw new Error("[ERROR] User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { id: uuidv4(), username, email, password: hashedPassword },
  });
};
