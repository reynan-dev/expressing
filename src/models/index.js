import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { Sequelize } from 'sequelize';
import path from 'path';

import Database from '../utils/database';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const _basename = path.basename(_filename);

const db = {};
const sequelize = Database.setup('sqlite')

readdirSync(_dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== _basename) && (file.slice(-3) === '.js')
  })
  .map(async (file) => {
    const model = await import(`${_dirname}/${file}`)
    console.log(model.default(sequelize.start()));
    db[model.name] = model;
  })

sequelize.connect(db)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
