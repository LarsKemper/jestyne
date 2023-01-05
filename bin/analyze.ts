import fs from 'fs';
import { ecmaVersion, Parser } from 'acorn';
import jsx from 'acorn-jsx';
import { base, simple } from 'acorn-walk';
import { extend } from 'acorn-jsx-walk';
import { config } from './cli';
import { AstNode } from './types';

type analyzedValue = {
  functionDeclarations: Array<{ name: string }>;
};

const parser = Parser.extend(jsx());
extend(base);

export function analyze(path: string, componentName: string): analyzedValue {
  // formatted return value
  const value: analyzedValue = {
    functionDeclarations: [],
  };

  // read and parse code
  const source = fs.readFileSync(path, 'utf8');
  const ast = parser.parse(source, {
    ecmaVersion: config.ecmaVersion as ecmaVersion,
    sourceFile: path,
    sourceType: 'module',
  });

  // walk AST
  simple(ast, {
    FunctionDeclaration: (node: AstNode) => {
      if (node.id.name === componentName) {
        return;
      }

      value.functionDeclarations.push({ name: node.id.name });
    },
  });

  return value;
}
