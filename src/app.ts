import "reflect-metadata";
import "./api/bindings/modules";
import dotenv from "dotenv";
import { DBInit, DBDisconnect } from "./infrastructure/datasource/db.config";
import { startApplication } from "./base/start";
import { globalErrorHandler } from "../src/base/handlers/error.handler";

dotenv.config();

let export_container: any;
startApplication({
  DBInit,
  DBDisconnect,
  globalErrorHandler,
}).then(({ container }) => {
  export_container = container;
  console.log("Application started successfully.");
});
export { export_container };
