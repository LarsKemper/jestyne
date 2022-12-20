#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import handleError from './handleError';

yargs(hideBin(process.argv))
  .command(
    '$0',
    'jestyne cli usage',
    () => undefined,
    () => {
      yargs.showHelp();
    }
  )
  .strict()
  .alias({ h: 'help' })
  .epilogue('For more information, check README.md')
  .fail(handleError).argv;
