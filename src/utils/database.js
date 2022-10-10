import { DataSource } from 'typeorm';

import Skill from '../models/SkillModels';
import School from '../models/SchoolModels';
import Wilder from '../models/WilderModels';

export default class Database {
  static instance;
  DS;
  type;
  database;
  static entities = [];
  url;
  host;
  username;
  password;

  constructor(
    type,
    database,
    url = '',
    host = '',
    username = '',
    password = '',
  ) {
    this.type = type;
    this.database = database;

    if (type === 'mysql' || type === 'postgres' || type === 'mongodb') {
      this.url = url;
      this.host = host;
      this.username = username;
      this.password = password;
    }
  }

  static start_mysql(
    databaseName,
    url = '',
    host = '',
    username = '',
    password = '',
  ) {
    if (!this.instance) {
      this.instance = new Database(
        'mysql',
        databaseName,
        url,
        host,
        username,
        password,
      );
    }
    return this.instance;
  }

  static start_postgres(
    databaseName,
    url = '',
    host = '',
    username = '',
    password = '',
  ) {
    if (!this.instance) {
      this.instance = new Database(
        'postgres',
        databaseName,
        url,
        host,
        username,
        password,
      );
    }
    return this.instance;
  }

  static start_mongodb(
    databaseName,
    url = '',
    host = '',
    username = '',
    password = '',
  ) {
    if (!this.instance) {
      this.instance = new Database(
        'mongodb',
        databaseName,
        url,
        host,
        username,
        password,
      );
    }
    return this.instance;
  }

  static start_sqlite(databaseName) {
    if (!this.instance) {
      this.instance = new Database('sqlite', databaseName);
    }
    return this.instance;
  }

  // deno-lint-ignore no-explicit-any
  static new_entity(entity) {
    Database.entities.push(entity);
  }

  static show_entities() {
    return Database.entities;
  }

  _datasource() {
    if (!this.DS) {
      this.DS = new DataSource({
        type: this.type,
        database: this.database,
        synchronize: true,
        entities: Database.entities,
      });
    }
    return this.DS;
  }

  connect = async () => {
    await this._datasource().initialize();
    // eslint-disable-next-line no-console
    console.log('Successfully connected to database');
  };
}

Database.new_entity(Skill);
Database.new_entity(School);
Database.new_entity(Wilder);
