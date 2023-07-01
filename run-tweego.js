/* eslint-disable no-undef */
import { exec } from 'child_process';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'; // add this line

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const osPlatform = os.platform();
const isWindows = osPlatform === 'win32';
const tweegoFileName = isWindows ? 'tweego.exe' : 'tweego';
const tweegoFilePath = path.join('.tweego', tweegoFileName);

// arguments for build/start
const args = process.argv.slice(2).join(' ');

// add this block of code to create the dist directory if it does not exist
const outputDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

exec(`${tweegoFilePath} ${args}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
