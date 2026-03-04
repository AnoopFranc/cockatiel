import { fork } from 'child_process';
import { unlink, writeFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Runs the code in a child process, and returns its stdout/err string.
 */
export async function runInChild(code: string) {
  const cwd = path.resolve(__dirname, '..', '..');
  const file = path.resolve(cwd, '.test.mjs');

  after(done => unlink(file, () => done()));

  writeFileSync(file, `const c = await import('./dist/index.js');\n${code}`);

  const child = fork(file, [], { cwd, stdio: 'pipe' });
  const output: Buffer[] = [];
  child.stderr?.on('data', d => output.push(d));
  child.stdout?.on('data', d => output.push(d));

  await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', resolve);
  });

  return Buffer.concat(output).toString().replace(/\r?\n/g, '\n').trim();
}
