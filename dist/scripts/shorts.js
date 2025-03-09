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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Shorts;
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio = __importStar(require("cheerio"));
function Shorts(channels) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer_1.default.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });
            const allShorts = [];
            for (const channel of channels) {
                const url = `https://www.youtube.com/${channel}/shorts`;
                const page = yield browser.newPage();
                yield page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36");
                yield page.goto(url, { waitUntil: "networkidle2" });
                // Wait for necessary elements
                yield page.waitForSelector("ytd-rich-item-renderer", { timeout: 5000 });
                const html = yield page.content();
                const $ = cheerio.load(html);
                const shorts = [];
                $("ytd-rich-item-renderer").each((_, element) => {
                    const videoPath = $(element)
                        .find("a.shortsLockupViewModelHostEndpoint")
                        .attr("href");
                    let thumbnailUrl = $(element)
                        .find("img.shortsLockupViewModelHostThumbnail")
                        .attr("src");
                    if (videoPath === null || videoPath === void 0 ? void 0 : videoPath.startsWith("/shorts/")) {
                        const videoId = videoPath.replace("/shorts/", "");
                        // Fix for missing thumbnails or ensure correct YouTube CDN URL
                        if (!thumbnailUrl) {
                            thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                        }
                        else {
                            thumbnailUrl = thumbnailUrl.replace(/&amp;/g, "&"); // Fix HTML encoding
                        }
                        shorts.push({
                            channel,
                            video_id: videoId,
                            url: `https://www.youtube.com/shorts/${videoId}`,
                            thumbnail: thumbnailUrl,
                            created_at: new Date().toISOString(),
                        });
                    }
                });
                allShorts.push(...shorts);
            }
            yield browser.close();
            return allShorts;
        }
        catch (error) {
            console.error("Error scraping shorts:", error);
            throw error;
        }
    });
}
