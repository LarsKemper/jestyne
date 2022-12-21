import execute from './helpers/execute';
const pjson = require('../package.json');

describe('index', () => {
  it('should execute version command', async () => {
    const result = await execute('--version');

    expect(result).toEqual({
      code: 0,
      error: null,
      stdout: pjson.version,
      stderr: '',
    });
  });

  it('should execute help/usage command', async () => {
    const result = await execute('--help');

    expect(result.stdout.includes('Options')).toBeTruthy();
    expect(result).toEqual({
      code: 0,
      error: null,
      stdout: result.stdout,
      stderr: '',
    });
  });

  it('should throw error in case of unknown argument', async () => {
    const result = await execute('unknown');

    expect(result.code).toBe(1);
    expect(result.error).not.toBeNull();
    expect(
      result.stderr.includes('Error: Unknown arguments: unknown, undefined')
    ).toBeTruthy();
  });
});
