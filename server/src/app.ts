import express, { type Express, type Request, type Response } from "express";

/**
 * Builds and configures the Express application.
 * Kept separate from src/index.ts so it can be imported directly in tests
 * (e.g. with supertest) without binding to a real port.
 */
export function createApp(): Express {
  const app = express();

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  return app;
}
