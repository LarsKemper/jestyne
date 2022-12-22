import execute from '../helpers/execute';
import fs from 'fs';

describe('commands/generate', () => {
  it('should execute generate command', async () => {
    const result = await execute(
      'generate ./__tests__/fixture/SimpleComponent.jsx'
    );

    expect(result).toEqual({
      code: 0,
      error: null,
      stdout: '',
      stderr: '',
    });
    fs.unlinkSync('./__tests__/fixture/SimpleComponent.test.jsx');
  });

  it('should throw Error in case of unknown file type', async () => {
    const { code, error, stderr } = await execute(
      'generate ./__tests__/fixture/WrongFileType.txt'
    );

    expect(code).toBe(1);
    expect(error).not.toBeNull();
    expect(stderr.includes('Error: Please select allowed file type'));
  });
});
