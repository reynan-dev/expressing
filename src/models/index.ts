import { fileURLToPath } from "url";
import { readdirSync } from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = readdirSync(__dirname).filter((file) => file.includes("Models"));

export default await files.map(async (file: any) => {
  const service = await import("./" + file);
  return service.default;
});
