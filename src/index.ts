import express from "express";
import cors from "cors";

import routes from "./routes/BaseRoutes.js";
import { connect_db } from "./db.js";

const app = express();
const PORT = 4000;

const start = async () => {
    await connect_db();

    app.listen(PORT, () => console.log(`Server is listen in port ${PORT}`));
    app.use(cors());

    routes(app);
};

start();

export default app;
