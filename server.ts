import app from "./src/app";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = app.listen(port, () => {
  console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
});

export default server;
