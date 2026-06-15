import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { translations } from '../i18n';

export async function showPluginInstructions() {
  try {
    const configPath = path.join(process.cwd(), 'open-mc.json');
    if (!fs.existsSync(configPath)) {
      console.error(chalk.red('Config not found. Run "init" first.'));
      return;
    }
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const t = (translations as any)[config.lang || 'en'];

    console.log(chalk.cyan('\n' + t.pluginManualInstall + '\n'));

    const pluginsDir = path.join(process.cwd(), 'server', 'plugins');
    if (!fs.existsSync(pluginsDir)) {
      fs.mkdirSync(pluginsDir, { recursive: true });
      console.log(chalk.gray(`Created directory: ${pluginsDir}`));
    }

  } catch (error: any) {
    console.error(chalk.red(`Error: ${error.message}`));
  }
}
