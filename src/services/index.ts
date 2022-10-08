import { fileURLToPath } from "url";
import { readdirSync } from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = readdirSync(__dirname).filter((file) =>
  file.includes("Services")
);

export default await files.map(async (file: string) => {
  const service = await import("./" + file);
  return service.default;
});
