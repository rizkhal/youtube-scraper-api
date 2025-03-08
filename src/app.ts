import "dotenv/config";
import express, { Express, Router } from "express";
import routes from "./routes";

const app: Express = express();

app.use(express.json());

app.use(routes);

export default app;
