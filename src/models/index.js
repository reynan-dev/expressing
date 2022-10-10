import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { Sequelize } from 'sequelize';
import path from 'path';

import Database from '../utils/database_new';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const _basename = path.basename(_filename);

const db = {};

readdirSync(_dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== _basename) && (file.slice(-3) === '.js')
  })
  .map((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })

const sequelize = Database.setup('sqlite')
sequelize.connect(db)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
