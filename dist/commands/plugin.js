"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPluginInstructions = showPluginInstructions;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const i18n_1 = require("../i18n");
async function showPluginInstructions() {
    try {
        const configPath = path_1.default.join(process.cwd(), 'open-mc.json');
        if (!fs_1.default.existsSync(configPath)) {
            console.error(chalk_1.default.red('Config not found. Run "init" first.'));
            return;
        }
        const config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf8'));
        const t = i18n_1.translations[config.lang || 'en'];
        console.log(chalk_1.default.cyan('\n' + t.pluginManualInstall + '\n'));
        const pluginsDir = path_1.default.join(process.cwd(), 'server', 'plugins');
        if (!fs_1.default.existsSync(pluginsDir)) {
            fs_1.default.mkdirSync(pluginsDir, { recursive: true });
            console.log(chalk_1.default.gray(`Created directory: ${pluginsDir}`));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error.message}`));
    }
}
