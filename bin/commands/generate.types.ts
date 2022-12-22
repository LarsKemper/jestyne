import type { Arguments, CommandBuilder } from 'yargs';

export type Options = {
  path: string;
};

export type Builder = CommandBuilder<Options, Options>;

export type Handler = (argv: Arguments<Options>) => void;
