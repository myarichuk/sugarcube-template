/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { Extract } from 'unzipper';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';
import path from 'path';

const asyncPipeline = promisify(pipeline);

const dest = './.tweego';
const osPlatform = os.platform();
const osArch = os.arch();
const version = '2.1.1'; // adjust version as needed

let tweegoFileName, url;

switch(osPlatform) {
    case 'win32':
        tweegoFileName = 'tweego.exe';
        url = `https://github.com/tmedwards/tweego/releases/download/v${version}/tweego-${version}-windows-${osArch}.zip`;
        break;
    case 'darwin':
        tweegoFileName = 'tweego';
        url = `https://github.com/tmedwards/tweego/releases/download/v${version}/tweego-${version}-macos-${osArch}.zip`;
        break;
    case 'linux':
        tweegoFileName = 'tweego';
        url = `https://github.com/tmedwards/tweego/releases/download/v${version}/tweego-${version}-linux-${osArch}.zip`;
        break;
    default:
        console.log('Unsupported platform');
        process.exit(1);
}

const tweegoFilePath = path.join(dest, tweegoFileName);

// Check if the tweego file exists
fs.access(tweegoFilePath)
  .then(() => {
    // Check if the file is for the correct OS
    fs.readFile(tweegoFilePath, 'utf-8')
      .then(content => {
        if (osPlatform === 'win32' && !content.includes('This program cannot be run in DOS mode')) {
          console.log('Incorrect OS version detected. Redownloading.');
          downloadTweego();
        } else if (osPlatform !== 'win32' && content.includes('This program cannot be run in DOS mode')) {
          console.log('Incorrect OS version detected. Redownloading.');
          downloadTweego();
        } else {
          console.log('Tweego is already installed and the version is correct. Skipping download.');
        }
      });
  })
  .catch(() => {
    console.log('Tweego is not installed. Downloading now.');
    downloadTweego();
  });

function downloadTweego() {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
      return asyncPipeline(response.body, Extract({ path: dest }));
    })
    .then(async () => {
      await fs.chmod(tweegoFilePath, '755');
      console.log('Tweego has been installed successfully.');
    })
    .catch(err => console.error(err));
}
