import url from 'url';
import fs from 'fs';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, 'public');
const isExists = fs.existsSync(publicDir);

console.log("Postinstall script");
if (!isExists) fs.mkdirSync(publicDir);
