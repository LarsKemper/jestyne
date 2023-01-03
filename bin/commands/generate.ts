import { Builder, Handler } from './generate.types';
import fs from 'fs';
import path, { ParsedPath } from 'path';
import ejs from 'ejs';
import { config } from '../cli';

export const command = 'generate [path]';
export const description = 'Generate test skeleton for your Component';

export const builder: Builder = (yargs) =>
  yargs
    .options({
      force: { type: 'boolean', alias: 'f' },
    })
    .positional('path', { type: 'string', demandOption: true })
    .example([
      ['$0 generate ./path/path'],
      ['$0 generate ./path/path --force'],
    ]);

export const handler: Handler = async (argv) => {
  // read input file per path
  const inputFile: ParsedPath = path.parse(argv.path);

  if (!inputFile) {
    throw new Error('Pass a path: `./path/path`');
  }

  // check if file has allowed file extension
  if (config.fileExtension.includes(inputFile.ext)) {
    throw new Error('Please select allowed file type');
  }

  // check if component file exists
  if (!fs.existsSync(argv.path)) {
    throw new Error('Could not parse passed path');
  }

  const componentName = inputFile.name;
  const testName = inputFile.dir.replace('./', '');
  const testPath = `${inputFile.dir}/${inputFile.name}.test${inputFile.ext}`;

  // check if component file already has test file
  if (!argv.force && fs.existsSync(testPath)) {
    throw new Error(
      'This component already has an existing test file. Use --f to force generate'
    );
  }

  // template args
  const data = {
    componentName,
    testName,
  };

  // ejs render options
  const options = {};

  // read ejs template for test file
  const templatePath = path.join(__dirname, '../templates/basic.ejs');

  ejs.renderFile(templatePath, data, options, (err, str) => {
    // str = rendered js lines
    if (err) {
      throw Error(err.message);
    }

    // write test file
    fs.writeFile(testPath, str, (err) => {
      if (err) {
        throw Error(err.message);
      }
    });
  });
};
