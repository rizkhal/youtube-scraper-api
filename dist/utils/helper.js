"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.pluck = void 0;
const pluck = (arr, key) => {
    return arr.map((item) => item[key]);
};
exports.pluck = pluck;
const pick = (obj, keys) => {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
};
exports.pick = pick;
