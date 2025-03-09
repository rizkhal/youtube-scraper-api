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
const channels_1 = require("../services/channels");
const channels_2 = __importDefault(require("../scripts/channels"));
const helper_1 = require("../utils/helper");
const router = (0, express_1.Router)();
router.get("/api/channels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, channels_1.getYoutubeChannels)();
        res.json({ success: true, data });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch shorts", error });
    }
}));
router.get("/api/run/channels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _channels = yield (0, channels_1.getYoutubeChannels)();
        const channels = yield (0, channels_2.default)((0, helper_1.pluck)(_channels, "username"));
        yield (0, channels_1.saveChannelsToSupabase)(channels);
        res.json({ success: true, message: "Scraper ran successfully!", channels });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to run channels scraper" });
    }
}));
exports.default = router;
