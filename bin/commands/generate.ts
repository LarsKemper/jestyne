import { Builder, Handler } from './generate.types';
import fs from 'fs';
import path, { ParsedPath } from 'path';
import { generateTestData } from '../core';

export const command = 'generate [path]';
export const description = 'Generate test skeleton for your Component';

export const builder: Builder = (yargs) =>
  yargs
    .positional('path', { type: 'string', demandOption: true })
    .example([['$0 generate ./path/path']]);

export const handler: Handler = async (argv) => {
  const filePath: ParsedPath = path.parse(argv.path);

  if (!filePath) {
    throw new Error('Pass a path: `./path/path`');
  }

  //TODO: read extension jsx/tsx from config
  if (!['.jsx'].includes(filePath.ext)) {
    throw new Error('Please select allowed file type');
  }

  const buffer = fs.readFileSync(argv.path);

  if (!buffer) {
    throw new Error('Could not parse passed path');
  }

  fs.writeFile(getTestFilePath(filePath), generateTestData(filePath), (err) => {
    if (err) {
      throw Error(err.message);
    }
  });
};

function getTestFilePath(path: ParsedPath): string {
  return `${path.dir}/${path.name}.test${path.ext}`;
}
