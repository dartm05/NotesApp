import express from "express";
import * as functions from "firebase-functions/v1";
import taskApp from "./routes/task.routes";
import userApp from "./routes/user.routes";
import { errorHandler } from "../../src/infrastructure/controllers/errorController";
import { Error } from "../domain/models/error.model";

const appRoutes = express();
var cors = require("cors");
appRoutes.use(cors());
appRoutes.use("/", taskApp);
appRoutes.use("/users", userApp);

appRoutes.all("*", (req, res, next) => {
  const error = new Error(
    404,
    "Error",
    "Can't find the requested URL",
    "Not Found"
  );
  next(error);
});

appRoutes.use(errorHandler);

export const api = functions.https.onRequest(appRoutes);
