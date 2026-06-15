import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fetchJson, downloadFile } from '../utils';
import { translations } from '../i18n';

const PAPER_API = 'https://api.papermc.io/v2/projects/paper';

export async function initServer() {
  // Language selection first
  const { langCode } = await inquirer.prompt([
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

  const t = (translations as any)[langCode];
  console.log(chalk.green(t.initializing));

  try {
    // Java check
    const { execSync } = require('child_process');
    try {
      execSync('java -version', { stdio: 'ignore' });
    } catch (e) {
      console.warn(chalk.yellow(t.noJava));
    }

    const projectData = await fetchJson(PAPER_API);
    const versions = projectData.versions.reverse();

    const { version } = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: t.selectVersion,
        choices: versions.slice(0, 50) // Show more versions
      }
    ]);

    const { sName, sDesc } = await inquirer.prompt([
      { type: 'input', name: 'sName', message: t.serverName, default: 'My open-mc Server' },
      { type: 'input', name: 'sDesc', message: t.serverDesc, default: 'A Minecraft Server powered by open-mc' }
    ]);

    const versionData = await fetchJson(`${PAPER_API}/versions/${version}`);
    const latestBuild = versionData.builds[versionData.builds.length - 1];
    const buildData = await fetchJson(`${PAPER_API}/versions/${version}/builds/${latestBuild}`);
    const jarName = buildData.downloads.application.name;
    const downloadUrl = `${PAPER_API}/versions/${version}/builds/${latestBuild}/downloads/${jarName}`;

    const serverDir = path.join(process.cwd(), 'server');
    if (!fs.existsSync(serverDir)) fs.mkdirSync(serverDir);

    await downloadFile(downloadUrl, path.join(serverDir, 'server.jar'));

    // Save config
    fs.writeFileSync(path.join(process.cwd(), 'open-mc.json'), JSON.stringify({ version, lang: langCode, name: sName }, null, 2));

    // server.properties
    const props = `motd=${sDesc}\nserver-name=${sName}\npv-enabled=true\n`;
    fs.writeFileSync(path.join(serverDir, 'server.properties'), props);

    // EULA
    const { acceptEula } = await inquirer.prompt([{ type: 'confirm', name: 'acceptEula', message: t.acceptEula, default: true }]);
    if (acceptEula) {
      fs.writeFileSync(path.join(serverDir, 'eula.txt'), 'eula=true\n');
      console.log(chalk.blue(t.eulaCreated));
    }

    console.log(chalk.bold.green(t.initDone));
  } catch (error: any) {
    console.error(chalk.red(`Error: ${error.message}`));
  }
}
