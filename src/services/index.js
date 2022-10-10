import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const files = readdirSync(_dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== _basename) && (file.slice(-3) === '.js')
});

export default await files.map(async (file) => {
  const service = await import(`./${file}`);
  return service.default;
});
