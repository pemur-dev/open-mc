#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const plugin_1 = require("./commands/plugin");
const start_1 = require("./commands/start");
const program = new commander_1.Command();
program
    .name('open-mc')
    .description('Local Minecraft server manager CLI')
    .version('1.0.0');
program
    .command('init')
    .description('Initialize a new Minecraft server')
    .action(init_1.initServer);
program
    .command('plugin')
    .description('Show instructions for installing plugins')
    .action(plugin_1.showPluginInstructions);
program
    .command('start')
    .description('Start the Minecraft server')
    .action(start_1.startServer);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
else {
    program.parse();
}
