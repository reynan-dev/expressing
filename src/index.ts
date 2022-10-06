import express from "express";

import routes from "./routes/BaseRoutes.js";
import Database from "./utils/database.js";

import School from "./models/School.js";
import Skill from "./models/Skill.js";
import Wilder from "./models/Wilder.js";

Database.new_entity(School);
Database.new_entity(Skill);
Database.new_entity(Wilder);

console.log(Database.show_entities());


const database = Database.start_sqlite('db.sqlite');


const app = express();
const PORT = 4000;



const start = async () => {
    await database.connect();
    app.listen(PORT, () => console.log(`Server is listen in port ${PORT}`));
    routes(app);
};

start();

export {app, database};
