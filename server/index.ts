import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { chatRouter } from "./routes/chat";
import logger from "./logger";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    logger.info("Ping endpoint called");
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/chat", chatRouter);

  return app;
}
