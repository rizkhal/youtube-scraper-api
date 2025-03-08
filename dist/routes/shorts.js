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
const shorts_1 = __importDefault(require("../scripts/shorts"));
const shorts_2 = require("../services/shorts");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");
        const data = yield (0, shorts_1.default)([channels[0]]);
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch shorts", error });
    }
}));
router.get("/schedule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");
        const { channel } = req.query;
        const selectedChannels = channel ? [channel] : channels;
        if (!selectedChannels || !selectedChannels.length) {
            return res
                .status(500)
                .json({ success: false, message: "No channels provided." });
        }
        const shorts = yield (0, shorts_1.default)(selectedChannels);
        // @ts-ignore
        yield (0, shorts_2.saveShortsToSupabase)(shorts);
        res.json({ success: true, message: "Scraper ran successfully!", shorts });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to run scraper", error });
    }
}));
exports.default = router;
