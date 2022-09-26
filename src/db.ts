import { DataSource } from "typeorm";

// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

import Wilder from "./models/Wilder.js";
import School from "./models/School.js";
import Skill from "./models/Skill.js";

const DS = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [Wilder, School, Skill]
});

const connect_db = async function () {
    await DS.initialize();
    console.log("Successfully connected to database");
};

export { DS, connect_db };
