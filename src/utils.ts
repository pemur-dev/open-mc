import axios from 'axios';
import fs from 'fs';
import path from 'path';
import ora from 'ora';

export async function fetchJson(url: string) {
  const response = await axios.get(url);
  return response.data;
}

export async function downloadFile(url: string, dest: string) {
  const spinner = ora(`Downloading ${path.basename(dest)}...`).start();
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  const writer = fs.createWriteStream(dest);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      spinner.succeed(`Downloaded ${path.basename(dest)}`);
      resolve(true);
    });
    writer.on('error', (err) => {
      spinner.fail(`Failed to download ${path.basename(dest)}`);
      reject(err);
    });
  });
}
