import { ParsedPath } from 'path';

export function generateTestData(file: ParsedPath): string {
  return `${getDefaultImports(file.name)}\n${getDescribe(file, [
    getIt(`should render ${file.name}`),
  ])}`;
}

function getDefaultImports(name: string): string {
  return `import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${name} from './${name}'`;
}

function getDescribe(file, its: string[]): string {
  let itsString = ``;

  its.forEach((it) => {
    itsString += `\t${it}}\n`;
  });

  return `describe('${file.dir.replace('.', '')}${
    file.name
  }', () => {\n${itsString});`;
}

function getIt(name: string): string {
  return `it('${name}', () => {\n\t\trender(<SimpleComponent />);\n\t})`;
}
