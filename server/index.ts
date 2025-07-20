import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { chatRouter } from "./routes/chat";
import logger from "./logger";

export function createServer(options: { serverless?: boolean } = {}) {
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

  // Only add static file serving and SPA routing for full server mode
  if (!options.serverless) {
    // Static file serving and SPA routing will be added in node-build.ts
    logger.info("Server created in full mode (with static file serving)");
  } else {
    logger.info("Server created in serverless mode (API routes only)");
  }

  return app;
}
