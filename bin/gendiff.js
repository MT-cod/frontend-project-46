#!/usr/bin/env node

import genDiff from '../src/GenDiff.js';

//const { Command } = require('commander');
import { Command } from 'commander';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format  <type>', 'output format', 'json')
    .action(function() {
      //console.log('1' + JSON.stringify(this.args[0]));
      console.log(JSON.stringify(genDiff(this.args[0], this.args[1], this.opts().format), null, '\t'));
    });

program.parse();