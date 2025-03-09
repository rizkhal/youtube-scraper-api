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
exports.supabase = void 0;
exports.paginate = paginate;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
function paginate(table_1) {
    return __awaiter(this, arguments, void 0, function* (table, page = 1, pageSize = 10, customQuery = (q) => q) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;
        // Base query
        let query = exports.supabase.from(table).select(`id`, { count: "exact" });
        // Apply any additional filters (e.g., order, where)
        query = customQuery(query);
        // Apply pagination
        query = query.range(start, end);
        // Fetch data
        const { data, error, count } = yield query;
        if (error) {
            console.error("❌ Error fetching data:", error);
            throw error;
        }
        return {
            data,
            meta: {
                currentPage: page,
                totalPages: Math.ceil((count !== null && count !== void 0 ? count : 0) / pageSize),
                totalItems: count !== null && count !== void 0 ? count : 0,
                pageSize,
                next: page * pageSize < (count !== null && count !== void 0 ? count : 0) ? page + 1 : null,
                prev: page > 1 ? page - 1 : null,
            },
        };
    });
}
