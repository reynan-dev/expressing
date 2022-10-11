import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const files = readdirSync(_dirname).filter((file) => {
  
});

export default await files.map(async (file) => {
  const service = await import(`./${file}`);
  return service.default;
});
