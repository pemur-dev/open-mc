"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJson = fetchJson;
exports.downloadFile = downloadFile;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ora_1 = __importDefault(require("ora"));
async function fetchJson(url) {
    const response = await axios_1.default.get(url);
    return response.data;
}
async function downloadFile(url, dest) {
    const spinner = (0, ora_1.default)(`Downloading ${path_1.default.basename(dest)}...`).start();
    const response = await (0, axios_1.default)({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    const writer = fs_1.default.createWriteStream(dest);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            spinner.succeed(`Downloaded ${path_1.default.basename(dest)}`);
            resolve(true);
        });
        writer.on('error', (err) => {
            spinner.fail(`Failed to download ${path_1.default.basename(dest)}`);
            reject(err);
        });
    });
}
