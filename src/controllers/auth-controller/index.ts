import { Request, Response } from "express";
import { authApi } from "@/services";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    const user = await authApi.registerUser({ name, email, password });
    const userdata = await authApi.signInUser({ email: user.email, password });
    res.status(201).json(userdata);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    console.error(`[ERROR] Error on registration: ${e.message} `);
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const data = await authApi.signInUser({ email, password });
    res.status(201).json(data);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
    console.error(`[ERROR] Error on login: ${e.message}`);
  }
};
