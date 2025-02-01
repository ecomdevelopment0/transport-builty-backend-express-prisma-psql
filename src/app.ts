import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { buildProviderModule } from "inversify-binding-decorators";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import "./api/bindings/modules";
import { DBInit, DBDisconnect } from "./infrastructure/datasource/db.config";
import { globalErrorHandler } from "./base";
dotenv.config();

const container = new Container();
container.load(buildProviderModule());
export { container };

export async function startApplication() {
  try {
    await DBInit();
    // await loadData();
    const rootPath = process.env.CONTEXT_PATH || "/api";
    const port = parseInt(process.env.PORT || "3000", 10);
    const server = new InversifyExpressServer(container, null, { rootPath });
    server.setConfig(app => {
      server.setErrorConfig(theApp => {
        theApp.use(globalErrorHandler);
      });
      app.use(morgan("dev"));
      app.use(
        express.urlencoded({
          extended: true,
        }),
      );
      app.use(express.json({ limit: "100mb" }));
    });

    const app = server.build();

    app.get("/ping", (req, res) => {
      res.json({
        message: `Service is running on port ${port}, root path --> ${rootPath}`,
      });
    });

    const httpServer = app.listen(port, () => {
      console.log(`Service is running on port ${port}, root path --> ${rootPath}`);
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received: Closing server and database connection...");
      httpServer.close(() => {
        console.log("HTTP server closed.");
      });
      await DBDisconnect();
      console.log("Database connection closed.");
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received: Closing server and database connection...");
      httpServer.close(() => {
        console.log("HTTP server closed.");
      });
      await DBDisconnect();
      console.log("Database connection closed.");
      process.exit(0);
    });
    return app;
  } catch (error: any) {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${process.env.PORT} is already in use. Please free up the port or use a different one.`);
    } else {
      console.error("Failed to start application:", error);
    }
    process.exit(1);
  }
}

startApplication();
