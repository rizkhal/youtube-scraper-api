import "dotenv/config";
import videos from "./routes/videos";
import shorts from "./routes/shorts";
import channels from "./routes/channels";
import express, { Express } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Ok");
});

app.use(videos);
app.use(shorts);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
});

export default app;
