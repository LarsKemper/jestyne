#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import handleError from './handleError';
import rc from 'rc';

export const epilogue =
  'For more information, check https://github.com/LarsKemper/jestyne#readme';

export const config = rc('jestyne', {
  fileExtension: ['jsx'],
});

yargs(hideBin(process.argv))
  .commandDir('commands')
  .command(
    '$0',
    '',
    () => undefined,
    () => {
      yargs.showHelp();
    }
  )
  .strict()
  .alias({ h: 'help' })
  .epilogue(epilogue)
  .fail(handleError).argv;
