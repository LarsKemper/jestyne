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
    const { code, error } = await execute('unknown');

    expect(code).toBe(1);
    expect(error).not.toBeNull();
  });
});
