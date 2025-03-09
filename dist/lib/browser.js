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
exports.createBrowserInstance = createBrowserInstance;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
function createBrowserInstance() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield puppeteer_core_1.default.launch({
            executablePath: yield chrome_aws_lambda_1.default.executablePath,
            headless: chrome_aws_lambda_1.default.headless,
            args: chrome_aws_lambda_1.default.args,
        });
        // return await puppeteer.launch({
        //   headless: true,
        //   args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
        // });
    });
}
