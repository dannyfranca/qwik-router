import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikNxVite } from 'qwik-nx/plugins';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import pkg from "./package.json";

const { peerDependencies } = pkg;
const makeRegex = (dep: string) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj: object) => Object.keys(obj).map(makeRegex);

export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        name: 'qwik-router',
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: [
          /^node:.*/,
          ...excludeAll(peerDependencies),
        ],
      },
    },
    cacheDir: '../../node_modules/.vite/qwik-router',
    plugins: [
      qwikNxVite(),
      qwikVite(),
      nxViteTsPaths(),
      dts({
        entryRoot: 'src',
        tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      }),
      viteStaticCopy({
        targets: [
          {
            src: ['../../README.md', '../../LICENSE'],
            dest: '.',
          },
        ],
      }),
    ],
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'happy-dom',
      watch: false,
      include: ['**/*.test.{ts,tsx}'],
      clearMocks: true,
      coverage: {
        all: true,
        enabled: true,
        provider: 'istanbul',
        include: ['src/**/**'],
        exclude: ['src/root.tsx', 'src/entry.dev.tsx', 'src/entry.ssr.tsx', 'src/listen-to-route-changes.ts'],
        extension: ['.js', '.ts', '.tsx'],
        reporter: ['lcov', 'text-summary'],
        reportsDirectory: '../../coverage/packages/qwik-router',
      },
    },
  };
});
