import * as fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively get all files in a directory
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

// Function to read and parse a JSON file
const parseJsonFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error);
    return null;
  }
};

// Path to the directory containing JSON files
const jsonDirPath = path.join(__dirname, '../src/paths');

// Get all files recursively from the directory
const fileList = getFiles(jsonDirPath);

// Parse each JSON file and store the results
const jsonDataList = fileList
  .filter(file => path.extname(file) === '.json')  // Filter to include only JSON files
  .map(file => ({ file, data: parseJsonFile(file) }));

// Core paths
const corePaths = {
  "$src/*": ["src/*"],
  "$utils/*": ["src/utils/*"],
  "$interfaces/*": ["src/interfaces/*"],
  "$configs/*": ["src/configs/*"],
  "$enums/*": ["src/enums/*"],
  "$core/*": ["src/core/*"]
};

// Generate module paths
const ModulePaths = {};
jsonDataList.forEach(({ file, data }) => {
  if (data) {
    Object.keys(data).forEach(key => {
      ModulePaths[key] = data[key];
    });
  }
});

// Combine core paths and module paths
const combinedPaths = { ...corePaths, ...ModulePaths };

// Path to the tsconfig.json file
const tsconfigPath = path.join(__dirname, '../tsconfig.json');

// Read the tsconfig.json file
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

// Update the paths in the tsconfig.json file
tsconfig.compilerOptions.paths = combinedPaths;

// Write the updated tsconfig.json file
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

console.log('Paths have been successfully generated and added to tsconfig.json');