#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { initServer } from './commands/init';
import { showPluginInstructions } from './commands/plugin';
import { startServer } from './commands/start';

const program = new Command();

program
  .name('open-mc')
  .description('Local Minecraft server manager CLI')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new Minecraft server')
  .action(initServer);

program
  .command('plugin')
  .description('Show instructions for installing plugins')
  .action(showPluginInstructions);

program
  .command('start')
  .description('Start the Minecraft server')
  .action(startServer);

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse();
}
