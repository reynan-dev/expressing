import express from 'express';
import db from './models/index.js';
import routes from './routes/routes';

const database = db;

const app = express();
const PORT = 3000;

const start = async () => {
  app.listen(PORT, () => console.log(`Server is listen in port ${PORT}`));
  routes(app);
};

await start();

export { app, database };
