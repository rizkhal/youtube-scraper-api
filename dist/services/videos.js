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
exports.getVideoWhereChannel = getVideoWhereChannel;
exports.getVideosFromSupabase = getVideosFromSupabase;
exports.saveVideosToSupabase = saveVideosToSupabase;
const supabase_1 = require("../lib/supabase");
function getVideoWhereChannel(req, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = 1, pageSize = 10 } = req.query;
        return yield (0, supabase_1.paginate)("videos", page, pageSize, (query) => query
            .select("*")
            .eq("channel", channel)
            .order("created_at", { ascending: false }));
    });
}
function getVideosFromSupabase(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = 1, pageSize = 10 } = req.query;
        return yield (0, supabase_1.paginate)("videos", page, pageSize, (query) => query.select("*").order("created_at", { ascending: false }));
    });
}
function saveVideosToSupabase(videos) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.supabase.from("videos").upsert(videos);
        if (error) {
            console.error("❌ Supabase insert error:", error);
        }
        return data;
    });
}
