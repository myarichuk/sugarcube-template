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

const version = '2.1.1'; // adjust version as needed
const dest = './.tweego';
const osPlatform = os.platform();
const isWindows = osPlatform === 'win32';
const osVersion = isWindows ? 'windows-x64' : 'linux-x64';
const tweegoFileName = isWindows ? 'tweego.exe' : 'tweego';
const tweegoFilePath = path.join(dest, tweegoFileName);
const url = `https://github.com/tmedwards/tweego/releases/download/v${version}/tweego-${version}-${osVersion}.zip`;

// Check if the tweego file exists
fs.access(tweegoFilePath)
  .then(() => {
    // Check if the file is for the correct OS
    fs.readFile(tweegoFilePath, 'utf-8')
      .then(content => {
        if (isWindows && !content.includes('This program cannot be run in DOS mode')) {
          console.log('Incorrect OS version detected. Redownloading.');
          downloadTweego();
        } else if (!isWindows && content.includes('This program cannot be run in DOS mode')) {
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
