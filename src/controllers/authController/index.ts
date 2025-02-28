import { Request, Response } from "express";
import { auth } from "../../services";

export const registerController = async (req: Request, res: Response) => {
  try {
    const {email, password } = req.body;
    const username = req.body.name;
    const user = await auth.registerUser({ username, email, password });
    const userdata = await auth.signInUser({ email: user.email, password });
    res.status(201).json(userdata);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    console.error(`[ERROR] Error on registration: ${e.message} `);
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await auth.signInUser({ email, password });
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    console.error(`[ERROR] Error on login: ${e.message}`);
  }
};
