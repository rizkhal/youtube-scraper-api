"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videos_1 = __importDefault(require("../scripts/videos"));
const videos_2 = require("../services/videos");
const router = (0, express_1.Router)();
const channels = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, videos_2.getVideosFromSupabase)();
        res.json({ success: true, videos });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch videos", error });
    }
}));
router.get("/:channel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel } = req.params;
    try {
        const videos = yield (0, videos_2.getVideoWhereChannel)(channel);
        res.json({ success: true, videos });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch video", error });
    }
}));
router.get("/schedule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!channels || !channels.length) {
        return res.status(500).json({ success: false, message: "" });
    }
    try {
        const videos = yield (0, videos_1.default)(channels);
        // @ts-ignore
        yield (0, videos_2.saveVideosToSupabase)(videos);
        res.json({ success: true, message: "Scraper ran successfully!", videos });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to run scraper", error });
    }
}));
exports.default = router;
