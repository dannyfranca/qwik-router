import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import devkit from '@nx/devkit';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikNxVite } from 'qwik-nx/plugins';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        name: 'qwik-router',
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['@builder.io/qwik'],
      },
    },
    plugins: [
      qwikNxVite(),
      qwikVite(),
      dts({
        entryRoot: 'src',
        tsConfigFilePath: devkit.joinPathFragments(__dirname, 'tsconfig.lib.json'),
        skipDiagnostics: true,
      }),
      viteTsConfigPaths({
        root: '../../',
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
