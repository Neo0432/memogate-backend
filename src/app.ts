import express from "express";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes";

export default function App() {
  const app = express();
  const port = 5173;
  const prisma = new PrismaClient();
  app.use(express.json());

  app.use(authRoutes);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
