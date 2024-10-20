import express from "express";
import * as functions from "firebase-functions/v1";
import taskApp from "./routes/task.routes";

const appRoutes = express();
appRoutes.use("/", taskApp);
// userApp

export const api = functions.https.onRequest(appRoutes);
