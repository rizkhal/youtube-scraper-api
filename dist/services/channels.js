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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeChannels = getYoutubeChannels;
const supabase_1 = require("../lib/supabase");
function getYoutubeChannels() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase.from("channels").select("*");
        if (error) {
            console.error("❌ Supabase fetch error:", error);
            throw error;
        }
        return data;
    });
}
