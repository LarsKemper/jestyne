import { Builder, Handler } from './generate.types';
import fs from 'fs';
import path, { ParsedPath } from 'path';
import ejs from 'ejs';

export const command = 'generate [path]';
export const description = 'Generate test skeleton for your Component';

export const builder: Builder = (yargs) =>
  yargs
    .positional('path', { type: 'string', demandOption: true })
    .example([['$0 generate ./path/path']]);

export const handler: Handler = async (argv) => {
  // read input file per path
  const inputFile: ParsedPath = path.parse(argv.path);

  if (!inputFile) {
    throw new Error('Pass a path: `./path/path`');
  }

  // check if file has allowed file extension
  //TODO: read extension jsx/tsx from config
  if (!['.jsx'].includes(inputFile.ext)) {
    throw new Error('Please select allowed file type');
  }

  //TODO: check if Components is already tested? Force option to overwrite?

  // check if component file exists
  const componentFileBuffer = fs.readFileSync(argv.path);

  if (!componentFileBuffer) {
    throw new Error('Could not parse passed path');
  }

  const componentName = inputFile.name;
  const testPath = inputFile.dir.replace('./', '');

  // template args
  const data = {
    componentName,
    testPath,
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
    fs.writeFile(
      `${inputFile.dir}/${inputFile.name}.test${inputFile.ext}`,
      str,
      (err) => {
        if (err) {
          throw Error(err.message);
        }
      }
    );
  });
};
