import { Request, Response } from "express";
import { auth } from "../../services";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await auth.registerUser({ username, email, password });
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    throw new Error(`[ERROR] Error on registration: ${e.message} `);
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await auth.signInUser({ email, password });
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    throw new Error(`[ERROR] Error on login: ${e.message}`);
  }
};
