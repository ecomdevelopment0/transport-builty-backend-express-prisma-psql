import express from "express";
import { Server } from "http";
import { InversifyExpressServer } from "inversify-express-utils";
import multer from "multer";
import morgan from "morgan";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import cors from "cors";

interface StartApplicationParams {
  DBInit: () => Promise<void>;
  DBDisconnect: () => Promise<void>;
  globalErrorHandler?: any;
  swaggerSpecification?: any;
  contextPath?: string;
  port?: number;
}

export async function startApplication({
  DBInit,
  DBDisconnect,
  globalErrorHandler,
  swaggerSpecification,
  contextPath = process.env.CONTEXT_PATH || "/api",
  port = parseInt(process.env.PORT || "3000", 10),
}: StartApplicationParams): Promise<any> {
  try {
    await DBInit();
    const container = new Container();
    container.load(buildProviderModule());
    const server = new InversifyExpressServer(container, null, { rootPath: contextPath });
    server.setConfig(app => {
      server.setErrorConfig(theApp => {
        theApp.use(globalErrorHandler);
      });
      app.use(morgan("dev"));
      app.use(cors());
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json({ limit: "100mb" }));
      app.use(multer({ storage: multer.memoryStorage() }).any());
    });
    const app = server.build();
    app.get("/ping", (req, res) => {
      res.json({
        message: `Service is running on port ${port}, root path --> ${contextPath}`,
      });
    });
    const httpServer: Server = app.listen(port, () => {
      console.log(`Service is running on port ${port}, root path --> ${contextPath}`);
    });
    const shutdown = async (signal: string) => {
      console.log(`${signal} received: Closing server and database connection...`);
      httpServer.close(() => console.log("HTTP server closed."));
      await DBDisconnect();
      console.log("Database connection closed.");
      process.exit(0);
    };
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    return { app, container };
  } catch (error: any) {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Please free up the port or use a different one.`);
    } else {
      console.error("Failed to start application:", error);
    }
    process.exit(1);
  }
}
