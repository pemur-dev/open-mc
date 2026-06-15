"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const i18n_1 = require("../i18n");
async function startServer() {
    const serverDir = path_1.default.join(process.cwd(), 'server');
    const jarPath = path_1.default.join(serverDir, 'server.jar');
    const eulaPath = path_1.default.join(serverDir, 'eula.txt');
    const configPath = path_1.default.join(process.cwd(), 'open-mc.json');
    let lang = 'en';
    if (fs_1.default.existsSync(configPath)) {
        const config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf8'));
        lang = config.lang || 'en';
    }
    const t = i18n_1.translations[lang];
    if (!fs_1.default.existsSync(jarPath)) {
        console.error(chalk_1.default.red(t.configNotFound));
        return;
    }
    if (!fs_1.default.existsSync(eulaPath)) {
        fs_1.default.writeFileSync(eulaPath, 'eula=true\n');
    }
    console.log(chalk_1.default.green(t.startingServer));
    const server = (0, child_process_1.spawn)('java', ['-Xmx2G', '-Xms2G', '-jar', 'server.jar', 'nogui'], {
        stdio: 'inherit',
        cwd: serverDir
    });
    server.on('close', (code) => {
        console.log(chalk_1.default.yellow(`${t.serverExited} ${code}`));
        process.exit(0);
    });
    server.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.error(chalk_1.default.red(t.javaNotFound));
        }
        else {
            console.error(chalk_1.default.red(`Error: ${err.message}`));
        }
    });
}
