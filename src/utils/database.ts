import { DatabaseType, DataSource, EntitySchema, MixedList } from "typeorm";

import Skill from "../models/SkillModels.js";
import School from "../models/SchoolModels.js";
import Wilder from "../models/WilderModels.js";

export default class Database {
  private static instance: Database;
  private DS: DataSource;
  private type: DatabaseType;
  private database: string;
  private static entities: MixedList<Function | string | EntitySchema> = [];
  private url: string | undefined;
  private host: string | undefined;
  private username: string | undefined;
  private password: string | undefined;

  private constructor(
    type: DatabaseType,
    database: string,
    url?: string,
    host?: string,
    username?: string,
    password?: string
  ) {
    this.type = type;
    this.database = database;

    if (type === "mysql" || type === "postgres" || type === "mongodb") {
      this.url = url;
      this.host = host;
      this.username = username;
      this.password = password;
    }
  }

  public static start_mysql(
    database_name: string,
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "mysql",
        database_name,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static start_postgres(
    database_name: string,
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "postgres",
        database_name,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static start_mongodb(
    database_name: string,
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "mongodb",
        database_name,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static start_sqlite(database_name: string): Database {
    if (!this.instance) {
      this.instance = new Database("sqlite", database_name);
    }
    return this.instance;
  }

  public static async new_entity(entity: MixedList<Function | string | EntitySchema>) {
    await Database.entities.push(entity);
  }

  public static show_entities() {
    return Database.entities;
  }

  public _datasource(): DataSource {
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

  public connect = async () => {
    await this._datasource().initialize();
    console.log("Successfully connected to database");
  };
}


Database.new_entity(Skill);
Database.new_entity(School);
Database.new_entity(Wilder);