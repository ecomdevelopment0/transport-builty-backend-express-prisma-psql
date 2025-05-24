import "reflect-metadata";
import "./api/bindings/modules";
import dotenv from "dotenv";
import { DBInit, DBDisconnect } from "./infrastructure/datasource/db.config";
import { startApplication } from "./base/start";
import { globalErrorHandler } from "../src/base/handlers/error.handler";

dotenv.config();

startApplication({
  DBInit,
  DBDisconnect,
  globalErrorHandler,
}).then(({ app, container }) => {
  console.log("Application started successfully.");
});
