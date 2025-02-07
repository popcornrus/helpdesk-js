import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/websocket.tsconfig', // Path to your library entry point
      name: 'HelpdeskJS',
      fileName: (format) => `helpdesk-js.${format}.js`
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled with your library
      external: ['rrweb'],
      output: {
        globals: {
          rrweb: 'rrweb'
        }
      }
    }
  },
  plugins: [dts()],
  resolve: {
    alias: {
      $config: path.resolve(__dirname, './src/configs'),
      $modules: path.resolve(__dirname, './src/modules'),
      $types: path.resolve(__dirname, './src/types'),
      $interfaces: path.resolve(__dirname, './src/interfaces'),
      '$modules/tracker': path.resolve(__dirname, './src/modules/tracker.json'),
      '$modules/api': path.resolve(__dirname, './src/modules/api')
    }
  }
});