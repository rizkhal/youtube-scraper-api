"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const videos_1 = __importDefault(require("./routes/videos"));
const shorts_1 = __importDefault(require("./routes/shorts"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json("Ok");
});
app.use(videos_1.default);
app.use(shorts_1.default);
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, () => {
    console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
});
exports.default = app;
