import { copyFileSync, mkdirSync } from 'node:fs';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    'credentials/HarvestApi.credentials': 'credentials/HarvestApi.credentials.ts',
    'nodes/Harvest/Harvest.node': 'nodes/Harvest/Harvest.node.ts',
  },
  format: ['cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  // Bundle harvest-client into the output
  noExternal: ['harvest-client'],
  // Don't bundle n8n-workflow (it's a peer dependency)
  external: ['n8n-workflow'],
  esbuildOptions(options) {
    options.banner = {
      js: '// n8n-nodes-harvest - Harvest API integration for n8n',
    };
  },
  async onSuccess() {
    // Copy SVG icon to dist/nodes/Harvest
    mkdirSync('dist/nodes/Harvest', { recursive: true });
    copyFileSync('nodes/Harvest/harvest.svg', 'dist/nodes/Harvest/harvest.svg');
  },
});
