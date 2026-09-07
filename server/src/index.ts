import { createApp } from "./app";

const PORT = Number(process.env.PORT) || 4000;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`[server] listening on port ${PORT}`);
});

function shutdown(signal: string) {
  console.log(`[server] received ${signal}, shutting down gracefully`);
  server.close(() => {
    console.log("[server] closed all connections");
    process.exit(0);
  });
  // Force-exit if close hangs (e.g. a stuck connection)
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
