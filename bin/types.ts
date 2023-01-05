import { Node } from 'acorn';

export type AstNode = Node & {
  id?: {
    name: string;
  };
};
