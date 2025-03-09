"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Channels;
const cheerio = __importStar(require("cheerio"));
const browser_1 = require("../lib/browser");
function Channels(channels) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield (0, browser_1.createBrowserInstance)();
            const allProfiles = [];
            for (const channel of channels) {
                const url = `https://www.youtube.com/${channel}`;
                const page = yield browser.newPage();
                yield page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36");
                yield page.goto(url, { waitUntil: "networkidle2" });
                yield page.waitForSelector(".page-header-renderer-wiz");
                const html = yield page.content();
                const $ = cheerio.load(html);
                // Extract avatar (profile image)
                const avatar = $("img.yt-core-image.yt-spec-avatar-shape__image").attr("src") || "";
                // Extract channel name
                const name = $("h1.dynamic-text-view-model-wiz__h1 span")
                    .first()
                    .text()
                    .trim();
                // Extract username
                const username = $("div.yt-content-metadata-view-model-wiz__metadata-row span[dir='auto'] span")
                    .first()
                    .text()
                    .trim();
                const subscriberText = $("div.yt-content-metadata-view-model-wiz__metadata-row:nth-of-type(2) span")
                    .first()
                    .text()
                    .trim();
                const subscribers = convertToNumber(subscriberText.replace("subscribers", "").trim());
                allProfiles.push({
                    name,
                    username,
                    avatar,
                    subscribers,
                });
                yield page.close();
            }
            yield browser.close();
            return allProfiles;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
function convertToNumber(subscriberText) {
    const match = subscriberText.match(/([\d.]+)([KMB]?)/);
    if (!match)
        return 0;
    const num = parseFloat(match[1]);
    const unit = match[2] || "";
    const multiplier = { K: 1000, M: 1000000, B: 1000000000 };
    return Math.round(num * (multiplier[unit] || 1));
}
