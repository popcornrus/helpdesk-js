import { build } from 'esbuild';
import {TsconfigPathsPlugin} from '@esbuild-plugins/tsconfig-paths'
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Emulate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
};

build({
    entryPoints: ['src/index.ts'],
    bundle: true, // No bundling to preserve file structure
    outdir: 'dist',
    outbase: 'src', // Preserve the directory structure based on "src"
    platform: 'node',
    target: 'es6',
    plugins: [TsconfigPathsPlugin({tsconfig: 'tsconfig.json'})],
    minify: true,
    sourcemap: true
}).then(() => {
}).catch(() => process.exit(1));
