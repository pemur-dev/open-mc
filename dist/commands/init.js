"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = initServer;
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const i18n_1 = require("../i18n");
const PAPER_API = 'https://api.papermc.io/v2/projects/paper';
async function initServer() {
    // Language selection first
    const { langCode } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'langCode',
            message: 'Select Language / Vyberte jazyk:',
            choices: [
                { name: 'English', value: 'en' },
                { name: 'Čeština', value: 'cs' },
                { name: 'Slovenčina', value: 'sk' },
                { name: 'Русский', value: 'ru' },
                { name: '日本語', value: 'ja' },
                { name: '한국어', value: 'ko' },
                { name: '中文', value: 'zh' }
            ]
        }
    ]);
    const t = i18n_1.translations[langCode];
    console.log(chalk_1.default.green(t.initializing));
    try {
        // Java check
        const { execSync } = require('child_process');
        try {
            execSync('java -version', { stdio: 'ignore' });
        }
        catch (e) {
            console.warn(chalk_1.default.yellow(t.noJava));
        }
        const projectData = await (0, utils_1.fetchJson)(PAPER_API);
        const versions = projectData.versions.reverse();
        const { version } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'version',
                message: t.selectVersion,
                choices: versions.slice(0, 50) // Show more versions
            }
        ]);
        const { sName, sDesc } = await inquirer_1.default.prompt([
            { type: 'input', name: 'sName', message: t.serverName, default: 'My open-mc Server' },
            { type: 'input', name: 'sDesc', message: t.serverDesc, default: 'A Minecraft Server powered by open-mc' }
        ]);
        const versionData = await (0, utils_1.fetchJson)(`${PAPER_API}/versions/${version}`);
        const latestBuild = versionData.builds[versionData.builds.length - 1];
        const buildData = await (0, utils_1.fetchJson)(`${PAPER_API}/versions/${version}/builds/${latestBuild}`);
        const jarName = buildData.downloads.application.name;
        const downloadUrl = `${PAPER_API}/versions/${version}/builds/${latestBuild}/downloads/${jarName}`;
        const serverDir = path_1.default.join(process.cwd(), 'server');
        if (!fs_1.default.existsSync(serverDir))
            fs_1.default.mkdirSync(serverDir);
        await (0, utils_1.downloadFile)(downloadUrl, path_1.default.join(serverDir, 'server.jar'));
        // Save config
        fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'open-mc.json'), JSON.stringify({ version, lang: langCode, name: sName }, null, 2));
        // server.properties
        const props = `motd=${sDesc}\nserver-name=${sName}\npv-enabled=true\n`;
        fs_1.default.writeFileSync(path_1.default.join(serverDir, 'server.properties'), props);
        // EULA
        const { acceptEula } = await inquirer_1.default.prompt([{ type: 'confirm', name: 'acceptEula', message: t.acceptEula, default: true }]);
        if (acceptEula) {
            fs_1.default.writeFileSync(path_1.default.join(serverDir, 'eula.txt'), 'eula=true\n');
            console.log(chalk_1.default.blue(t.eulaCreated));
        }
        console.log(chalk_1.default.bold.green(t.initDone));
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error.message}`));
    }
}
