/// <reference types="vitest/config" />
/// <reference types="vitest" />
/// <reference types="vite/client" />
import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

export default defineConfig({
  plugins: [react()],
  root: 'example',

  test: {
    root: '.',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-cleanup.ts'],
    typecheck: {
      tsconfig: tsconfigPath,
      ignoreSourceErrors: true,
    },
  },
});
