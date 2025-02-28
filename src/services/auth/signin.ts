import { PrismaClient } from "@prisma/client";
import { IUser, IUserSignInDTO } from "../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const signInUser = async ({ email, password }: IUserSignInDTO) => {
  const user: IUser | null = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("[ERROR] Cant find user with this email");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("[ERROR] Invalid password");

  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) throw new Error("[ERROR] Cant find jwt_secret");

  const token = jwt.sign({ userId: user.id }, jwt_secret, {
    expiresIn: "1h",
  });

  return { token: token, data: user };
};
