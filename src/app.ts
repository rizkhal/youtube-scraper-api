import "dotenv/config";
import routes from "./routes";
import express, { Express } from "express";

const app: Express = express();

app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
});

export default app;
