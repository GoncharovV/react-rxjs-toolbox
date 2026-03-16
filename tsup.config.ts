import { defineConfig } from 'tsup';


export default defineConfig(
  {
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    external: ['react', 'rxjs'],
    splitting: true,
    treeshake: true,
    tsconfig: 'tsconfig.build.json',
    clean: true,
    minify: false,
    entry: {
      index: 'src/index.ts',
    },
  },
);
