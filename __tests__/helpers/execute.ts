import { exec, ExecException } from 'child_process';

type ExecuteResponse = {
  code: number;
  error: ExecException;
  stdout: string;
  stderr: string;
};

export default function execute(
  cmd: string,
  args?: string[]
): Promise<ExecuteResponse> {
  return new Promise((resolve) => {
    exec(
      `npx jestyne ${cmd} ${args && args.join(' ')}`,
      { cwd: '.' },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout: filterStdout(stdout),
          stderr,
        });
      }
    );
  });
}

function filterStdout(text: string): string {
  return text.replace(/\n/, '');
}
