import { spawn } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { translations } from '../i18n';

export async function startServer() {
  const serverDir = path.join(process.cwd(), 'server');
  const jarPath = path.join(serverDir, 'server.jar');
  const eulaPath = path.join(serverDir, 'eula.txt');

  const configPath = path.join(process.cwd(), 'open-mc.json');
  let lang = 'en';
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    lang = config.lang || 'en';
  }
  const t = (translations as any)[lang];

  if (!fs.existsSync(jarPath)) {
    console.error(chalk.red(t.configNotFound));
    return;
  }

  if (!fs.existsSync(eulaPath)) {
    fs.writeFileSync(eulaPath, 'eula=true\n');
  }

  console.log(chalk.green(t.startingServer));

  const server = spawn('java', ['-Xmx2G', '-Xms2G', '-jar', 'server.jar', 'nogui'], {
    stdio: 'inherit',
    cwd: serverDir
  });

  server.on('close', (code) => {
    console.log(chalk.yellow(`${t.serverExited} ${code}`));
    process.exit(0);
  });

  server.on('error', (err: any) => {
    if (err.code === 'ENOENT') {
      console.error(chalk.red(t.javaNotFound));
    } else {
      console.error(chalk.red(`Error: ${err.message}`));
    }
  });
}
