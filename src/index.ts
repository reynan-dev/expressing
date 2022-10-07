import express from "express";

import routes from "./routes/BaseRoutes.js";
import Database from "./utils/database.js";

import LIST_MODELS from './models/index.js';

const database = Database.start_sqlite('db.sqlite');

const app = express();
const PORT = 4000;

const start = async () => {    
    await database.connect();
    app.listen(PORT, () => console.log(`Server is listen in port ${PORT}`));
    routes(app);
};

await start();

export {app, database};
