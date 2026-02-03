import { describe, it, expect } from 'vitest';
import { spawn } from 'child_process';
import { join } from 'path';

const CLI_PATH = join(__dirname, '../../dist/cli.js');

function runCLI(args: string[]): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve) => {
    const proc = spawn('node', [CLI_PATH, ...args], {
      env: { ...process.env, COINONE_ACCESS_TOKEN: '', COINONE_SECRET_KEY: '' }
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (data) => { stdout += data.toString(); });
    proc.stderr.on('data', (data) => { stderr += data.toString(); });
    
    proc.on('close', (code) => {
      resolve({ stdout, stderr, code: code ?? 0 });
    });
  });
}

describe('CLI', () => {
  describe('help', () => {
    it('should show help message', async () => {
      const { stdout, code } = await runCLI(['help']);
      expect(code).toBe(0);
      expect(stdout).toContain('coinone-skill CLI');
      expect(stdout).toContain('Commands');
    });

    it('should show help by default', async () => {
      const { stdout, code } = await runCLI([]);
      expect(code).toBe(0);
      expect(stdout).toContain('coinone-skill CLI');
    });
  });

  describe('ticker', () => {
    it('should require currency argument', async () => {
      const { stderr, code } = await runCLI(['ticker']);
      expect(code).toBe(1);
      expect(stderr).toContain('Currency required');
    });
  });

  describe('orderbook', () => {
    it('should require currency argument', async () => {
      const { stderr, code } = await runCLI(['orderbook']);
      expect(code).toBe(1);
      expect(stderr).toContain('Currency required');
    });
  });

  describe('analyze', () => {
    it('should require currency argument', async () => {
      const { stderr, code } = await runCLI(['analyze']);
      expect(code).toBe(1);
      expect(stderr).toContain('Currency required');
    });
  });

  describe('balance', () => {
    it('should require credentials', async () => {
      // Without credentials, should fail
      const { stderr, code } = await runCLI(['balance']);
      expect(code).toBe(1);
      expect(stderr.toLowerCase()).toContain('credential');
    });
  });

  describe('auth-check', () => {
    it('should require credentials', async () => {
      const { stderr, code } = await runCLI(['auth-check']);
      expect(code).toBe(1);
      expect(stderr.toLowerCase()).toContain('credential');
    });
  });
});
