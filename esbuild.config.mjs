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

const createDistStructure = (srcDir, distDir) => {
    const files = getFiles(srcDir);
    files.forEach(file => {
        const relativePath = path.relative(srcDir, file);
        const distPath = path.join(distDir, relativePath);
        const distDirPath = path.dirname(distPath);
        if (!fs.existsSync(distDirPath)) {
            fs.mkdirSync(distDirPath, { recursive: true });
        }
        fs.copyFileSync(file, distPath);
    });
};

build({
    entryPoints: ['src/index.ts'],
    bundle: true, // No bundling to preserve file structure
    outdir: 'dist',
    outbase: 'src', // Preserve the directory structure based on "src"
    platform: 'node',
    target: 'es6',
    plugins: [TsconfigPathsPlugin({tsconfig: 'tsconfig.json'})],
    alias: {
        $config: path.resolve(__dirname, './src/configs'),
        $modules: path.resolve(__dirname, './src/modules'),
        $types: path.resolve(__dirname, './src/types'),
        $interfaces: path.resolve(__dirname, './src/interfaces'),
        '$modules/tracker': path.resolve(__dirname, './src/modules/tracker.json'),
        '$modules/api': path.resolve(__dirname, './src/modules/api')
    },
}).then(() => {
}).catch(() => process.exit(1));