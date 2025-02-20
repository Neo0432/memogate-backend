import express from "express";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes";

export default function App() {
  const app = express();
  const prisma = new PrismaClient();
  app.use(express.json());

  app.use("/api", authRoutes);

  // app.post("/bookmarks", async (req, res) => {
  //   const { url, title, description } = req.body;
  //   const bookmark = await prisma.bookmark.create({
  //     data: {
  //       url,
  //       title,
  //       description,
  //     },
  //   });
  //   res.json(bookmark);
  // });

  // app.get("/bookmarks", async (req, res) => {
  //   const bookmarks = await prisma.bookmark.findMany();
  //   res.json(bookmarks);
  // });

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}
