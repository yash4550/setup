import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { env } from "./environments/Env";
import Routes from "./routes/Routes";
import { NextFunction } from "express";
import path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
// let’s you use the cookieParser in your application

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.setMongodb();
    this.enableCors();
    this.configBodyParser();
  }

  setMongodb() {
    mongoose
      .connect(env().dbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected");
      })
      .catch((e) => {
        console.log(e);
        console.log("failed");
      });
  }

  enableCors() {
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
  }

  configBodyParser() {
    this.app.use(express.urlencoded({ extended: true, limit: "100mb" }));
    this.app.use(express.json({ limit: "100mb" }));
  }

  setRoutes() {
    this.app.use(
      "/api-doc",
      express.static(path.resolve(process.cwd() + "/apidoc"))
    );
    this.app.use(
      "/img",
      express.static(path.resolve(process.cwd() + "/assest/images"))
    );
    this.app.use(
      "/driver-policy",
      express.static(path.resolve(process.cwd() + "/assest/view"))
    );

    this.app.use("/api", Routes);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Route not found test",
        status: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error: any, req, res, next: NextFunction) => {
      const errorStatus = req.errorStatus;
      res.status(errorStatus || 500).json({
        message: error.message || "Something went wrong!!",
        statusText: error.statusText || "ERROR",
        status: errorStatus || 500,
        data: {},
      });
    });
  }
}
